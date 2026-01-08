"use client";

import { motion } from "framer-motion";

export function AIIllustrations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating AI Elements with sunset colors */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-[#f8a4a8]/20 to-[#a78bfa]/20 backdrop-blur-sm border border-[#f8a4a8]/30"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] opacity-60"></div>
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 w-12 h-12 rounded-lg bg-gradient-to-r from-[#a78bfa]/20 to-[#e9d5ff]/20 backdrop-blur-sm border border-[#a78bfa]/30"
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="absolute inset-1 rounded-lg bg-gradient-to-r from-[#a78bfa] to-[#e9d5ff] opacity-60"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-[#e9d5ff]/20 to-[#f8a4a8]/20 backdrop-blur-sm border border-[#e9d5ff]/30"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="absolute inset-3 rounded-full bg-gradient-to-r from-[#e9d5ff] to-[#f8a4a8] opacity-60"></div>
      </motion.div>

      {/* Neural Network Lines with sunset gradients */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="sunsetLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8a4a8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#e9d5ff" />
          </linearGradient>
        </defs>
        <motion.path
          d="M100,200 Q300,100 500,300 T900,200"
          stroke="url(#sunsetLineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M200,400 Q400,300 600,500 T1000,400"
          stroke="url(#sunsetLineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>

      {/* Floating Code Snippets with sunset theme */}
      <motion.div
        className="absolute top-1/3 right-10 bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-[#f8a4a8]/30 font-mono text-xs text-[#a78bfa]"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div>{'{ "ai": "analyzing" }'}</div>
        <div>{'{ "status": "processing" }'}</div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-10 bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-[#a78bfa]/30 font-mono text-xs text-[#f8a4a8]"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div>{"resume.analyze()"}</div>
        <div>{"score: 85/100"}</div>
      </motion.div>
    </div>
  );
}
