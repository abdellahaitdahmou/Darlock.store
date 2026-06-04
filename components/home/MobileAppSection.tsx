"use client";

import { motion } from "framer-motion";
import { Wifi, Bell, Key, History, Landmark, ShieldCheck, Lock, Unlock } from "lucide-react";
import { useState } from "react";

const appFeatures = [
  {
    icon: Wifi,
    title: "Remote Unlock",
    desc: "Instantly unlock your door from anywhere in the world with a single encrypted toggle tap.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Receive instant push notifications on your phone whenever anyone locks, unlocks, or picks the deadbolt.",
  },
  {
    icon: Key,
    title: "Guest Access Codes",
    desc: "Generate temporary custom PIN codes for visiting family, maintenance workers, or check-in tenants.",
  },
  {
    icon: History,
    title: "Activity History",
    desc: "Review logs showing names, timestamps, and unlocking methods for every entry and exit event.",
  },
  {
    icon: Landmark,
    title: "Multi-Property Management",
    desc: "Manage and monitor smart lock hardware across multiple rentals or properties from one dashboard.",
  },
];

export default function MobileAppSection() {
  const [appLocked, setAppLocked] = useState(true);

  return (
    <section className="w-full py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[160px] bg-blue-500/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Realistic Phone Mockup Shell */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-[280px] h-[520px] rounded-[40px] border-[6px] border-slate-100 bg-slate-200 p-2 shadow-2xl relative"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-100 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* Phone Display Screen */}
              <div className="w-full h-full rounded-[30px] overflow-hidden bg-white border border-slate-200 p-4 flex flex-col justify-between relative shadow-inner">
                {/* Internal grids */}
                <div className="absolute inset-0 grid-lines opacity-[0.05] pointer-events-none" />

                {/* Dashboard Header Status bar */}
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 pt-1 relative z-10">
                  <span>9:41 AM</span>
                  <div className="flex gap-1.5 items-center">
                    <Wifi className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">Secure LTE</span>
                  </div>
                </div>

                {/* Main App Content Panel */}
                <div className="flex-grow flex flex-col justify-center items-center py-6 text-center space-y-6 relative z-10">
                  
                  {/* Status Ring Indicator */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      Status Panel
                    </span>
                    <h4 className="text-lg font-black text-slate-900">
                      {appLocked ? "Door Secured" : "Door Unlocked"}
                    </h4>
                  </div>

                  {/* Pulsing Toggle Unlock Button */}
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAppLocked(!appLocked)}
                    className={`w-28 h-28 rounded-full border flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 ${
                      appLocked
                        ? "bg-slate-50 border-slate-200 text-slate-400"
                        : "bg-blue-50 border-blue-200 text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    }`}
                  >
                    {appLocked ? (
                      <Lock className="w-10 h-10" />
                    ) : (
                      <Unlock className="w-10 h-10" />
                    )}
                  </motion.div>

                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    {appLocked ? "Tap circle to unlock" : "Tap circle to secure lock"}
                  </span>

                </div>

                {/* Bottom activity summary feed */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2 relative z-10 shadow-sm">
                  <div className="flex justify-between items-center text-[9px] font-bold border-b border-slate-200 pb-1.5 text-slate-500">
                    <span>Recent History Logs</span>
                    <span className="text-blue-600">View All</span>
                  </div>
                  
                  <div className="space-y-1.5 text-[9px] font-semibold text-slate-600">
                    <div className="flex justify-between">
                      <span className="truncate text-slate-900">✓ Fingerprint Access</span>
                      <span className="text-slate-400">John D. (2m ago)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="truncate">✓ Temporary guest code</span>
                      <span className="text-slate-400">Airbnb (3h ago)</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* RIGHT: App features list */}
          <div className="lg:col-span-7 flex flex-col space-y-6 order-1 lg:order-2">
            
            <div className="space-y-3 text-center lg:text-left">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-200 bg-blue-50 w-fit block shadow-sm mx-auto lg:mx-0">
                Smart Companion App
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Complete Control In Your Palm
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
                Our application integrates military-grade digital tokens with your lock, giving you complete access authority without any physical keychains.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appFeatures.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-blue-100 bg-blue-50 text-blue-600">
                    <feat.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900">{feat.title}</h3>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
