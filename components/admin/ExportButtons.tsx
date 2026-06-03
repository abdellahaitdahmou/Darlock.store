"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import type { Order } from "@/types";
import { formatDate } from "@/lib/utils";

function formatFileName(ext: string) {
  const date = new Date().toISOString().slice(0, 10);
  return `orders_export_${date}.${ext}`;
}

async function exportCSV(orders: Order[]) {
  const headers = [
    "ID",
    "Name",
    "Phone",
    "City",
    "Address",
    "Product",
    "Qty",
    "Total",
    "Status",
    "Date",
    "Notes",
  ];

  const rows = orders.map((o) => [
    o.id ?? "",
    o.customer_name,
    o.phone,
    o.city,
    o.address,
    o.product_name,
    String(o.quantity),
    String(o.total_price),
    o.order_status,
    o.created_at ? formatDate(o.created_at) : "",
    o.notes ?? "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = formatFileName("csv");
  link.click();
  URL.revokeObjectURL(url);
}

async function exportExcel(orders: Order[]) {
  // Dynamically import xlsx to avoid SSR issues
  const XLSX = await import("xlsx");

  const worksheetData = orders.map((o) => ({
    ID: o.id ?? "",
    "Customer Name": o.customer_name,
    Phone: o.phone,
    City: o.city,
    Address: o.address,
    Product: o.product_name,
    Quantity: o.quantity,
    "Total Price ($)": o.total_price,
    Status: o.order_status,
    Date: o.created_at ? formatDate(o.created_at) : "",
    Notes: o.notes ?? "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  // Style column widths
  worksheet["!cols"] = [
    { wch: 12 }, // ID
    { wch: 20 }, // Name
    { wch: 16 }, // Phone
    { wch: 14 }, // City
    { wch: 30 }, // Address
    { wch: 30 }, // Product
    { wch: 8 },  // Qty
    { wch: 12 }, // Total
    { wch: 12 }, // Status
    { wch: 20 }, // Date
    { wch: 30 }, // Notes
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, formatFileName("xlsx"));
}

export default function ExportButtons({ orders }: { orders: Order[] }) {
  const [loadingCsv, setLoadingCsv] = useState(false);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const handleCsv = async () => {
    setLoadingCsv(true);
    try {
      await exportCSV(orders);
    } finally {
      setLoadingCsv(false);
    }
  };

  const handleExcel = async () => {
    setLoadingExcel(true);
    try {
      await exportExcel(orders);
    } finally {
      setLoadingExcel(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleCsv}
        disabled={loadingCsv || orders.length === 0 ? true : undefined}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
        id="export-csv-btn"
        style={{
          background: "rgba(63,185,80,0.12)",
          color: "#3fb950",
          border: "1px solid rgba(63,185,80,0.25)",
        }}
        title="Export to CSV"
      >
        {loadingCsv ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        CSV
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleExcel}
        disabled={loadingExcel || orders.length === 0 ? true : undefined}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
        id="export-excel-btn"
        style={{
          background: "rgba(47,129,247,0.12)",
          color: "var(--accent-light)",
          border: "1px solid rgba(47,129,247,0.25)",
        }}
        title="Export to Excel"
      >
        {loadingExcel ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="w-4 h-4" />
        )}
        Excel
      </motion.button>

      {orders.length > 0 && (
        <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
          {orders.length} orders
        </span>
      )}
    </div>
  );
}
