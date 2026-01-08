"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function SkillImprovementSection() {
  const { user } = useUser();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await analysisService.getUserAnalyses();
        if (response.success && response.analyses.length > 0) {
          const latestAnalysis = response.analyses[0];
          const analysis = latestAnalysis.analysisStructured || latestAnalysis.analysisJson || {};
          const courseRecommendations = analysis.courseRecommendations || [];
          const skillsToImprove = analysis.skillsToImprove || [];

          // Create resources from course recommendations and skills to improve
          const newResources = courseRecommendations.map((course, index) => ({
            id: index + 1,
            title: course,
            type: "Course",
            link: "#",
            status: "pending",
            weakSkill: skillsToImprove[index] || "Skill Improvement",
          }));

          // Add some default resources if no course recommendations
          if (newResources.length === 0 && skillsToImprove.length > 0) {
            skillsToImprove.forEach((skill, index) => {
              newResources.push({
                id: index + 1,
                title: `Improve ${skill}`,
                type: "Learning Path",
                link: "#",
                status: "pending",
                weakSkill: skill,
              });
            });
          }

          setResources(newResources);
        }
      } catch (err) {
        console.error('Error fetching analysis data:', err);
        setError('Failed to load improvement recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [user]);

  const markAsDone = (id) => {
    setResources((prevResources) =>
      prevResources.map((res) =>
        res.id === id ? { ...res, status: "done" } : res
      )
    );
  };

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Skill Improvement</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading recommendations...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Skill Improvement</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (resources.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Skill Improvement</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            No improvement recommendations found. Upload a resume to get personalized recommendations!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Skill Improvement</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold mb-4">Recommended Resources</h3>
        <div className="space-y-4">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md ${
                resource.status === "done" ? "opacity-70 line-through" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h4 className="font-medium text-lg">{resource.title}</h4>
                <p className="text-sm text-gray-600">
                  {resource.type} - Focus: {resource.weakSkill}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                  asChild
                >
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                {resource.status === "pending" ? (
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90"
                    onClick={() => markAsDone(resource.id)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> Mark as Done
                  </Button>
                ) : (
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" /> Completed
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
