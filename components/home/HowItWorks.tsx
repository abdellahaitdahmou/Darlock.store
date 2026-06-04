"use client";

import { motion } from "framer-motion";
import { Wrench, Smartphone, KeyRound, Eye } from "lucide-react";

const steps = [
  {
    icon: Wrench,
    number: "01",
    title: "Install in Minutes",
    desc: "Fits standard door frames and deadbolts. Requires only a screwdriver with zero complex wiring or locksmith costs.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Connect to Mobile App",
    desc: "Pair secure biometric encryption keys with our iOS or Android application in seconds over offline Bluetooth.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "Create Access Methods",
    desc: "Register fingerprint files, keypad PIN codes, or schedule temporary access codes for check-in guest accounts.",
  },
  {
    icon: Eye,
    number: "04",
    title: "Monitor & Control Remotely",
    desc: "Unlock from anywhere, verify entrance security records, and manage multiple property logs directly in real-time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full blur-[140px] bg-blue-500/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
            From unboxing to fully securing your home in under 20 minutes. Simple, quick, and military-grade.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Grid line indicator connecting cards */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[1px] bg-slate-200 pointer-events-none z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left group space-y-4"
            >
              {/* Stepper Node Icon Container */}
              <div className="flex justify-center md:justify-start items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-200 bg-white text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300 shadow-sm relative">
                  <step.icon className="w-6 h-6" />
                  
                  {/* Floating Number Overlay */}
                  <span className="absolute -top-2 -right-2 text-[9px] font-black text-blue-600 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Text Description */}
              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 font-medium">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
