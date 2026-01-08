"use client";
import { motion } from "framer-motion";

export function AnimatedGradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100"></div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#f8a4a8]/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-[40%] right-[15%] w-80 h-80 rounded-full bg-[#a78bfa]/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-[#f8a4a8]/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-[30%] left-[5%] w-48 h-48 rounded-full bg-[#e9d5ff]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
