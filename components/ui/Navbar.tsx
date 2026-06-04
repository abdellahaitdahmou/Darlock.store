"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/#order-form" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full z-40 py-4"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16 bg-white/80 border border-slate-200/60 rounded-2xl px-6 backdrop-blur-md shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" id="navbar-logo">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-600/10 text-blue-600 shadow-sm">
              <svg
                className="w-5.5 h-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="11" width="14" height="11" rx="2.5" ry="2.5" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" className="fill-current" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Dar<span className="text-blue-600">Lock</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-8">
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

          {/* CTA */}
          <a href="#order-form">
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
        </div>

        {/* Mobile Header (Replaces navbar/menu toggle completely on mobile - as shown in user screenshot) */}
        <div className="flex md:hidden items-center justify-center w-full h-14 bg-slate-950/85 border border-white/10 rounded-2xl px-6 backdrop-blur-md shadow-lg shadow-blue-500/5">
          <Link href="/" className="flex items-center gap-2 select-none" id="navbar-logo-mobile">
            <div className="w-6.5 h-6.5 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="11" width="14" height="11" rx="2.5" ry="2.5" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" className="fill-current" />
              </svg>
            </div>
            <span className="text-lg font-black tracking-wider text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
              Dar<span className="text-blue-500">Lock</span>
            </span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
