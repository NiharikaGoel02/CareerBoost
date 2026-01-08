"use client"
import { motion } from "framer-motion"

export function ResumeAnimation() {
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* BACKGROUND STATIC RESUME CARD */}
        <motion.div
          className="w-[280px] h-[380px] bg-white rounded-lg shadow-xl border border-gray-100 p-6 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#f8a4a8]/20 mb-4"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-3/4 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded-full mb-6"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-full bg-gray-200 rounded-full mb-2"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded-full"></div>
        </motion.div>

        {/* MOVING FRONT CARD - ANIMATED LEFT TO RIGHT */}
        <motion.div
          className="absolute w-[300px] h-[400px] bg-gradient-to-br from-[#f8a4a8] to-[#a78bfa] rounded-lg shadow-2xl flex items-center justify-center"
          initial={{ opacity: 0, x: -100, rotateY: -30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-100, 0, 0, 100],
            rotateY: [-30, 0, 0, 30],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <div className="text-white text-4xl font-bold">Resume</div>
        </motion.div>

        {/* ANALYSIS CARD - SLIDES IN FROM RIGHT */}
        <motion.div
          className="absolute w-[320px] h-[420px] bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 p-6"
          initial={{ opacity: 0, x: 100, rotateY: 30 }}
          animate={{
            opacity: [0, 0, 1, 1],
            x: [100, 100, 0, 0],
            rotateY: [30, 30, 0, 0],
            scale: [0.8, 0.8, 1, 1],
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
              Resume Analysis
            </div>
            <div className="w-10 h-10 rounded-full bg-[#a78bfa]/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#a78bfa]"></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Overall Score</div>
            <div className="flex items-center">
              <div className="text-3xl font-bold mr-2">78</div>
              <div className="text-sm text-gray-500">/100</div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Technical Skills", value: 85, delay: 1.5 },
              { label: "Experience", value: 72, delay: 1.7 },
              { label: "Education", value: 90, delay: 1.9 },
              { label: "Presentation", value: 65, delay: 2.1 },
            ].map(({ label, value, delay }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span className="font-medium">{value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
