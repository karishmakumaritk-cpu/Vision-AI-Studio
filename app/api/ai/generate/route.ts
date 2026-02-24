import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { assertUsageWithinPlan } from '@/lib/usage';
import { generateSchema } from '@/lib/validations';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!checkRateLimit(`ai:${session.user.id}`, 25, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });

  try {
    const payload = generateSchema.parse(await req.json());
    const allowed = await assertUsageWithinPlan(session.user.id, session.user.subscriptionPlan as any);
    if (!allowed) return NextResponse.json({ error: 'Usage limit reached for current plan' }, { status: 403 });

    const { OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are an expert ${payload.toolType} assistant.` },
        { role: 'user', content: payload.prompt }
      ]
    });

    const result = completion.choices[0]?.message?.content || 'No result generated';

    await prisma.prompt.create({
      data: {
        userId: session.user.id,
        toolType: payload.toolType,
        prompt: payload.prompt,
        response: result
      }
    });

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: 'Failed to generate' }, { status: 400 });
  }
}
