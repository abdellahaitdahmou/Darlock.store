"use client";

import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Lock,
  RefreshCw,
  Home,
  Filter,
  LayoutDashboard,
} from "lucide-react";
import KpiCards from "@/components/admin/KpiCards";
import OrderTable from "@/components/admin/OrderTable";
import SearchBar from "@/components/admin/SearchBar";
import ExportButtons from "@/components/admin/ExportButtons";
import ProductsTab from "@/components/admin/ProductsTab";
import type { Order, OrderStatus, KpiData } from "@/types";

const STATUS_FILTERS = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

const DEFAULT_KPI: KpiData = {
  total: 0,
  pending: 0,
  confirmed: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
  revenue: 0,
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [kpi, setKpi] = useState<KpiData>(DEFAULT_KPI);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [toast, setToast] = useState<{title: string; body: string} | null>(null);
  const previousCountRef = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");

  const playPing = () => {
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.volume = 0.5;
      audio.play();
    } catch(e) {}
  };

  const fetchOrders = useCallback(
    async (signal?: AbortSignal) => {
      if (activeTab !== "orders") return; // Only fetch if on orders tab
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          search,
          status: statusFilter,
          limit: "200",
        });
        const res = await fetch(`/api/admin/orders?${params}`, { signal });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders ?? []);
          setKpi(data.kpi ?? DEFAULT_KPI);
          setLastUpdated(new Date());

          const currentTotal = data.kpi?.total ?? 0;
          if (previousCountRef.current !== null && currentTotal > previousCountRef.current) {
            playPing();
            setToast({
              title: "New Order Received!",
              body: "A customer just placed a new COD order."
            });
            setTimeout(() => setToast(null), 5000);
          }
          previousCountRef.current = currentTotal;
        } else {
          throw new Error(data.error ?? "Unknown error");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, activeTab]
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetchOrders(controller.signal);
    }, search ? 400 : 0); // Debounce search

    // Polling every 15 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      controller.abort();
    };
  }, [fetchOrders, search]);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, order_status: status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, order_status: status } : o))
        );
        startTransition(() => {
          fetchOrders();
        });
      }
    } catch {
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleRefresh = () => {
    startTransition(() => {
      fetchOrders();
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      {/* Admin Header */}
      <header
        className="sticky top-0 z-40 shadow-sm"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 sm:py-0 sm:h-16">
            {/* Brand */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #2f81f7, #1f6feb)",
                  }}
                >
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-black text-lg leading-none">
                    Smart<span style={{ color: "var(--accent-light)" }}>Lock</span>
                  </div>
                  <div
                    className="text-xs flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <LayoutDashboard className="w-3 h-3" />
                    Admin Dashboard
                  </div>
                </div>
              </div>
              
              {/* Mobile Last Updated (hidden on desktop) */}
              {lastUpdated && activeTab === "orders" && (
                <span
                  className="sm:hidden text-[10px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              <div className="flex bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-1 shrink-0">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === "orders" ? "bg-white text-blue-600 shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Orders
                </button>
                <button 
                  onClick={() => setActiveTab("products")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === "products" ? "bg-white text-blue-600 shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Products
                </button>
              </div>

              {lastUpdated && activeTab === "orders" && (
                <span
                  className="hidden sm:block text-xs shrink-0 mx-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              {activeTab === "orders" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  disabled={loading || isPending ? true : undefined}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium shrink-0"
                  id="admin-refresh-btn"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading || isPending ? "animate-spin" : ""}`}
                  />
                  <span className="hidden sm:block">Refresh</span>
                </motion.button>
              )}
              <Link href="/" id="admin-home-link" className="shrink-0 ml-auto sm:ml-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:block">Store</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container-xl py-8">
        {activeTab === "products" ? (
          <ProductsTab />
        ) : (
          <>
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-black mb-1" style={{ color: "var(--text-primary)" }}>
                Order Management
              </h1>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Manage, track, and update all COD orders in real time.
              </p>
            </motion.div>

            {/* KPI Cards */}
            <KpiCards kpi={kpi} />

            {/* Controls bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              {/* Search */}
              <SearchBar value={search} onChange={setSearch} />

              {/* Export buttons */}
              <ExportButtons orders={orders} />
            </motion.div>

            {/* Status filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {STATUS_FILTERS.map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStatusFilter(filter.value)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  id={`filter-${filter.value}`}
                  style={
                    statusFilter === filter.value
                      ? {
                          background: "linear-gradient(135deg, #2f81f7, #1f6feb)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(47,129,247,0.3)",
                        }
                      : {
                          background: "var(--surface-2)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border)",
                        }
                  }
                >
                  <Filter className="w-3 h-3" />
                  {filter.label}
                  {filter.value !== "all" && (
                    <span
                      className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background:
                          statusFilter === filter.value
                            ? "rgba(255,255,255,0.2)"
                            : "var(--surface-3)",
                        color:
                          statusFilter === filter.value
                            ? "white"
                            : "var(--text-muted)",
                      }}
                    >
                      {filter.value === "Pending" && kpi.pending}
                      {filter.value === "Confirmed" && kpi.confirmed}
                      {filter.value === "Shipped" && kpi.shipped}
                      {filter.value === "Delivered" && kpi.delivered}
                      {filter.value === "Cancelled" && kpi.cancelled}
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Error state */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl mb-4 text-sm"
                style={{
                  background: "rgba(248,81,73,0.1)",
                  border: "1px solid rgba(248,81,73,0.3)",
                  color: "#f85149",
                }}
              >
                ⚠ {error}{" "}
                <button
                  onClick={handleRefresh}
                  className="underline ml-2"
                >
                  Retry
                </button>
              </motion.div>
            )}

            {/* Loading state */}
            {loading ? (
              <div className="py-20 text-center">
                <div
                  className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                  style={{
                    borderColor: "var(--accent)",
                    borderTopColor: "transparent",
                  }}
                />
                <p style={{ color: "var(--text-muted)" }}>Loading orders...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <OrderTable orders={orders} onStatusChange={handleStatusChange} />
              </motion.div>
            )}

            {/* Results count */}
            {!loading && (
              <p
                className="text-xs mt-4 text-right"
                style={{ color: "var(--text-muted)" }}
              >
                Showing {orders.length} of {kpi.total} total orders
              </p>
            )}
          </>
        )}
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-start gap-3"
            style={{
              background: "rgba(10, 15, 25, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(47, 129, 247, 0.3)",
              boxShadow: "0 10px 40px rgba(47, 129, 247, 0.2)"
            }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🛎️</span>
            </div>
            <div>
              <h4 className="text-sm font-black text-white">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{toast.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
