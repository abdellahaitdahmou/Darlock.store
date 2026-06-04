"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { type Product } from "@/types";

interface StickyCheckoutBarProps {
  product: Product;
}

export default function StickyCheckoutBar({ product }: StickyCheckoutBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToForm = () => {
    // Look for quick checkout form first, fallback to order form container
    const element = 
      document.getElementById("quick-checkout-form") || 
      document.getElementById("order-form");
      
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Highlight the first field or form container to draw attention
      const nameInput = document.querySelector('input[name="customer_name"]') as HTMLInputElement;
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 800);
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 border-t border-slate-200/80 backdrop-blur-lg shadow-[0_-8px_30px_rgba(0,0,0,0.06)] py-3 px-4 sm:px-6"
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Product Thumbnail + Title + Price */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg border border-slate-200/60 bg-white p-1 overflow-hidden flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-slate-800 truncate leading-tight notranslate" translate="no">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-1.5 mt-0.5 notranslate" translate="no">
                  <span className="text-xs font-black text-blue-600">
                    <span>{product.discountedPrice.toFixed(0)}</span><span> MAD</span>
                  </span>
                  <span className="text-[10px] text-slate-400 line-through">
                    {product.originalPrice.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0">
              <motion.button
                onClick={handleScrollToForm}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="h-10 px-5 sm:px-6 rounded-xl font-extrabold text-[10px] sm:text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-yellow-300 animate-pulse" />
                <span>Order Now</span>
              </motion.button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
