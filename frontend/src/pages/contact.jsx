"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/contactform";
import { ContactInfo } from "@/components/contact/contactinfo";
import { ContactFAQ } from "@/components/contact/contactfaq";
import { AIIllustrations } from "@/components/contact/AIIllustrations";
import { AnimatedGradientBackground } from "@/components/section/AnimatedGradientBackground";

export default function ContactPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <AnimatedGradientBackground />
      <AIIllustrations />

      <main className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your career with AI-powered insights? We're here to help you succeed.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side - Contact Form */}
            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>

            {/* Right Side - Contact Info & Location */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <ContactInfo />
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div variants={fadeInUp}>
            <ContactFAQ />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
