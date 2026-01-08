"use client";

import { motion } from "framer-motion";
import { Upload, FileSearch, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-[#f8a4a8]" />,
      title: "Upload Resume",
      description: "AI parses your resume into structured data for analysis",
    },
    {
      icon: <FileSearch className="h-10 w-10 text-[#a78bfa]" />,
      title: "Get Score + Insights",
      description: "Receive a detailed breakdown of your resume's strengths and areas for improvement",
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-[#e9d5ff]" />,
      title: "Take Quiz → Receive Recommendations",
      description: "Complete a personalized assessment to get tailored skill and career suggestions",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 overflow-x-auto pb-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex-1 min-w-[280px] bg-white/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-md mb-6">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
