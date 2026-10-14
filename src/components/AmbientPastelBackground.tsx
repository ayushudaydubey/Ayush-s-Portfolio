"use client";

import React from "react";
import { motion } from "framer-motion";

export function AmbientPastelBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Soft Pastel Pink / Rose Orb — Top Left / Mid Left */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[550px] h-[550px] sm:w-[800px] sm:h-[800px] rounded-full blur-[90px] sm:blur-[130px] opacity-75"
        style={{
          background:
            "radial-gradient(circle, #FBCFE8 20%, #FCE7F3 60%, transparent 75%)",
        }}
        animate={{
          x: [0, 45, -30, 25, 0],
          y: [0, 35, -25, 20, 0],
          scale: [1, 1.06, 0.96, 1.03, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft Pastel Blue / Sky Blue Orb — Top Right / Mid Right */}
      <motion.div
        className="absolute -top-[8%] -right-[8%] w-[550px] h-[550px] sm:w-[850px] sm:h-[850px] rounded-full blur-[90px] sm:blur-[130px] opacity-75"
        style={{
          background:
            "radial-gradient(circle, #BAE6FD 20%, #DBEAFE 60%, transparent 75%)",
        }}
        animate={{
          x: [0, -40, 35, -20, 0],
          y: [0, 40, -30, 15, 0],
          scale: [1, 1.05, 0.95, 1.04, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft Pastel Green / Mint Orb — Center / Floating Lower */}
      <motion.div
        className="absolute top-[40%] left-[25%] w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[90px] sm:blur-[130px] opacity-70"
        style={{
          background:
            "radial-gradient(circle, #D1FAE5 20%, #DCFCE7 60%, transparent 75%)",
        }}
        animate={{
          x: [0, 35, -40, 20, 0],
          y: [0, -30, 35, -15, 0],
          scale: [1, 1.08, 0.94, 1.02, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Soft Pastel Blue / Mint Orb — Bottom Right */}
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full blur-[90px] sm:blur-[130px] opacity-70"
        style={{
          background:
            "radial-gradient(circle, #BAE6FD 15%, #D1FAE5 55%, transparent 75%)",
        }}
        animate={{
          x: [0, -35, 30, -20, 0],
          y: [0, -35, 25, -15, 0],
          scale: [1, 1.05, 0.97, 1.03, 1],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Soft Rose / Pink Orb — Bottom Left */}
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[90px] sm:blur-[130px] opacity-70"
        style={{
          background:
            "radial-gradient(circle, #FCE7F3 20%, #FBCFE8 60%, transparent 75%)",
        }}
        animate={{
          x: [0, 30, -35, 15, 0],
          y: [0, -25, 30, -20, 0],
          scale: [1, 1.06, 0.95, 1.02, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fine texture wash to keep background bright & warm #FAFAF9 */}
      <div className="absolute inset-0 bg-[#FAFAF9]/30" />
    </div>
  );
}
