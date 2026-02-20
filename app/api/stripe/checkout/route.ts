import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { plan } = await req.json();
  const priceId = plan === 'PREMIUM' ? process.env.STRIPE_PREMIUM_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID;
  if (!priceId) return NextResponse.json({ error: 'Price ID missing' }, { status: 400 });

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: session.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=1`,
    metadata: {
      userId: session.user.id,
      plan
    }
  });

  return NextResponse.json({ url: checkout.url });
}
