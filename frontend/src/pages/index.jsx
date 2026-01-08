"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileSearch, Brain, Building } from "lucide-react";
import { HowItWorks } from "@/components/section/HowItWorks";
import { FeatureCard } from "@/components/section/FeatureCard";
import { LiveInsightsPreview } from "@/components/section/LiveInsightsPreview";
import { Testimonials } from "@/components/section/Testimonials";
import { PricingSection } from "@/components/section/PricingSection";
import { FaqAccordion } from "@/components/section/FaqAccordion";
import { AnimatedGradientBackground } from "@/components/section/AnimatedGradientBackground";
import { ResumeAnimation } from "@/components/section/ResumeAnimation";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <AnimatedGradientBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center"
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
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            <span className="text-sm font-medium text-gray-800">AI-POWERED RESUME BUILDER</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Your Career, <br />
            <span className="bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
              Decoded by AI
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Upload your resume and unlock a personalized growth plan tailored for MERN stack roles and beyond.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-medium bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:shadow-purple-200/30 border border-white/20 backdrop-blur-sm"
              onClick={() => navigate('/analysis')}
            >
              Start My Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-16 relative">
            <ResumeAnimation />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">How ResumeIQ Works</h2>
          <HowItWorks />
        </motion.div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Feature Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileSearch className="h-8 w-8" />}
              title="Resume Scoring AI"
              description="Get an objective score and detailed breakdown of your resume's strengths and weaknesses."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Personalized Career Quiz"
              description="Discover your unique skill profile through our adaptive assessment."
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8" />}
              title="Smart Skill Recommendations"
              description="Receive tailored suggestions to enhance your professional toolkit."
            />
            <FeatureCard
              icon={<Building className="h-8 w-8" />}
              title="Role-Based Job Matches"
              description="Find companies that align with your experience and career aspirations."
            />
          </div>
        </motion.div>
      </section>

      {/* Live Insights Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-6">Live Insights Preview</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16">
            See how ResumeIQ transforms your resume data into actionable career intelligence
          </p>
          <LiveInsightsPreview />
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <Testimonials />
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-6">Choose Your Plan</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16">
            Select the perfect plan for your career advancement needs
          </p>
          <PricingSection />
        </motion.div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Need Help?</h2>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </motion.div>
      </section>

    </div>
  );
}
