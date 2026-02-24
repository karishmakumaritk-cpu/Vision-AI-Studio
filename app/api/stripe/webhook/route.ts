import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = (session.metadata?.plan as 'PRO' | 'PREMIUM') || 'PRO';

    if (userId) {
      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          stripeCustomerId: session.customer?.toString(),
          stripeSubscriptionId: session.subscription?.toString(),
          plan,
          status: 'active'
        },
        update: {
          stripeCustomerId: session.customer?.toString(),
          stripeSubscriptionId: session.subscription?.toString(),
          plan,
          status: 'active'
        }
      });

      await prisma.user.update({ where: { id: userId }, data: { subscriptionPlan: plan } });
    }
  }

  return NextResponse.json({ received: true });
}
