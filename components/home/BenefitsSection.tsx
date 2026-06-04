"use client";

import { useState, useRef } from "react";
import {
  Fingerprint,
  Smartphone,
  Users,
  Lock,
  ShieldAlert,
  Battery,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BentoCardProps {
  icon: any;
  title: string;
  description: string;
  linkLabel: string;
  isHighlighted?: boolean;
}

function BentoCard({
  icon: Icon,
  title,
  description,
  linkLabel,
  isHighlighted = false,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl overflow-hidden p-6 cursor-default flex flex-col justify-between transition-all duration-300 ${
        isHighlighted
          ? "border-2 border-blue-500 bg-white shadow-lg shadow-blue-500/10"
          : "border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300"
      }`}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      {/* Spotlight hover effect */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.05), transparent 80%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Card Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
            isHighlighted
              ? "border-blue-200 bg-blue-50 text-blue-600"
              : "border-slate-200 bg-slate-50 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{title}</h3>

        {/* Description exactly matching mockup */}
        <p className="text-xs leading-relaxed text-slate-600 font-medium">{description}</p>
      </div>

      {/* Footer Specification Link */}
      <div className="relative z-10 mt-6 flex items-center gap-1 text-[11px] font-bold text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300 cursor-pointer w-fit">
        <span>{linkLabel}</span>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section id="benefits" className="relative w-full py-12 md:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header containing title and toggle controls */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 mb-8 text-center md:text-left">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Product Benefits
          </h2>
          {/* Mock controls */}
          <div className="flex gap-2">
            <button className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          <BentoCard
            icon={Fingerprint}
            title="Instant Fingerprint Unlock"
            description="Unlock in less than 0.3 seconds with military-grade capacitive biometrics."
            linkLabel="Specifications →"
          />

          <BentoCard
            icon={Smartphone}
            title="Mobile App Control"
            description="Manage access remotely, monitor logs, and unlock with a single toggle tap."
            linkLabel="Specifications →"
            isHighlighted={true} // Highlighted with active blue glowing borders!
          />

          <BentoCard
            icon={Users}
            title="Temporary Guest Access"
            description="Perfect for Airbnb hosts. Auto-sync arrival pins that expire on checkout."
            linkLabel="Specifications →"
          />

          <BentoCard
            icon={Lock}
            title="Auto Lock Technology"
            description="Never leave your door unlocked. Set precise auto-locking delay parameters."
            linkLabel="Specifications →"
          />

          <BentoCard
            icon={ShieldAlert}
            title="Anti-Tamper Protection"
            description="Advanced security alerts trigger 110dB sirens if physical lock picking occurs."
            linkLabel="Specifications →"
          />

          <BentoCard
            icon={Battery}
            title="Long Battery Life"
            description="Power lasts up to 18 months with emergency USB-C power overrides."
            linkLabel="Specifications →"
          />

        </div>
      </div>
    </section>
  );
}
