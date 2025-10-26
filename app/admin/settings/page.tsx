"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({
    stripe_publishable_key: '',
    stripe_secret_key: '',
    stripe_webhook_secret: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setFormData({
          stripe_publishable_key: data.stripe_publishable_key || '',
          stripe_secret_key: data.stripe_secret_key || '',
          stripe_webhook_secret: data.stripe_webhook_secret || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        // Refresh settings to get masked values
        await fetchSettings();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setMessage(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">
          Configure your Stripe payment gateway settings
        </p>

        {loading ? (
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center text-gray-500">Loading settings...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="glass-card rounded-2xl p-6 bg-blue-50 border border-blue-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">ℹ️</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">How to get your Stripe API keys:</h3>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4 list-decimal">
                    <li>Go to <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">dashboard.stripe.com</a></li>
                    <li>Sign in or create a Stripe account</li>
                    <li>Go to <strong>Developers → API keys</strong></li>
                    <li>Copy your <strong>Publishable key</strong> and <strong>Secret key</strong></li>
                    <li>For webhook secret, go to <strong>Developers → Webhooks</strong> and add an endpoint</li>
                  </ol>
                  <p className="mt-3 text-xs text-gray-600">
                    🔒 Your keys are stored securely and never shared. Start with test keys (pk_test_... and sk_test_...) before using live keys.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-serif text-gray-900 mb-6">Stripe Configuration</h2>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="space-y-6">
                {/* Publishable Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publishable Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.stripe_publishable_key}
                    onChange={(e) => handleChange('stripe_publishable_key', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="pk_test_..."
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Starts with pk_test_ (test mode) or pk_live_ (live mode)
                  </p>
                </div>

                {/* Secret Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secret Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.stripe_secret_key}
                    onChange={(e) => handleChange('stripe_secret_key', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="sk_test_..."
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Starts with sk_test_ (test mode) or sk_live_ (live mode). Keep this private!
                  </p>
                </div>

                {/* Webhook Secret */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Webhook Secret (Optional)
                  </label>
                  <input
                    type="password"
                    value={formData.stripe_webhook_secret}
                    onChange={(e) => handleChange('stripe_webhook_secret', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="whsec_..."
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Required for webhook verification. Starts with whsec_
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Using {formData.stripe_publishable_key?.includes('_test_') ? 'Test' : 'Live'} mode
                </p>
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    saving
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>

            {/* Test Mode Warning */}
            {formData.stripe_publishable_key?.includes('_test_') && (
              <div className="glass-card rounded-2xl p-6 bg-amber-50 border border-amber-100">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">⚠️</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Test Mode Active</h3>
                    <p className="text-sm text-gray-700">
                      You're currently using Stripe test keys. No real payments will be processed.
                      Use test card <code className="bg-white px-2 py-1 rounded">4242 4242 4242 4242</code> for testing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
