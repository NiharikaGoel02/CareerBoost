import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Flame, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function AchievementsSection() {
  const { user } = useUser();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setAnalysisData(response.analyses[0]);
        }
      } catch (err) {
        console.error('Error fetching analysis data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [user]);

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Achievements & Badges</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading achievements...
          </div>
        </CardContent>
      </Card>
    );
  }

  const getResumeScore = () => {
    if (!analysisData) return 0;
    const analysis = analysisData.analysisStructured || analysisData.analysisJson || {};
    const strengths = analysis.strengths || [];
    const weaknesses = analysis.weaknesses || [];
    const totalSkills = strengths.length + weaknesses.length;
    if (totalSkills === 0) return 0;
    return Math.round((strengths.length / totalSkills) * 100);
  };

  const achievements = [
    {
      name: "First Analysis",
      description: "Completed your first resume analysis.",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      unlocked: !!analysisData,
    },
    {
      name: "Resume Pro",
      description: "Achieved a resume score of 80+.",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      unlocked: getResumeScore() >= 80,
    },
    {
      name: "Skill Builder",
      description: "Identified and started working on improvement areas.",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      unlocked: analysisData && (analysisData.analysisStructured?.skillsToImprove?.length > 0 || 
                                analysisData.analysisJson?.skillsToImprove?.length > 0),
    },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md flex flex-col items-center text-center ${
              !achievement.unlocked ? "opacity-50 grayscale" : ""
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-sm mb-4">
              {achievement.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{achievement.name}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
            {!achievement.unlocked && (
              <span className="mt-2 text-xs text-gray-500">Locked</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
