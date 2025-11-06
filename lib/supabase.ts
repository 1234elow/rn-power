import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser/client-side usage (limited permissions)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side API routes (full permissions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Database types
export interface Booking {
  id: string;
  service_id: string;
  service_name: string;
  service_price: number;
  service_duration: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
  appointment_date: string;
  appointment_time: string;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminSettings {
  id: string;
  stripe_publishable_key?: string;
  stripe_secret_key?: string;
  stripe_webhook_secret?: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  stripe_payment_intent_id: string;
  created_at: string;
  updated_at: string;
}
