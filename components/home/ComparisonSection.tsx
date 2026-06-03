"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldAlert, Zap } from "lucide-react";

const comparisonData = [
  {
    feature: "Biometric Authentication",
    traditional: { status: false, text: "No (Physical keys only)" },
    smart: { status: true, text: "Yes (0.3s Fingerprint scanner)" },
  },
  {
    feature: "Remote Access Authority",
    traditional: { status: false, text: "No (Requires key handover)" },
    smart: { status: true, text: "Yes (Instant app unlock)" },
  },
  {
    feature: "Intrusion & Anti-Pick Siren",
    traditional: { status: false, text: "No (Easily pickable deadbolt)" },
    smart: { status: true, text: "Yes (110dB Siren push alert)" },
  },
  {
    feature: "Automatic Expiry Guest PINs",
    traditional: { status: false, text: "No (Requires key boxes)" },
    smart: { status: true, text: "Yes (Airbnb auto-sync)" },
  },
  {
    feature: "Entrance Activity History Logs",
    traditional: { status: false, text: "No (Zero event tracking)" },
    smart: { status: true, text: "Yes (Real-time logs app)" },
  },
];

export default function ComparisonSection() {
  return (
    <section className="w-full py-12 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-[140px] bg-blue-500/5 pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-200 bg-blue-50 w-fit mx-auto block shadow-sm">
            Mechanical vs. Digital
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Traditional Deadbolt vs. Smart Lock
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto font-medium">
            See the differences in physical security, entry convenience, and vacation rental hosting automation.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-200 bg-white p-1 md:p-6 overflow-hidden shadow-xl relative"
        >
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full border-collapse text-left text-xs md:text-sm min-w-[600px]">
              
              {/* Table Headers */}
              <thead>
                <tr className="border-b border-slate-200 pb-4">
                  <th className="py-4 px-4 font-black uppercase text-slate-500 tracking-wider">Security Features</th>
                  <th className="py-4 px-4 font-black uppercase text-slate-500 tracking-wider text-center bg-slate-50 rounded-t-xl border-x border-slate-200">
                    <div className="flex items-center justify-center gap-1.5 text-slate-500">
                      <ShieldAlert className="w-4 h-4 text-slate-400" />
                      Traditional Lock
                    </div>
                  </th>
                  <th className="py-4 px-4 font-black uppercase text-blue-600 tracking-wider text-center bg-blue-50 rounded-t-xl border-x border-blue-100">
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="w-4 h-4 text-blue-600 fill-current" />
                      Intelligent Smart Lock
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Feature Label */}
                    <td className="py-4 px-4 font-extrabold text-slate-900">{row.feature}</td>
                    
                    {/* Traditional Lock Status */}
                    <td className="py-4 px-4 text-center bg-slate-50/50 border-x border-slate-100">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <X className="w-4.5 h-4.5 text-red-500" />
                        <span className="text-[10px] text-slate-500 font-bold">{row.traditional.text}</span>
                      </div>
                    </td>

                    {/* Smart Lock Status */}
                    <td className="py-4 px-4 text-center bg-blue-50/50 border-x border-blue-50">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Check className="w-4.5 h-4.5 text-emerald-600" />
                        <span className="text-[10px] text-blue-600 font-bold">{row.smart.text}</span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
