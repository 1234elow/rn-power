import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, bookingData } = body;

    // Fetch Stripe keys from database
    const { data: settings, error: settingsError } = await supabase
      .from('admin_settings')
      .select('stripe_secret_key')
      .eq('id', SETTINGS_ID)
      .single();

    if (settingsError || !settings?.stripe_secret_key) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(settings.stripe_secret_key, {
      apiVersion: '2025-09-30.clover',
    });

    // Create booking in database
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          service_id: bookingData.serviceId,
          service_name: bookingData.serviceName,
          service_price: bookingData.servicePrice,
          service_duration: bookingData.serviceDuration,
          first_name: bookingData.firstName,
          last_name: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          message: bookingData.message,
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          payment_status: 'pending',
        },
      ])
      .select()
      .single();

    if (bookingError || !booking) {
      console.error('Booking error:', bookingError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        booking_id: booking.id,
        customer_email: bookingData.email,
        customer_name: `${bookingData.firstName} ${bookingData.lastName}`,
      },
      description: `${bookingData.serviceName} - ${bookingData.firstName} ${bookingData.lastName}`,
    });

    // Update booking with payment intent ID
    await supabase
      .from('bookings')
      .update({ payment_intent_id: paymentIntent.id })
      .eq('id', booking.id);

    // Create payment record
    await supabase.from('payments').insert([
      {
        booking_id: booking.id,
        amount: amount,
        currency: 'usd',
        status: 'pending',
        stripe_payment_intent_id: paymentIntent.id,
      },
    ]);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking.id,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
