import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/Header";
import { ResumeAnalysisSummary } from "@/components/dashboard/ResumeAnalysisSummary";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { SkillImprovementSection } from "@/components/dashboard/SkillImprovementSection";
import { QuizSection } from "@/components/dashboard/QuizSection";
import { ImprovementCard } from "@/components/dashboard/ImprovementCard";
import { UploadResumeSection } from "@/components/dashboard/UploadResumeSection";
import { AchievementsSection } from "@/components/dashboard/achievements";
import JobRecommendations from "@/components/dashboard/JobRecommendations";
import { AnimatedGradientBackground } from "@/components/section/AnimatedGradientBackground";

export default function DashboardPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <AnimatedGradientBackground />
      <main className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          <motion.section variants={sectionVariants} className="mb-16">
            <DashboardHeader />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <ResumeAnalysisSummary />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <ProgressTracker />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <JobRecommendations />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <SkillImprovementSection />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <QuizSection />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <ImprovementCard />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <UploadResumeSection />
          </motion.section>

          <motion.section variants={sectionVariants} className="mb-16">
            <AchievementsSection />
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
