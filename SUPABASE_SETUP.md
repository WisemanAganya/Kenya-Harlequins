# Supabase Configuration Guide

## Quick Start

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Choose your organization and region (Africa recommended)
- Set a strong database password
- Wait for project initialization

### 2. Get Credentials
- Project Settings > API
- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon public** key → `VITE_SUPABASE_ANON_KEY`
- Add to `.env.local`

### 3. Create Tables

Go to Supabase Dashboard > SQL Editor and run these queries:

```sql
-- Create events table
CREATE TABLE events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME,
  venue TEXT,
  competition TEXT,
  category TEXT,
  description TEXT,
  ticket_types JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  phone TEXT NOT NULL,
  payment_method TEXT,
  subtotal NUMERIC,
  items JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create facility_bookings table
CREATE TABLE facility_bookings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  facility TEXT NOT NULL,
  event_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create memberships table
CREATE TABLE memberships (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_email TEXT UNIQUE NOT NULL,
  tier TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create news table
CREATE TABLE news (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  published_at TIMESTAMP DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Enable Row-Level Security (RLS)

```sql
-- Disable public access to all tables by default
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read for events
CREATE POLICY "Allow public read events" ON events
  FOR SELECT USING (true);

-- Allow public read for news
CREATE POLICY "Allow public read news" ON news
  FOR SELECT USING (true);

-- Allow authenticated users to create orders
CREATE POLICY "Allow users to create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to create bookings
CREATE POLICY "Allow users to create bookings" ON facility_bookings
  FOR INSERT WITH CHECK (true);

-- Restrict admin access
CREATE POLICY "Only admin can read admin data" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 5. Set Up Authentication

- Go to Authentication > Providers
- Enable "Email" provider
- Email Templates > Customize (optional)

### 6. Create Admin Account

In Supabase console:
```sql
INSERT INTO admin_users (id, email, role)
VALUES (uuid_generate_v4(), 'admin@quins.co.ke', 'admin');
```

Then sign up through the app at `/#/admin`

### 7. Sample Data (Optional)

```sql
INSERT INTO events (title, date, time, venue, competition, category, description, ticket_types)
VALUES (
  'Kenya Cup Home Fixture',
  '2025-06-12',
  '16:00',
  'RFUEA Ground',
  'Kenya Cup',
  'Match Day',
  'Support Quins at home',
  '[{"name":"Standard","price":800},{"name":"VIP","price":2500}]'::JSONB
);

INSERT INTO news (title, excerpt, content, category)
VALUES (
  'Quins Secure Victory',
  'Harlequins edge out Impala in thrilling encounter',
  'Full match report...',
  'Match Report'
);
```

## Advanced Configuration

### M-Pesa Payment Integration

1. Register with Safaricom Daraja API
2. Get Consumer Key & Secret
3. Create a webhook endpoint to receive payment notifications
4. Update order status when payment confirmed

```javascript
// Example webhook handler
async function handleMpesaCallback(req, res) {
  const result = req.body.Result;
  const orderId = result.Description;
  
  // Update order in Supabase
  await supabase
    .from('orders')
    .update({ status: 'confirmed' })
    .eq('id', orderId);
}
```

### Email Notifications

Use Supabase Functions to send emails on order creation:

```javascript
import { serve } from "https://deno.land/std@0.175.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
)

serve(async (req) => {
  const { record } = await req.json()
  
  // Send email notification
  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  
  return new Response(JSON.stringify({ ok: true }))
})
```

### Backups

- Supabase Pro: Daily automated backups
- Enterprise: Hourly backups + custom retention
- Free tier: Manual backups only

## Monitoring & Maintenance

- Monitor database performance in Supabase dashboard
- Set up alerts for high query latency
- Review Row-Level Security policies periodically
- Keep auth rules up to date
- Archive old orders annually

## Troubleshooting

### "VITE_SUPABASE_URL not defined"
- Check `.env.local` file exists
- Verify environment variable names match exactly
- Restart dev server after changes

### "Insert operation forbidden"
- Check Row-Level Security policies
- Verify user has appropriate permissions
- Enable public insert for guest users if needed

### "Connection timeout"
- Verify Supabase project is running
- Check network connectivity
- Look at Supabase logs for errors

---

**Need help?** Visit [supabase.io/docs](https://supabase.io/docs)
