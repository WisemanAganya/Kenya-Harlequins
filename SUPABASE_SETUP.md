# Supabase Production Setup & Optimization

This document outlines the high-concurrency database architecture for Kenya Harlequins RFC, optimized for Christie Sevens and other major events.

## 1. Database Schema

Run these commands in the Supabase SQL Editor.

```sql
-- Enable Realtime
ALTER TABLE public.tickets SET (realtime = true);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  items JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optimized Tickets Table
CREATE TABLE IF NOT EXISTS public.tickets (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id BIGINT REFERENCES public.orders(id) ON DELETE CASCADE,
  event_title TEXT NOT NULL,
  ticket_type TEXT NOT NULL,
  full_name TEXT DEFAULT 'Quins Supporter',
  status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'checked_in', 'cancelled')),
  qr_hash TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  checked_in_at TIMESTAMP WITH TIME ZONE,
  staff_id UUID REFERENCES auth.users(id)
);

-- Admin Users (Reference for RLS)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Indices
CREATE INDEX IF NOT EXISTS idx_tickets_qr_hash ON public.tickets(qr_hash);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_order_id ON public.tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders(phone);
```

## 2. High-Concurrency Logic (RPC)

These functions handle atomic operations to prevent race conditions during peak traffic.

```sql
-- Function to handle atomic check-ins
CREATE OR REPLACE FUNCTION public.check_in_ticket(p_qr_hash TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_ticket_id BIGINT;
  v_status TEXT;
BEGIN
  -- Row-level locking to prevent concurrent check-ins
  SELECT id, status INTO v_ticket_id, v_status
  FROM public.tickets
  WHERE qr_hash = p_qr_hash
  FOR UPDATE;

  IF v_ticket_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Ticket not found');
  END IF;

  IF v_status = 'checked_in' THEN
    RETURN jsonb_build_object('success', false, 'message', 'Ticket already used');
  END IF;

  -- Perform check-in
  UPDATE public.tickets
  SET status = 'checked_in',
      checked_in_at = NOW(),
      staff_id = auth.uid()
  WHERE id = v_ticket_id;

  RETURN jsonb_build_object('success', true, 'message', 'Check-in successful');
END;
$$;

-- Atomic Order + Ticket Creation (Batch Processing)
CREATE OR REPLACE FUNCTION public.create_order_with_tickets(
  p_phone TEXT,
  p_payment_method TEXT,
  p_subtotal DECIMAL,
  p_items JSONB,
  p_tickets JSONB
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order_id BIGINT;
BEGIN
  -- Insert order
  INSERT INTO public.orders (phone, payment_method, subtotal, items, status)
  VALUES (p_phone, p_payment_method, p_subtotal, p_items, 'pending')
  RETURNING id INTO v_order_id;

  -- Bulk insert tickets
  INSERT INTO public.tickets (order_id, ticket_type, event_title, full_name, qr_hash, status)
  SELECT 
    v_order_id,
    (t->>'ticket_type'),
    (t->>'event_title'),
    (t->>'full_name'),
    (t->>'qr_hash'),
    'valid'
  FROM jsonb_array_elements(p_tickets) AS t;

  RETURN v_order_id;
END;
$$;
```

## 3. Security & RLS

```sql
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public order creation" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public order view" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public ticket view" ON public.tickets FOR SELECT USING (true);

-- Only authenticated staff can check-in
CREATE POLICY "Admin ticket check-in" ON public.tickets 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid()
  )
);
```

## 4. Production Strategy
*   **Realtime**: Enabled on `tickets` for live sync between 10+ scanning devices.
*   **Atomic Transations**: Using RPC functions to ensure data integrity during peak concurrency.
*   **Indexing**: Sub-millisecond lookup speeds via B-Tree indices.
*   **Load Handling**: Supabase automatically scales API nodes for massive throughput.
