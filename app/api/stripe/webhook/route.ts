import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

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
      const { error: upsertError } = await supabaseAdmin.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: session.customer?.toString(),
        stripe_subscription_id: session.subscription?.toString(),
        plan,
        status: 'active',
      }, { onConflict: 'user_id' });

      if (!upsertError) {
        await supabaseAdmin
          .from('users')
          .update({ subscription_status: 'active' })
          .eq('id', userId);
      }
    }
  }

  return NextResponse.json({ received: true });
}
