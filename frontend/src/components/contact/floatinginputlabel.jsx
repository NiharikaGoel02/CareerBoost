"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function FloatingLabelInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full px-4 py-4 bg-white/50 border border-gray-200 rounded-xl text-gray-800 placeholder-transparent focus:border-[#a78bfa] focus:ring-2 focus:ring-[#a78bfa]/20 focus:outline-none transition-all duration-300 peer backdrop-blur-sm"
        placeholder={label}
      />
      <motion.label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isFocused || value
            ? "-top-2 text-sm bg-white px-2 text-[#a78bfa] font-medium"
            : "top-4 text-gray-500"
        }`}
        animate={{
          y: isFocused || value ? -8 : 0,
          scale: isFocused || value ? 0.85 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  );
}
