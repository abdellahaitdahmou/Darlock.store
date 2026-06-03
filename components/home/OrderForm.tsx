"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Plus,
  Minus
} from "lucide-react";
import { orderSchema, type OrderFormValues } from "@/lib/validations";
import { generateWhatsAppMessage } from "@/lib/utils";

const WHATSAPP_NUMBER = "212682192641";

interface OrderFormProps {
  productName?: string;
  productImage?: string;
  price?: number;
}

export default function OrderForm({
  productName = "WD03 Smart Lock",
  productImage = "https://wdlinkma.com/wp-content/uploads/2026/02/wd03-1.webp",
  price = 199.00
}: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderResult, setOrderResult] = useState<{
    customer_name: string;
    phone: string;
    city: string;
    address: string;
    product_name: string;
    quantity: number;
    total_price: number;
  } | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      product_name: productName,
      quantity: 1,
    },
  });

  // Sync props and state to form
  useEffect(() => {
    setValue("product_name", productName);
  }, [productName, setValue]);

  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity, setValue]);

  const incrementQuantity = () => setQuantity(q => (q < 10 ? q + 1 : q));
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const totalPrice = price * quantity;

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setSubmitError(
          result.error ?? "Something went wrong. Please try again."
        );
        return;
      }

      setOrderResult(result.order);
      setSubmitSuccess(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess && orderResult) {
    const waMsg = generateWhatsAppMessage(orderResult);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

    return (
      <section id="order-form" className="relative w-full py-8">
        <div className="w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-3xl border border-emerald-200 bg-white shadow-xl relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-emerald-50 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>

            <h3 className="text-2xl font-black mb-3 text-slate-900 tracking-tight">
              Order Placed Successfully!
            </h3>
            <p className="text-sm mb-6 text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{orderResult.customer_name}</strong>! Your order has been registered. Our security team will contact you at <strong className="text-blue-600">{orderResult.phone}</strong> shortly to confirm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#22bf5b] transition-colors"
                >
                  Track on WhatsApp
                </button>
              </a>
              <button
                onClick={() => setSubmitSuccess(false)}
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

  return (
    <section id="order-form" className="relative w-full py-8 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Secure Checkout Terminal
          </h2>
        </div>

        {/* Form Split Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANEL: Mock Invoice box */}
          <div className="md:col-span-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col space-y-6 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
            
            {/* Invoice Top Line */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">Your Order</span>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">COD</span>
            </div>

            {/* Product description card inside glowing container */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-4 items-center relative z-10">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 flex-shrink-0 flex items-center justify-center shadow-sm">
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                <div className="relative w-full h-full p-2">
                  <img
                    src={productImage}
                    alt={productName}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <h4 className="text-[11px] font-black text-slate-900 truncate leading-tight uppercase tracking-wider mb-2">
                  {productName}
                </h4>
                <div className="flex justify-between items-center mt-1">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 border border-slate-200 bg-white rounded-lg p-1 shadow-sm">
                    <button 
                      type="button" 
                      onClick={decrementQuantity}
                      className="w-5 h-5 flex items-center justify-center rounded bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] font-black w-3 text-center text-slate-900">{quantity}</span>
                    <button 
                      type="button" 
                      onClick={incrementQuantity}
                      className="w-5 h-5 flex items-center justify-center rounded bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <span className="text-[11px] text-slate-600 font-bold">{price.toFixed(2)} MAD</span>
                </div>
                <div className="text-right text-sm font-black text-blue-600 mt-2 border-t border-slate-200 pt-2">
                  Total: {totalPrice.toFixed(2)} MAD
                </div>
              </div>
            </div>

            {/* Bottom checkmarks guarantees */}
            <div className="flex justify-between items-center pt-2 relative z-10">
              {[
                { label: "Free Shipping" },
                { label: "Cash on Delivery" },
                { label: "2-Year Warranty" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Glowing neon green tracker badge */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 py-3 text-center relative z-10 shadow-sm">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest animate-pulse">
                Delivery typically in 24-48 hours
              </span>
            </div>

          </div>

          {/* RIGHT PANEL: Form Inputs with Neon Focus Rings */}
          <div className="md:col-span-7 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 relative shadow-sm">
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Hidden Fields for products */}
              <input type="hidden" {...register("product_name")} />
              <input type="hidden" {...register("quantity")} />

              {/* First name field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
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
                </div>
                {errors.customer_name?.message && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                    ⚠ {errors.customer_name.message}
                  </p>
                )}
              </div>



              {/* Phone field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
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
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone?.message && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                    ⚠ {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Focus address field */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Delivery Address
                </label>
                <div className="relative">
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
                    placeholder="Enter full delivery address (City, Street, Building, Apartment)"
                  />
                </div>
                {errors.address?.message && (
                  <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                    ⚠ {errors.address.message}
                  </p>
                )}
              </div>

              {/* Submit Error Warnings */}
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

              {/* Place Order Luxury Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                id="submit-order-btn"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Place Order — Pay on Delivery
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
