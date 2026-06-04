"use client";

import Link from "next/link";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Products: [
    "Fingerprint Locks",
    "WiFi Smart Locks",
    "Bluetooth Locks",
    "Smart Door Locks",
    "Accessories",
  ],
  Company: ["About Us", "Contact", "Careers", "Press"],
  Support: ["FAQ", "Installation Guide", "Warranty", "Returns", "Track Order"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-8 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2.5 mb-4">
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
              <span className="text-lg font-extrabold tracking-tight text-slate-900 notranslate" translate="no">
                Dar<span className="text-blue-600">Lock</span>
              </span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed max-w-sm mx-auto md:mx-0" style={{ color: "var(--text-secondary)" }}>
              Next-generation smart security solutions. Trusted by thousands of
              homeowners across Morocco.
            </p>
            <div className="space-y-2 flex flex-col items-center md:items-start w-full">
              {[
                { icon: Phone, text: "+212 682 19 26 41" },
                { icon: MapPin, text: "Agadir, Morocco" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm justify-center md:justify-start" style={{ color: "var(--text-muted)" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: "var(--accent-light)" }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => {
            const getLinkPath = (cat: string, linkText: string) => {
              const slug = linkText.toLowerCase().replace(/\s+/g, '-');
              if (cat === "Products") return `/category/${slug}`;
              if (cat === "Company") return `/company/${slug}`;
              if (cat === "Support") return `/support/${slug}`;
              if (cat === "Legal") return `/legal/${slug}`;
              return `/${slug}`;
            };

            return (
              <div key={category} className="text-center md:text-left flex flex-col items-center md:items-start">
                <h4 className="text-sm font-bold mb-4 w-full" style={{ color: "var(--text-primary)" }}>
                  {category}
                </h4>
                <ul className="space-y-2 flex flex-col items-center md:items-start w-full">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={getLinkPath(category, link)}
                        className="text-sm transition-colors block text-center md:text-left"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent-light)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-muted)")
                        }
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Trust badges row */}
        <div
          className="flex justify-center md:justify-start flex-wrap gap-4 mb-8 pb-8"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {[
            "🏆 Best Smart Lock 2024",
            "✓ ISO 27001 Certified",
            "🛡️ Military Grade Security",
            "🚚 Free Shipping",
            "💵 Cash on Delivery",
            "↩️ 30-Day Returns",
          ].map((badge, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "var(--surface-2)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm notranslate" translate="no" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} DarLock. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <Shield className="w-3.5 h-3.5 animate-pulse" style={{ color: "var(--success)" }} />
            All transactions secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </footer>
  );
}
