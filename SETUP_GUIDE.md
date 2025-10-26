# ReNewed Power - Setup Guide

## Complete Payment & Admin System

This application now includes a full-featured booking system with Stripe payment processing and admin dashboard.

## 📋 What's Been Implemented

### 1. **Authentication System**
- Admin login page at `/admin/login`
- Session-based authentication with NextAuth.js
- Protected admin routes with middleware
- Secure password authentication

### 2. **Admin Dashboard** (`/admin/dashboard`)
- Real-time booking statistics
- Total bookings, pending/completed payments
- Revenue tracking
- Recent bookings overview

### 3. **Bookings Management** (`/admin/bookings`)
- View all bookings with filtering (all, pending, completed, failed)
- Detailed client information
- Appointment details and payment status
- Search and sort functionality

### 4. **Settings Management** (`/admin/settings`)
- Secure Stripe API key configuration
- Test mode / Live mode switching
- Webhook secret management
- Instructions for getting Stripe keys

### 5. **Payment Integration**
- Stripe checkout with Payment Element
- Support for all major payment methods
- Apple Pay, Google Pay, and card payments
- Real-time payment status updates via webhooks
- Secure payment processing

### 6. **Database Schema**
- Bookings table (stores all appointments)
- Payments table (tracks payment status)
- Admin settings table (encrypted API keys)
- Automatic timestamp updates

---

## 🚀 Setup Instructions

### Step 1: Database Setup (Supabase)

1. Go to your Supabase project: https://zhvlwkobcjeloyefsjct.supabase.co

2. Navigate to **SQL Editor**

3. Run the SQL migration located at `/database/schema.sql`
   - This will create all necessary tables
   - Sets up indexes for performance
   - Creates automatic timestamp triggers

4. Verify tables were created:
   - Go to **Table Editor** and confirm you see:
     - `bookings`
     - `payments`
     - `admin_settings`

### Step 2: Environment Variables

Your `.env.local` file is already configured with:
- NextAuth credentials
- Supabase connection
- Admin login details

**IMPORTANT**: Change the default admin password!
- Current: `ChangeThisPassword123!`
- Login at `/admin/login` and update in settings

### Step 3: Start the Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:3000

### Step 4: Admin Login

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@renewedpower.com`
   - Password: `ChangeThisPassword123!`

### Step 5: Configure Stripe

1. Sign up for Stripe: https://dashboard.stripe.com

2. Get your API keys:
   - Go to **Developers → API keys**
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

3. Add keys to admin panel:
   - Go to `/admin/settings`
   - Paste your Stripe keys
   - Click **Save Settings**

4. (Optional) Set up webhooks:
   - Go to **Developers → Webhooks**
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`
   - Copy webhook secret and add to settings

---

## 📱 Using the System

### Customer Booking Flow:

1. Customer visits your site
2. Clicks "Book an Appointment"
3. Selects a service (Virtual Therapy, Individual, or Group)
4. Chooses date and time
5. Fills out contact information
6. Proceeds to payment
7. Completes payment with Stripe
8. Receives confirmation

### Admin Management:

1. **Dashboard**: View all stats and recent bookings
2. **Bookings**: Manage all appointments, filter by status
3. **Settings**: Update Stripe keys, switch between test/live mode

---

## 🧪 Testing the Payment Flow

### Test Mode (Current Setup):

1. Make sure you're using Stripe **test keys** (pk_test_...)
2. Go through the booking flow
3. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

4. Submit payment
5. Check admin dashboard to see the booking with "completed" status

### Webhook Testing (Local Development):

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copy the webhook signing secret to your settings
4. Test payments - webhooks will update booking status automatically

---

## 🔐 Security Notes

1. **Never commit .env.local** - It's in .gitignore
2. **Change default admin password** immediately
3. **Use test keys** until ready for production
4. **Webhook secret** is required for production
5. **SSL certificate** required for production (webhooks)

---

## 📊 Database Tables

### bookings
- Stores all appointment data
- Links to payment records
- Tracks payment status

### payments
- Records all payment attempts
- Links to Stripe payment intents
- Tracks refunds

### admin_settings
- Stores Stripe API keys (should be encrypted in production)
- Single row with ID: `00000000-0000-0000-0000-000000000001`

---

## 🚨 Troubleshooting

### Payment not processing:
- Check Stripe keys are correct in admin settings
- Verify webhook secret if using webhooks
- Check browser console for errors

### Can't login to admin:
- Verify credentials in `.env.local`
- Check NextAuth secret is set
- Clear browser cookies and try again

### Bookings not appearing:
- Check Supabase connection
- Verify database tables exist
- Check browser network tab for API errors

### Webhook not working:
- Verify webhook URL is correct
- Check webhook secret matches
- Use Stripe CLI for local testing

---

## 🎯 Next Steps

1. **Run the SQL migration** in Supabase
2. **Login to admin panel**
3. **Add Stripe test keys**
4. **Test the complete booking flow**
5. **Customize services, pricing, and branding**
6. **Set up production Stripe account** when ready
7. **Deploy to production** (Vercel, Netlify, etc.)

---

## 📞 Support

For issues with:
- **Stripe**: https://stripe.com/docs
- **Supabase**: https://supabase.com/docs
- **NextAuth**: https://next-auth.js.org/

---

## ✅ Checklist

- [ ] Run database migration in Supabase
- [ ] Start development server
- [ ] Login to admin panel
- [ ] Change default password
- [ ] Add Stripe test keys
- [ ] Test booking flow with test card
- [ ] Verify booking appears in admin dashboard
- [ ] Set up webhooks for production
- [ ] Update to live Stripe keys for production
- [ ] Deploy to production

---

**Your system is ready to use!** 🎉

The complete payment and admin infrastructure is now in place. Your client can:
- Log into the admin panel securely
- Add their own Stripe keys
- View and manage all bookings
- Process payments through their own Stripe account

All without ever needing your credentials or access!
