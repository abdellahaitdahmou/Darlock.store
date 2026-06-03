"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  name: string;
  primaryImage: string;
  images?: string[];
}

export default function ProductGallery({ name, primaryImage, images }: ProductGalleryProps) {
  const allImages = [primaryImage, ...(images || [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden flex items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-slate-50/50 flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full blur-[80px] bg-blue-500/10 pointer-events-none" />
        </div>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={allImages[currentIndex]}
            alt={`${name} - Image ${currentIndex + 1}`}
            className="relative w-full h-[350px] object-contain drop-shadow-2xl"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden bg-white p-2 transition-all ${
                currentIndex === idx
                  ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
