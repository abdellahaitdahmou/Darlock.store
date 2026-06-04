"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqItems = [
  {
    question: "How long does the battery last?",
    answer: "Our smart locks run on standard AA alkaline batteries and last up to 18 months under normal daily usage. You will receive active low-battery alerts in the app and blinking red notifications on the lock keypad when the battery drops below 20%. In emergencies, you can inject temporary power via an external USB-C override port.",
  },
  {
    question: "Is installation difficult?",
    answer: "No, installation is designed for DIY convenience and takes under 20 minutes. It fits 99% of standard doors and deadbolts. The only tool you need is a standard screwdriver—there is zero complex drilling, wiring, or locksmith costs required. Clear interactive step-by-step instructions are available in the companion mobile app.",
  },
  {
    question: "Can I use it without internet?",
    answer: "Yes, our smart locks are fully functional offline. Biometric fingerprint recognition, keypad codes, and proximity Bluetooth unlocking operate locally on the hardware. Internet access is only required for remote features, such as real-time notifications, remote app unlocking, and syncing live Airbnb code expiries.",
  },
  {
    question: "Is it secure?",
    answer: "Absolutely. The lock features a double deadlock steel reinforcement frame and relies on AES-128 bank-grade digital encryption. Additionally, the anti-tamper security sensors trigger a loud 110dB siren and send emergency push notifications to your phone if unauthorized lockbox picking is detected.",
  },
  {
    question: "Does it work with Airbnb rentals?",
    answer: "Yes, it integrates directly with Airbnb booking platforms. Once synced, it automatically generates temporary PIN entry codes for reservation check-ins. These access codes activate exactly at check-in time (e.g., 3:00 PM) and expire automatically at check-out (e.g., 11:00 AM), ensuring complete keyless automation.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 md:py-20 relative overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs font-semibold max-w-sm leading-normal mx-auto md:mx-0">
            Find answers to common questions about installation, battery warranty, and Airbnb rental compatibility.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleIndex(i)}
                  className="w-full py-4.5 px-6 flex justify-between items-center text-left text-xs md:text-sm font-extrabold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <div className="w-6 h-6 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-[11px] md:text-xs leading-relaxed text-slate-600 font-medium border-t border-slate-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
