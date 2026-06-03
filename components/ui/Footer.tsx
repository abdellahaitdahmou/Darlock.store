"use client";

import Link from "next/link";
import { Lock, Shield, Phone, Mail, MapPin } from "lucide-react";

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
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2f81f7, #1f6feb)",
                }}
              >
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black">
                Smart<span style={{ color: "var(--accent-light)" }}>Lock</span>
              </span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Next-generation smart security solutions. Trusted by thousands of
              homeowners across Morocco.
            </p>
            <div className="space-y-2">
              {[
                { icon: Phone, text: "+212 682 19 26 41" },
                { icon: MapPin, text: "Agadir, Morocco" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
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
              <div key={category}>
                <h4 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={getLinkPath(category, link)}
                        className="text-sm transition-colors block"
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
          className="flex flex-wrap gap-4 mb-8 pb-8"
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} SmartLock. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--success)" }} />
            All transactions secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </footer>
  );
}
