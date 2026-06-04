"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Zap } from "lucide-react";
import { type Product } from "@/types";

interface ProductCartPreviewProps {
  product: Product;
}

export default function ProductCartPreview({ product }: ProductCartPreviewProps) {
  const [qty, setQty] = useState(1);

  const productPrice = product.discountedPrice;
  const totalPrice = productPrice * qty;

  const handleContinue = () => {
    // Send event to OrderForm at the bottom to sync product and quantity
    window.dispatchEvent(
      new CustomEvent("set-product-qty", {
        detail: { name: product.name, qty: qty },
      })
    );

    // Scroll to the order form smoothly
    const element = document.getElementById("order-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col space-y-4 py-4 border-y border-slate-200/80">
      
      {/* Votre panier / Cart summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-extrabold text-slate-900">Votre panier</span>
        </div>

        {/* Product row with Quantity Selector */}
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 mb-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-slate-800 truncate leading-tight notranslate" translate="no">
              {product.name}
            </p>
            <p className="text-[10px] text-slate-500 notranslate" translate="no">
              <span>{productPrice.toFixed(0)}</span><span> MAD</span>
            </p>
          </div>

          {/* Plus/Minus Buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0 notranslate" translate="no">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <span className="text-[10px] font-black w-3 text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((prev) => Math.min(10, prev + 1))}
              className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-slate-100 pt-2.5 space-y-1.5 notranslate" translate="no">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Subtotal</span>
            <span className="font-bold"><span>{totalPrice.toFixed(0)}</span><span> MAD</span></span>
          </div>
          <div className="flex justify-between text-[10px] text-emerald-600 font-semibold">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-xs font-black text-slate-900 border-t border-slate-100 pt-1.5">
            <span>Total</span>
            <span className="text-blue-600"><span>{totalPrice.toFixed(0)}</span><span> MAD</span></span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleContinue}
        className="w-full h-12 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
      >
        <Zap className="w-4 h-4 fill-current text-yellow-300 animate-bounce" />
        Continue to Checkout
      </button>

    </div>
  );
}
