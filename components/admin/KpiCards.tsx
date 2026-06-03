"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  PackageCheck,
  DollarSign,
  XCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { KpiData } from "@/types";

const kpiConfig = [
  {
    key: "total" as keyof KpiData,
    label: "Total Orders",
    icon: ShoppingCart,
    color: "#2f81f7",
    bg: "rgba(47,129,247,0.12)",
    border: "rgba(47,129,247,0.25)",
  },
  {
    key: "pending" as keyof KpiData,
    label: "Pending",
    icon: Clock,
    color: "#d29922",
    bg: "rgba(210,153,34,0.12)",
    border: "rgba(210,153,34,0.25)",
  },
  {
    key: "confirmed" as keyof KpiData,
    label: "Confirmed",
    icon: CheckCircle,
    color: "#58a6ff",
    bg: "rgba(88,166,255,0.12)",
    border: "rgba(88,166,255,0.25)",
  },
  {
    key: "shipped" as keyof KpiData,
    label: "Shipped",
    icon: Truck,
    color: "#a371f7",
    bg: "rgba(163,113,247,0.12)",
    border: "rgba(163,113,247,0.25)",
  },
  {
    key: "delivered" as keyof KpiData,
    label: "Delivered",
    icon: PackageCheck,
    color: "#3fb950",
    bg: "rgba(63,185,80,0.12)",
    border: "rgba(63,185,80,0.25)",
  },
  {
    key: "cancelled" as keyof KpiData,
    label: "Cancelled",
    icon: XCircle,
    color: "#f85149",
    bg: "rgba(248,81,73,0.12)",
    border: "rgba(248,81,73,0.25)",
  },
  {
    key: "revenue" as keyof KpiData,
    label: "Revenue",
    icon: DollarSign,
    color: "#e3b341",
    bg: "rgba(227,179,65,0.12)",
    border: "rgba(227,179,65,0.25)",
    isCurrency: true,
  },
];

export default function KpiCards({ kpi }: { kpi: KpiData }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      {kpiConfig.map((item, index) => {
        const value = kpi[item.key];
        const displayValue = item.isCurrency
          ? formatCurrency(value as number)
          : (value as number).toLocaleString();

        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="rounded-xl p-4"
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div
              className="text-2xl font-black mb-1"
              style={{ color: item.color }}
            >
              {displayValue}
            </div>
            <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {item.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
