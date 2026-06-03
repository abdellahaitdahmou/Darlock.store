-- ============================================================
-- SmartLock eCommerce — Supabase SQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  customer_name   TEXT NOT NULL CHECK (length(customer_name) >= 2 AND length(customer_name) <= 100),
  phone           TEXT NOT NULL CHECK (length(phone) >= 8 AND length(phone) <= 20),
  city            TEXT NOT NULL CHECK (length(city) >= 2 AND length(city) <= 100),
  address         TEXT NOT NULL CHECK (length(address) >= 10 AND length(address) <= 500),
  product_name    TEXT NOT NULL CHECK (length(product_name) >= 1),
  quantity        INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1 AND quantity <= 10),
  total_price     NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (total_price >= 0),
  order_status    TEXT NOT NULL DEFAULT 'Pending' CHECK (
    order_status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')
  ),
  notes           TEXT DEFAULT '' CHECK (length(notes) <= 500)
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Index for filtering by status (most common admin query)
CREATE INDEX IF NOT EXISTS idx_orders_status
  ON public.orders (order_status);

-- Index for sorting by created_at (dashboard default view)
CREATE INDEX IF NOT EXISTS idx_orders_created_at
  ON public.orders (created_at DESC);

-- Composite index for admin search (name, phone, city)
CREATE INDEX IF NOT EXISTS idx_orders_search
  ON public.orders USING GIN (
    to_tsvector('english', customer_name || ' ' || phone || ' ' || city)
  );

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT (public order form)
CREATE POLICY "Anyone can place an order"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anyone to SELECT (needed for COD confirmation flow)
-- In production, restrict this to authenticated admin users
CREATE POLICY "Anyone can view orders"
  ON public.orders
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow updates (for status changes via admin)
CREATE POLICY "Anyone can update order status"
  ON public.orders
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SAMPLE DATA (optional - remove in production)
-- ============================================================

INSERT INTO public.orders
  (customer_name, phone, city, address, product_name, quantity, total_price, order_status, notes)
VALUES
  ('John Smith', '+1-555-0101', 'New York', '123 Main St, Apt 4B, Manhattan, NY 10001', 'ProLock X7 Fingerprint Smart Lock', 1, 189.00, 'Delivered', 'Leave with doorman'),
  ('Sarah Johnson', '+1-555-0102', 'Los Angeles', '456 Oak Avenue, Hollywood, CA 90028', 'NexGuard WiFi Smart Lock Pro', 2, 498.00, 'Shipped', ''),
  ('Michael Davis', '+1-555-0103', 'Chicago', '789 Elm Street, Lincoln Park, IL 60614', 'VaultMax Pro Smart Door Lock', 1, 299.00, 'Confirmed', 'Call before delivery'),
  ('Emily Wilson', '+1-555-0104', 'Houston', '321 Pine Road, River Oaks, TX 77019', 'BlueKey Bluetooth Door Lock', 1, 129.00, 'Pending', ''),
  ('Robert Brown', '+1-555-0105', 'Phoenix', '654 Maple Drive, Scottsdale, AZ 85251', 'SafeKit Accessory Bundle', 3, 147.00, 'Pending', 'Business address'),
  ('Lisa Martinez', '+1-555-0106', 'San Antonio', '987 Cedar Lane, Alamo Heights, TX 78209', 'ProLock X7 Fingerprint Smart Lock', 2, 378.00, 'Delivered', ''),
  ('David Anderson', '+1-555-0107', 'Dallas', '147 Birch Blvd, Highland Park, TX 75205', 'NexGuard WiFi Smart Lock Pro', 1, 249.00, 'Confirmed', ''),
  ('Jennifer Taylor', '+1-555-0108', 'San Jose', '258 Willow Way, Willow Glen, CA 95125', 'VaultMax Pro Smart Door Lock', 1, 299.00, 'Shipped', 'Weekend delivery only');

-- ============================================================
-- USEFUL QUERIES
-- ============================================================

-- View all orders with counts by status:
-- SELECT order_status, COUNT(*) as count, SUM(total_price) as revenue
-- FROM orders
-- GROUP BY order_status
-- ORDER BY count DESC;

-- Search orders by customer name or phone:
-- SELECT * FROM orders
-- WHERE customer_name ILIKE '%john%' OR phone ILIKE '%555%'
-- ORDER BY created_at DESC;
