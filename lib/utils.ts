// Simple className merger
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    Pending: "status-pending",
    Confirmed: "status-confirmed",
    Shipped: "status-shipped",
    Delivered: "status-delivered",
    Cancelled: "status-cancelled",
  };
  return map[status] ?? "status-pending";
}

export function generateWhatsAppMessage(order: {
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  product_name: string;
  quantity: number;
  total_price: number;
  notes?: string;
}): string {
  const msg = `
🔐 *New SmartLock Order!*

👤 *Customer:* ${order.customer_name}
📞 *Phone:* ${order.phone}
🏙️ *City:* ${order.city}
📍 *Address:* ${order.address}

🛍️ *Product:* ${order.product_name}
📦 *Quantity:* ${order.quantity}
💰 *Total:* ${order.total_price} MAD
💵 *Payment:* Cash on Delivery

${order.notes ? `📝 *Notes:* ${order.notes}` : ""}

✅ Please confirm this order.
  `.trim();

  return encodeURIComponent(msg);
}
