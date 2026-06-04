"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/#order-form" },
];

function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("fr");

  useEffect(() => {
    // Read cookie on mount
    const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
    if (match) {
      const val = match[2];
      if (val.endsWith("ar")) {
        setCurrentLang("ar");
      } else {
        setCurrentLang("fr");
      }
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === "fr") {
      // Delete translate cookies completely to turn off translation and revert to native French
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    } else {
      const date = new Date();
      date.setTime(date.getTime() + (365*24*60*60*1000)); // 1 year expiry
      const expires = "; expires=" + date.toUTCString();

      document.cookie = "googtrans=/fr/ar; path=/" + expires;
      document.cookie = "googtrans=/fr/ar; path=/; domain=" + window.location.hostname + expires;
    }

    window.location.reload();
  };

  return (
    <div className="flex items-center gap-0.5 bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/60 shadow-sm relative z-50">
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all cursor-pointer ${
          currentLang === "fr"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-2 py-0.5 text-[9px] font-bold rounded transition-all cursor-pointer ${
          currentLang === "ar"
            ? "bg-white text-slate-900 shadow-xs"
            : "text-slate-500 hover:text-slate-900"
        }`}
      >
        AR
      </button>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full z-40 py-2 md:py-4"
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 bg-white/80 border border-slate-200/60 rounded-2xl px-6 backdrop-blur-md shadow-sm">
            
            {/* Logo (Left side) */}
            <Link href="/" className="flex items-center gap-2" id="navbar-logo">
              <div className="w-8.5 h-8.5 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shadow-sm">
                <svg
                  className="w-5 h-5"
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
              <span className="hidden md:inline text-xl font-extrabold tracking-tight text-slate-900 notranslate" translate="no">
                Dar<span className="text-blue-600">Lock</span>
              </span>
            </Link>

            {/* Mobile Store Name (Centered in the middle, between Logo and Hamburger toggle) */}
            <div className="flex md:hidden flex-1 justify-center px-2">
              <span className="text-base font-extrabold tracking-tight text-slate-900 notranslate" translate="no">
                Dar<span className="text-blue-600">Lock</span>
              </span>
            </div>

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

            {/* CTA + Language Selector + Mobile toggle */}
            <div className="flex items-center gap-3.5">
              <LanguageSwitcher />

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

      {/* Mobile Menu Dropdown */}
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
