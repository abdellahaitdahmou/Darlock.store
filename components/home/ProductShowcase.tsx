"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { type Product } from "@/types";

export default function ProductShowcase({ products }: { products: Product[] }) {
  return (
    <section id="products" className="relative w-full py-12 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Our Smart Lock Collection
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-md leading-relaxed mx-auto md:mx-0">
            Discover the perfect security solution for your home or Airbnb property. Featuring top-tier biometric and WiFi-enabled models.
          </p>
        </div>

        {/* Visual Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {products.map((item, i) => (
            <Link
              href={`/product/${item.slug}`}
              key={item.id}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-white border border-slate-200 h-[220px] md:h-[320px] flex flex-col justify-end p-3 md:p-6 cursor-pointer shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 block"
              >
                {/* Product background with scale zoom-on-hover */}
                <div className="absolute inset-0 z-0 bg-slate-50/50 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  {/* Ambient glow spotlights */}
                  <div className="absolute inset-0 bg-blue-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-24 h-24 md:w-48 md:h-48 mb-4 md:mb-8">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text label overlay */}
                <div className="relative z-20 space-y-1 bg-white/80 backdrop-blur-sm p-2 md:p-4 -m-1 md:-m-2 rounded-xl md:rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit block">
                      {item.category}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                  <h4 className="text-[11px] md:text-base font-black text-slate-900 leading-tight flex justify-between items-center gap-1">
                    <span className="truncate">{item.name}</span>
                    <span className="text-blue-600 text-[11px] md:text-sm flex-shrink-0">{item.discountedPrice.toFixed(2)} MAD</span>
                  </h4>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
