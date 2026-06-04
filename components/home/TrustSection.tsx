"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Truck, Headphones, Users } from "lucide-react";

const trustItems = [
  { icon: CreditCard, label: "Secure Payments", desc: "100% Encrypted COD" },
  { icon: ShieldCheck, label: "2-Year Warranty", desc: "Full coverage guaranteed" },
  { icon: Truck, label: "Fast Delivery", desc: "Dispatched within 24h" },
  { icon: Headphones, label: "Customer Support", desc: "24/7 Live callback agent" },
  { icon: Users, label: "Happy Customers", desc: "Thousands of properties secured" },
];

export default function TrustSection() {
  return (
    <section className="w-full py-8 border-y border-slate-200 bg-white/50">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3.5 group p-2 rounded-xl"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 bg-slate-50 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-extrabold text-slate-900 leading-tight truncate">
                  {item.label}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
