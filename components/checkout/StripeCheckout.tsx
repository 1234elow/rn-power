"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "@/lib/supabase";

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

interface CheckoutFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: () => void;
}

function CheckoutForm({ clientSecret, amount, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/booking-success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred');
        setIsProcessing(false);
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-full font-medium transition-all ${
          !stripe || isProcessing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-600'
        }`}
      >
        {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>

      <p className="text-xs text-center text-gray-500">
        🔒 Your payment is secure and encrypted
      </p>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  bookingData: any;
  onSuccess: () => void;
}

export default function StripeCheckout({ amount, bookingData, onSuccess }: StripeCheckoutProps) {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeStripe();
  }, []);

  const initializeStripe = async () => {
    try {
      // Get publishable key from environment variable
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (!publishableKey) {
        setError('Payment system is not configured. Please contact support.');
        setLoading(false);
        return;
      }

      // Initialize Stripe
      const stripe = await loadStripe(publishableKey);
      setStripePromise(stripe);

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          bookingData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setClientSecret(data.clientSecret);
      } else {
        setError(data.error || 'Failed to initialize payment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment system');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-600">Preparing secure checkout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-medium">Payment Error</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!stripePromise || !clientSecret) {
    return null;
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#5DADE2',
      borderRadius: '8px',
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm clientSecret={clientSecret} amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
}
