export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  savingsPercent: number;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  popular?: boolean;
  imageUrl: string;
  images?: string[];
}

export interface Order {
  id?: string;
  created_at?: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  product_name: string;
  quantity: number;
  total_price: number;
  order_status: OrderStatus;
  notes?: string;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderFormData {
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  product_name: string;
  quantity: number;
  notes?: string;
}

export interface KpiData {
  total: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  revenue: number;
}
