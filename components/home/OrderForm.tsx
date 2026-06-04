"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  PackageCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { z } from "zod";
import { generateWhatsAppMessage } from "@/lib/utils";

const WHATSAPP_NUMBER = "212682192641";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  badge?: string;
}

interface CartItem {
  product: CatalogProduct;
  quantity: number;
}

// ─── Static product catalogue (fast, no DB round-trip on the form) ──────────
const CATALOG: CatalogProduct[] = [
  {
    id: "wd03",
    name: "WD03 Smart Lock",
    price: 199,
    originalPrice: 299,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
    badge: "Best Seller",
  },
  {
    id: "fp100",
    name: "Fingerprint Lock Pro",
    price: 189,
    originalPrice: 299,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
    badge: "Popular",
  },
  {
    id: "wifi200",
    name: "WiFi Smart Lock 200",
    price: 249,
    originalPrice: 399,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
  },
  {
    id: "bt100",
    name: "Bluetooth Lock BT100",
    price: 129,
    originalPrice: 199,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
  },
  {
    id: "acc-bolt",
    name: "Smart Deadbolt Kit",
    price: 79,
    originalPrice: 119,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
  },
  {
    id: "acc-sensor",
    name: "Door Sensor Pack",
    price: 49,
    originalPrice: 79,
    imageUrl: "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
  },
];

// ─── Validation schema (contact info only — cart handled separately) ─────────
const contactSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(8, "Phone must be at least 8 digits")
    .regex(/^[+\d\s\-()\u0660-\u0669]{8,20}$/, "Invalid phone number"),
  address: z.string().min(10, "Please enter your full address"),
  notes: z.string().max(500).optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

