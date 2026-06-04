"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Clock, ShieldAlert, Globe, ThumbsUp, Sparkles } from "lucide-react";
import Image from "next/image";

const airbnbBenefits = [
  {
    icon: CalendarCheck,
    title: "Seamless Self Check-In",
    desc: "Guests unlock the property using their temporary passcode or digital token, eliminating arrival delays.",
  },
  {
    icon: Clock,
    title: "Temporary Expiry Codes",
    desc: "Generate keys that activate precisely at 3 PM check-in and auto-expire exactly at 11 AM check-out.",
  },
  {
    icon: ShieldAlert,
    title: "Zero Late-Night Key Handovers",
    desc: "No more physical lockboxes, key hand-offs, or costly lock replacements due to lost keys.",
  },
  {
    icon: Globe,
    title: "Remote Access Authority",
    desc: "Modify entry codes, grant cleaners access, and check entrance logs instantly from anywhere.",
  },
  {
    icon: ThumbsUp,
    title: "Higher Guest Reviews",
    desc: "Boost your Airbnb booking scores by providing a modern, smooth 24/7 entrance arrival experience.",
  },
];

export default function AirbnbSection() {
  return (
    <section className="w-full py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[160px] bg-blue-500/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text Copy & Benefits cards */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start">
            
            <div className="space-y-3 flex flex-col items-center lg:items-start">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-200 bg-emerald-50 w-fit block shadow-sm mx-auto lg:mx-0">
                Vacation Rentals & Airbnb Hosts
              </span>
              
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Perfect for Airbnb Hosts
              </h2>
              
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Automate your property access completely. Generate unique check-in PIN codes that expire on checkout. Zero key handovers. 100% automated convenience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {airbnbBenefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-100 bg-emerald-50 text-emerald-600 mx-auto sm:mx-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900">{item.title}</h3>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT: Rental Door Frame Visualizer */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-[340px] rounded-3xl border border-slate-200 bg-white p-4 shadow-xl relative"
            >
              {/* Wooden Lock Frame Visual */}
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                <Image
                  src="/products/smart-lock.png"
                  alt="Vacation rental door smart lock mockup"
                  fill
                  className="object-contain opacity-90 p-6"
                  sizes="300px"
                />

                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />

                {/* Floating Airbnb active check-in badge overlay */}
                <div className="absolute top-4 left-4 right-4 rounded-xl bg-white/95 border border-slate-200 p-3 shadow-lg backdrop-blur-sm space-y-2">
                  <div className="flex justify-between items-center text-[8px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      AIRBNB SYNC ACTIVE
                    </span>
                    <span className="text-emerald-600">Active</span>
                  </div>

                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-extrabold text-slate-900">Temporary Guest Code</h5>
                    <p className="text-[9px] text-slate-500 font-medium">Guest: Alex Mercer (Stay: 3 Nights)</p>
                  </div>

                  {/* Booking timeline duration */}
                  <div className="rounded bg-slate-50 border border-slate-200 py-1 px-2 flex justify-between items-center text-[8px] font-bold text-slate-500">
                    <span>In: June 2, 3:00 PM</span>
                    <span>Out: June 5, 11:00 AM</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 border border-slate-200 px-3 py-1.5 flex items-center gap-2 backdrop-blur-sm z-20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Self Check-In Ready</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
