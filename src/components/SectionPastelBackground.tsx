"use client";

import React from "react";
import { motion } from "framer-motion";

export type ColorVariant = "pink-left" | "blue-left" | "green-left";

interface SectionPastelBackgroundProps {
  variant?: ColorVariant;
}

export function SectionPastelBackground({
  variant = "pink-left",
}: SectionPastelBackgroundProps) {
  // Colorful background temporarily disabled as requested
  return null;

  // Variant 1: Pink on Left, Blue on Right, Green in Center/Lower
  if (variant === "pink-left") {
    return (
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Left: Soft Pastel Pink / Rose */}
        <motion.div
          className="absolute top-1/4 -left-20 sm:-left-24 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, #FBCFE8 20%, #FCE7F3 60%, transparent 75%)",
          }}
          animate={{
            x: [0, 30, -25, 20, 0],
            y: [0, 25, -20, 15, 0],
            scale: [1, 1.05, 0.96, 1.03, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right: Soft Pastel Blue / Sky Blue */}
        <motion.div
          className="absolute -top-16 -right-20 sm:-right-24 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, #BAE6FD 20%, #DBEAFE 60%, transparent 75%)",
          }}
          animate={{
            x: [0, -30, 25, -15, 0],
            y: [0, 30, -25, 20, 0],
            scale: [1, 1.06, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center / Lower: Soft Pastel Green / Mint */}
        <motion.div
          className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] sm:w-[580px] sm:h-[580px] rounded-full blur-[80px] sm:blur-[110px] opacity-65"
          style={{
            background:
              "radial-gradient(circle, #D1FAE5 20%, #DCFCE7 60%, transparent 75%)",
          }}
          animate={{
            x: [0, 25, -30, 15, 0],
            y: [0, -20, 25, -10, 0],
            scale: [1, 1.06, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[#FAFAF9]/30" />
      </div>
    );
  }

  // Variant 2: Blue on Left, Pink on Right, Green in Center/Upper
  if (variant === "blue-left") {
    return (
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Left: Soft Pastel Blue / Sky Blue */}
        <motion.div
          className="absolute top-1/4 -left-20 sm:-left-24 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, #BAE6FD 20%, #DBEAFE 60%, transparent 75%)",
          }}
          animate={{
            x: [0, 30, -25, 15, 0],
            y: [0, 25, -20, 15, 0],
            scale: [1, 1.05, 0.96, 1.02, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right: Soft Pastel Pink / Rose */}
        <motion.div
          className="absolute -top-16 -right-20 sm:-right-24 w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
          style={{
            background:
              "radial-gradient(circle, #FBCFE8 20%, #FCE7F3 60%, transparent 75%)",
          }}
          animate={{
            x: [0, -25, 30, -20, 0],
            y: [0, 30, -25, 15, 0],
            scale: [1, 1.06, 0.95, 1.03, 1],
          }}
          transition={{
            duration: 33,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center / Lower: Soft Pastel Green / Mint */}
        <motion.div
          className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] sm:w-[580px] sm:h-[580px] rounded-full blur-[80px] sm:blur-[110px] opacity-65"
          style={{
            background:
              "radial-gradient(circle, #D1FAE5 20%, #DCFCE7 60%, transparent 75%)",
          }}
          animate={{
            x: [0, -20, 25, -15, 0],
            y: [0, -25, 20, -10, 0],
            scale: [1, 1.05, 0.96, 1.02, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[#FAFAF9]/30" />
      </div>
    );
  }

  // Variant 3: Green on Left, Blue on Right, Pink in Center/Upper
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Left: Soft Pastel Green / Mint */}
      <motion.div
        className="absolute top-1/4 -left-20 sm:-left-24 w-[440px] h-[440px] sm:w-[640px] sm:h-[640px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
        style={{
          background:
            "radial-gradient(circle, #D1FAE5 20%, #DCFCE7 60%, transparent 75%)",
        }}
        animate={{
          x: [0, 25, -30, 20, 0],
          y: [0, 25, -20, 15, 0],
          scale: [1, 1.06, 0.95, 1.02, 1],
        }}
        transition={{
          duration: 31,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right: Soft Pastel Blue / Sky Blue */}
      <motion.div
        className="absolute -top-16 -right-20 sm:-right-24 w-[440px] h-[440px] sm:w-[630px] sm:h-[630px] rounded-full blur-[80px] sm:blur-[110px] opacity-75"
        style={{
          background:
            "radial-gradient(circle, #BAE6FD 20%, #DBEAFE 60%, transparent 75%)",
        }}
        animate={{
          x: [0, -30, 25, -15, 0],
          y: [0, 25, -30, 15, 0],
          scale: [1, 1.05, 0.96, 1.03, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center / Lower: Soft Pastel Pink / Rose */}
      <motion.div
        className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] sm:w-[580px] sm:h-[580px] rounded-full blur-[80px] sm:blur-[110px] opacity-65"
        style={{
          background:
            "radial-gradient(circle, #FBCFE8 20%, #FCE7F3 60%, transparent 75%)",
        }}
        animate={{
          x: [0, 25, -20, 15, 0],
          y: [0, -20, 25, -10, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[#FAFAF9]/30" />
    </div>
  );
}
