"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Phone } from "lucide-react";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={getStatusColor(status)}>{status}</span>
  );
}

function StatusDropdown({
  orderId,
  currentStatus,
  onStatusChange,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  onStatusChange: (id: string, status: OrderStatus) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleChange = async (status: OrderStatus) => {
    if (status === currentStatus) return;
    setUpdating(true);
    await onStatusChange(orderId, status);
    setUpdating(false);
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={(e) => handleChange(e.target.value as OrderStatus)}
        disabled={updating}
        className={`appearance-none cursor-pointer pr-6 pl-2.5 py-1 rounded-full text-[10px] font-bold outline-none ring-0 ${getStatusColor(currentStatus)} transition-colors disabled:opacity-50`}
        id={`status-select-${orderId}`}
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none"
        }}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status} className={`font-bold ${getStatusColor(status)} bg-white`}>
            {status}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        {updating ? (
          <span className="w-2.5 h-2.5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70" />
        ) : (
          <ChevronDown className="w-3 h-3 opacity-50" />
        )}
      </div>
    </div>
  );
}

export default function OrderTable({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (id: string, status: OrderStatus) => void;
}) {
  if (orders.length === 0) {
    return (
      <div
        className="text-center py-20 rounded-xl"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        <div
          className="text-5xl mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          📦
        </div>
        <p className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          No orders found
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Desktop table */}
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>City</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #2f81f7, #a371f7)",
                        color: "white",
                      }}
                    >
                      {order.customer_name.slice(0, 2).toUpperCase()}
                    </div>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {order.customer_name}
                    </span>
                  </div>
                </td>
                <td>
                  <a
                    href={`tel:${order.phone}`}
                    className="flex items-center gap-1 text-sm hover:underline"
                    style={{ color: "var(--accent-light)" }}
                  >
                    <Phone className="w-3 h-3" />
                    {order.phone}
                  </a>
                </td>
                <td>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {order.city}
                  </span>
                </td>
                <td>
                  <div className="max-w-[200px]">
                    <div
                      className="text-sm font-medium truncate"
                      style={{ color: "var(--text-primary)" }}
                      title={order.product_name}
                    >
                      {order.product_name}
                    </div>
                    {order.notes && (
                      <div
                        className="text-xs truncate"
                        style={{ color: "var(--text-muted)" }}
                        title={order.notes}
                      >
                        📝 {order.notes}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.quantity}
                  </span>
                </td>
                <td>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--accent-light)" }}
                  >
                    {formatCurrency(order.total_price)}
                  </span>
                </td>
                <td>
                  <StatusDropdown
                    orderId={order.id!}
                    currentStatus={order.order_status}
                    onStatusChange={onStatusChange}
                  />
                </td>
                <td>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {order.created_at ? formatDate(order.created_at) : "—"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards (shown instead of table on small screens) */}
      <div className="md:hidden flex flex-col gap-4 p-4" style={{ background: "var(--surface-2)" }}>
        {orders.map((order) => (
          <motion.div 
            key={order.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Header: Customer info & Date */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #2f81f7, #a371f7)", color: "white" }}
                >
                  {order.customer_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm" style={{ color: "var(--text-primary)" }}>{order.customer_name}</div>
                  {order.created_at && (
                    <div className="text-[11px] font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {formatDate(order.created_at)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Product Details */}
            <div className="rounded-xl p-3 text-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <div className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{order.product_name}</div>
              <div className="flex justify-between items-center text-xs" style={{ color: "var(--text-secondary)" }}>
                <span>Qty: <span className="font-bold ml-1" style={{ color: "var(--text-primary)" }}>{order.quantity}</span></span>
                <span>City: <span className="font-bold ml-1" style={{ color: "var(--text-primary)" }}>{order.city}</span></span>
              </div>
              <div className="mt-2 text-xs">
                <a href={`tel:${order.phone}`} className="font-medium flex items-center gap-1.5 w-max" style={{ color: "var(--accent-light)" }}>
                  <Phone className="w-3 h-3" /> {order.phone}
                </a>
              </div>
              {order.notes && (
                <div className="mt-2 text-xs border-t pt-2" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                  📝 {order.notes}
                </div>
              )}
            </div>

            {/* Bottom: Price & Status */}
            <div className="flex items-center justify-between pt-1 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="font-black text-lg" style={{ color: "var(--accent-light)" }}>
                {formatCurrency(order.total_price)}
              </div>
              <StatusDropdown
                orderId={order.id!}
                currentStatus={order.order_status}
                onStatusChange={onStatusChange}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
