import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { supabase } from '@/lib/supabase';

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch settings
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('id', SETTINGS_ID)
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    // Return settings (keys are already encrypted in DB if needed)
    return NextResponse.json({
      stripe_publishable_key: data?.stripe_publishable_key || '',
      stripe_secret_key: data?.stripe_secret_key ? '••••••••' : '', // Mask secret key
      stripe_webhook_secret: data?.stripe_webhook_secret ? '••••••••' : '',
      hasStripeKeys: !!(data?.stripe_publishable_key && data?.stripe_secret_key),
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { stripe_publishable_key, stripe_secret_key, stripe_webhook_secret } = body;

    // Validate Stripe keys format
    if (stripe_publishable_key && !stripe_publishable_key.startsWith('pk_')) {
      return NextResponse.json(
        { error: 'Invalid publishable key format. Should start with pk_' },
        { status: 400 }
      );
    }

    if (stripe_secret_key && stripe_secret_key !== '••••••••' && !stripe_secret_key.startsWith('sk_')) {
      return NextResponse.json(
        { error: 'Invalid secret key format. Should start with sk_' },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (stripe_publishable_key) {
      updateData.stripe_publishable_key = stripe_publishable_key;
    }

    if (stripe_secret_key && stripe_secret_key !== '••••••••') {
      updateData.stripe_secret_key = stripe_secret_key;
    }

    if (stripe_webhook_secret && stripe_webhook_secret !== '••••••••') {
      updateData.stripe_webhook_secret = stripe_webhook_secret;
    }

    // Update settings
    const { error } = await supabase
      .from('admin_settings')
      .update(updateData)
      .eq('id', SETTINGS_ID);

    if (error) {
      console.error('Error updating settings:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