// ─── STEP indicator ──────────────────────────────────────────────────────────
function StepDot({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${
          done
            ? "bg-emerald-500 border-emerald-500 text-white"
            : active
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-slate-100 border-slate-200 text-slate-400"
        }`}
      >
        {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : step}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OrderForm({
  productName = "WD03 Smart Lock",
}: {
  productName?: string;
  productImage?: string;
  price?: number;
}) {
  // pre-select the product passed from parent (e.g. "Order Now" button on a product card)
  const preSelected = CATALOG.find((p) => p.name === productName) ?? CATALOG[0];

  const [cart, setCart] = useState<CartItem[]>([
    { product: preSelected, quantity: 1 },
  ]);
  const [step, setStep] = useState<1 | 2>(1); // 1=pick products, 2=contact info
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<ContactValues & {
    total_price: number;
    items: CartItem[];
  } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function getQty(productId: string) {
    return cart.find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  function addToCart(product: CatalogProduct) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeOne(productId: string) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((i) => i.product.id !== productId);
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  const onSubmit = async (data: ContactValues) => {
    if (cart.length === 0) return;
    setIsSubmitting(true);
    setSubmitError(null);

    // Build a readable summary for the `product_name` field
    const productSummary = cart
      .map((i) => `${i.quantity}x ${i.product.name}`)
      .join(", ");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: data.customer_name,
          phone: data.phone,
          city: "-",
          address: data.address,
          product_name: productSummary,
          quantity: cartCount,
          notes: data.notes ?? "",
          total_price: cartTotal,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setOrderResult({ ...data, total_price: cartTotal, items: cart });
      setSubmitSuccess(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitSuccess && orderResult) {
    const productSummary = orderResult.items
      .map((i) => `${i.quantity}x ${i.product.name}`)
      .join(", ");

    const waMsg = generateWhatsAppMessage({
      customer_name: orderResult.customer_name,
      phone: orderResult.phone,
      city: "-",
      address: orderResult.address,
      product_name: productSummary,
      quantity: cartCount,
      total_price: orderResult.total_price,
      notes: orderResult.notes,
    });
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

    return (
      <section id="order-form" className="relative w-full py-8">
        <div className="w-full max-w-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-3xl border border-emerald-200 bg-white shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-emerald-50 border border-emerald-100">
              <PackageCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">
              Order Placed! 🎉
            </h3>
            <p className="text-sm mb-4 text-slate-600">
              Thank you, <strong className="text-slate-900">{orderResult.customer_name}</strong>!
              We'll call <strong className="text-blue-600">{orderResult.phone}</strong> to confirm.
            </p>

            {/* Order summary */}
            <div className="text-left rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6 space-y-2">
              {orderResult.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.quantity}× {item.product.name}</span>
                  <span>{(item.product.price * item.quantity).toFixed(2)} MAD</span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">{orderResult.total_price.toFixed(2)} MAD</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#22bf5b] transition-colors">
                  Track on WhatsApp
                </button>
              </a>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setCart([{ product: CATALOG[0], quantity: 1 }]);
                  setStep(1);
                }}
                className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                New Order
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <section id="order-form" className="relative w-full py-8 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Secure Checkout Terminal
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Build your order — add as many products as you like, then confirm.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6">
          <StepDot step={1} current={step} />
          <span className={`text-xs font-bold ${step === 1 ? "text-slate-900" : "text-slate-400"}`}>
            Select Products
          </span>
          <div className="flex-1 h-px bg-slate-200 mx-1" />
          <StepDot step={2} current={step} />
          <span className={`text-xs font-bold ${step === 2 ? "text-slate-900" : "text-slate-400"}`}>
            Contact & Delivery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* ── STEP 1: Product picker ── */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="md:col-span-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                  Choose Your Products
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATALOG.map((product) => {
                    const qty = getQty(product.id);
                    const inCart = qty > 0;
                    return (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -2 }}
                        className={`relative rounded-2xl border p-3 flex gap-3 items-center cursor-pointer transition-all duration-200 ${
                          inCart
                            ? "border-blue-400 bg-blue-50 shadow-[0_0_12px_rgba(59,130,246,0.12)]"
                            : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        {/* Badge */}
                        {product.badge && (
                          <span className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">
                            {product.badge}
                          </span>
                        )}

                        {/* Product image */}
                        <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex-shrink-0 overflow-hidden shadow-sm">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>

                        {/* Info + controls */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-black text-slate-800 leading-tight truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs font-black text-blue-600">
                              {product.price} MAD
                            </span>
                            <span className="text-[10px] text-slate-400 line-through">
                              {product.originalPrice}
                            </span>
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-2">
                            {inCart ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => removeOne(product.id)}
                                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-black w-4 text-center text-slate-900">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => addToCart(product)}
                                  className="w-6 h-6 rounded-lg bg-blue-600 border border-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(product.id)}
                                  className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Contact form ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="md:col-span-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                  Delivery Information
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="contact-form">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      {...register("customer_name")}
                      onFocus={() => setFocusedField("customer_name")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full border rounded-xl py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
                        focusedField === "customer_name"
                          ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.customer_name?.message && (
                      <p className="text-[10px] text-red-500 font-semibold">⚠ {errors.customer_name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      type="tel"
                      className={`w-full border rounded-xl py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
                        focusedField === "phone"
                          ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      placeholder="e.g. 06 12 34 56 78"
                    />
                    {errors.phone?.message && (
                      <p className="text-[10px] text-red-500 font-semibold">⚠ {errors.phone.message}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Delivery Address
                    </label>
                    <textarea
                      {...register("address")}
                      onFocus={() => setFocusedField("address")}
                      onBlur={() => setFocusedField(null)}
                      rows={3}
                      className={`w-full border rounded-xl py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none resize-none transition-all duration-300 ${
                        focusedField === "address"
                          ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      placeholder="City, Street, Building, Apartment…"
                    />
                    {errors.address?.message && (
                      <p className="text-[10px] text-red-500 font-semibold">⚠ {errors.address.message}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Notes (optional)
                    </label>
                    <input
                      {...register("notes")}
                      onFocus={() => setFocusedField("notes")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full border rounded-xl py-3 px-4 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
                        focusedField === "notes"
                          ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                      placeholder="Any special delivery instructions…"
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-lg text-[10px] font-bold bg-red-50 border border-red-200 text-red-600"
                      >
                        ⚠ {submitError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full mt-2 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                    id="submit-order-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Confirm Order — Pay on Delivery ({cartTotal.toFixed(2)} MAD)
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── RIGHT PANEL: Cart summary (always visible) ── */}
          <div className="md:col-span-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col space-y-4 shadow-sm sticky top-6">
            {/* Cart header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-extrabold text-slate-900">Your Cart</span>
              </div>
              {cartCount > 0 && (
                <span className="text-xs font-black bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
                  {cartCount} item{cartCount > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Cart items */}
            <div className="space-y-2 min-h-[80px]">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <ShoppingCart className="w-8 h-8 text-slate-200 mb-2" />
                    <p className="text-xs text-slate-400 font-semibold">Your cart is empty</p>
                    <p className="text-[10px] text-slate-300">Add a product from the left</p>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-slate-800 truncate leading-tight">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {item.quantity} × {item.product.price} MAD
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => removeOne(item.product.id)}
                          className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[10px] font-black w-3 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.product)}
                          className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-5 h-5 rounded-md bg-red-50 border border-red-100 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors ml-1"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Divider + Total */}
            {cart.length > 0 && (
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold">{cartTotal.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-100 pt-2">
                  <span>Total</span>
                  <span className="text-blue-600">{cartTotal.toFixed(2)} MAD</span>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="flex justify-between pt-1">
              {["Free Shipping", "Cash on Delivery", "2-Year Warranty"].map((label, i) => (
                <div key={i} className="flex items-center gap-1 text-[9px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Delivery badge */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 py-2.5 text-center">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest animate-pulse">
                Delivery in 24-48 hours
              </span>
            </div>

            {/* Step navigation buttons */}
            {step === 1 ? (
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Continue to Checkout
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Edit Products
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
