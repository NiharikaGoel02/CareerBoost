"use client";

import { motion } from "framer-motion";

export function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center shadow-md mb-6 group-hover:bg-gradient-to-r group-hover:from-[#f8a4a8] group-hover:to-[#a78bfa] transition-all">
        <div className="text-gray-700 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
