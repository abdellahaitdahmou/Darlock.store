"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Airbnb Superhost",
    rating: 5,
    initials: "SJ",
    color: "bg-blue-50 border-blue-100 text-blue-600",
    text: "Absolutely critical for my Airbnb properties. The automatic code sync has saved me late-night check-in calls. Guests love how premium and fast it is!",
  },
  {
    name: "Marcus Aurelius",
    role: "Homeowner",
    rating: 5,
    initials: "MA",
    color: "bg-emerald-50 border-emerald-100 text-emerald-600",
    text: "The fingerprint unlock takes less than a second. My children no longer have to carry physical door keys that can easily get lost. Incredibly secure and worth every penny.",
  },
  {
    name: "David Vance",
    role: "Real Estate Developer",
    rating: 5,
    initials: "DV",
    color: "bg-purple-50 border-purple-100 text-purple-600",
    text: "We installed these across our new luxury townhouse complex. They add immediate value to buyers looking for modern home automation and elegant deadbolt visual styling.",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full py-8 relative overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Thousands of Happy Customers
          </h2>
          <p className="text-slate-500 text-xs font-semibold max-w-sm leading-normal mx-auto md:mx-0">
            Read stories from home property owners, real estate developers, and Airbnb vacation hosts who secured their entrance doors.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((user, i) => (
            <motion.div
              key={user.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 relative group transition-all duration-300"
            >
              {/* Quote icon overlay */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-blue-50 pointer-events-none transition-colors duration-300" />

              <div className="space-y-4 relative z-10">
                {/* Five Star Rating */}
                <div className="flex gap-0.5 text-amber-500">
                  {[...Array(user.rating)].map((_, index) => (
                    <Star key={index} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  "{user.text}"
                </p>
              </div>

              {/* Reviewer Meta info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 relative z-10">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${user.color}`}>
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">{user.name}</h4>
                  <p className="text-[9px] text-slate-500 font-bold truncate uppercase tracking-wider">{user.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
