"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Truck, ShieldCheck, CreditCard, Play, X, Zap } from "lucide-react";

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="hero" className="relative w-full overflow-hidden py-12 md:py-20 flex items-center min-h-[90vh]">
      {/* Background spotlights */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[140px] bg-blue-500/10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[120px] bg-purple-500/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Brand Copy, Trust Indicators & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 order-last lg:order-first">
            
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-fit mx-auto lg:mx-0"
            >
              <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-500/20 bg-blue-50">
                Smart Security for Modern Homes
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight text-slate-900"
            >
              Control Your Home<br />
              <span className="gradient-text">From Anywhere</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base leading-relaxed text-slate-600 max-w-xl font-medium mx-auto lg:mx-0"
            >
              Unlock with fingerprint, mobile app, passcode, or remote access. Designed for homeowners, Airbnb hosts, and modern properties.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2"
            >
              {[
                { icon: Star, label: "4.8★ Rating", text: "Customer reviews" },
                { icon: Truck, label: "Free Delivery", text: "Nationwide dispatch" },
                { icon: CreditCard, label: "Cash on Delivery", text: "Zero upfront risk" },
                { icon: ShieldCheck, label: "2-Year Warranty", text: "Full lock protection" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-1 items-center lg:items-start">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                    <item.icon className="w-4 h-4 text-blue-600" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full lg:w-auto"
            >
              <Link href="#order-form" className="block w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-8 h-[56px] rounded-full font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  id="hero-order-btn"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  Order Now
                </button>
              </Link>
              
              <button
                onClick={() => setVideoOpen(true)}
                className="w-full sm:w-auto px-8 h-[56px] rounded-full font-bold text-xs uppercase tracking-wider text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                id="hero-demo-btn"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <Play className="w-4 h-4 fill-slate-500 text-slate-500 group-hover:fill-slate-900 group-hover:text-slate-900 transition-colors" />
                Watch Demo
              </button>
            </motion.div>

          </div>

          {/* RIGHT SIDE: Large product image & Floating Highlights */}
          <div className="lg:col-span-5 flex justify-center relative pt-4 lg:pt-0 order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-[340px] h-[300px] sm:h-[380px] rounded-3xl relative flex items-center justify-center bg-white p-3 border border-slate-200 shadow-xl mx-auto"
            >
              {/* Wooden Lock mock backdrop */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                <Image
                  src="/products/hero-lock.png"
                  alt="Premium Luxury Smart Lock hardware"
                  fill
                  className="object-contain p-6 sm:p-8"
                  sizes="(max-width: 640px) 250px, 300px"
                  priority
                />
                
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
              </div>

              {/* Floating feature highlights with responsive positions */}
              {[
                { text: "Fingerprint Unlock", top: "12%", left: "-15%" },
                { text: "Mobile App Control", top: "35%", right: "-18%" },
                { text: "Auto Lock", bottom: "35%", left: "-12%" },
                { text: "Remote Access", bottom: "12%", right: "-15%" },
              ].map((feat, index) => (
                <motion.div
                  key={feat.text}
                  style={{
                    position: "absolute",
                    top: feat.top,
                    bottom: feat.bottom,
                    left: feat.left,
                    right: feat.right,
                  }}
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  className="hidden sm:block rounded-xl border border-slate-200 bg-white shadow-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-blue-600 backdrop-blur-sm pointer-events-none"
                >
                  {feat.text}
                </motion.div>
              ))}

            </motion.div>
          </div>

        </div>
      </div>

      {/* DYNAMIC VIDEO DEMO MODAL POPUP */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl p-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Demo Video Container - simulated video placeholder */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-50 flex flex-col justify-center items-center text-center p-6 space-y-4">
                <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
                
                <div className="w-16 h-16 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.1)] animate-pulse">
                  <Play className="w-6 h-6 fill-current" />
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className="text-lg font-black text-slate-900">SmartLock Pro Live Demonstration</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                    Simulating 0.3s Capacitive Fingerprint scans, encrypted Bluetooth connections, and remote Airbnb code dispatch keys.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
