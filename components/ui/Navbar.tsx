"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, Menu, X, Shield } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/#order-form" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/#order-form" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full z-40 py-4"
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 bg-white/80 border border-slate-200/60 rounded-2xl px-6 backdrop-blur-md shadow-sm">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5" id="navbar-logo">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-blue-500/20 bg-blue-50"
                style={{
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.15)",
                }}
              >
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold tracking-wide text-slate-600 hover:text-slate-900 transition-colors duration-300 relative py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-4">
              <a href="#order-form" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white uppercase tracking-wider bg-blue-600 hover:bg-blue-700 transition-colors"
                  id="navbar-order-btn"
                  style={{
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  Order Now
                </motion.button>
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                id="navbar-mobile-toggle"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-24 z-30 md:hidden bg-white/95 border border-slate-200/80 shadow-xl rounded-2xl p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2 border-b border-slate-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order-form"
                onClick={() => setMobileOpen(false)}
                className="mt-2"
              >
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white uppercase tracking-wider bg-blue-600 hover:bg-blue-700"
                >
                  Order Now — Pay COD
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
