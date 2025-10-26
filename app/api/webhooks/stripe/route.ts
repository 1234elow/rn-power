import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Fetch Stripe keys from database
    const { data: settings, error: settingsError } = await supabase
      .from('admin_settings')
      .select('stripe_secret_key, stripe_webhook_secret')
      .eq('id', SETTINGS_ID)
      .single();

    if (settingsError || !settings?.stripe_secret_key) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(settings.stripe_secret_key, {
      apiVersion: '2025-09-30.clover',
    });

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      if (settings.stripe_webhook_secret) {
        event = stripe.webhooks.constructEvent(
          body,
          signature,
          settings.stripe_webhook_secret
        );
      } else {
        // If no webhook secret, parse event directly (less secure but works for testing)
        event = JSON.parse(body);
      }
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);

        // Update booking status
        await supabase
          .from('bookings')
          .update({ payment_status: 'completed' })
          .eq('payment_intent_id', paymentIntent.id);

        // Update payment record
        await supabase
          .from('payments')
          .update({ status: 'succeeded' })
          .eq('stripe_payment_intent_id', paymentIntent.id);

        break;

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedIntent.id);

        // Update booking status
        await supabase
          .from('bookings')
          .update({ payment_status: 'failed' })
          .eq('payment_intent_id', failedIntent.id);

        // Update payment record
        await supabase
          .from('payments')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', failedIntent.id);

        break;

      case 'charge.refunded':
        const charge = event.data.object as Stripe.Charge;
        console.log('Charge refunded:', charge.id);

        if (charge.payment_intent) {
          // Update payment record
          await supabase
            .from('payments')
            .update({ status: 'refunded' })
            .eq('stripe_payment_intent_id', charge.payment_intent);
        }

        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
