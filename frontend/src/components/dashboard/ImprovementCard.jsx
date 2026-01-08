import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Compass, TrendingUp, Target, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function ImprovementCard() {
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
          <CardTitle className="text-2xl font-bold">Your Growth Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading roadmap data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSkillLevel = () => {
    if (!analysisData) return "Beginner";
    const analysis = analysisData.analysisStructured || analysisData.analysisJson || {};
    const strengths = analysis.strengths || [];
    const weaknesses = analysis.weaknesses || [];
    const totalSkills = strengths.length + weaknesses.length;
    if (totalSkills === 0) return "Beginner";
    const strengthRatio = strengths.length / totalSkills;
    if (strengthRatio >= 0.7) return "Expert";
    if (strengthRatio >= 0.5) return "Intermediate";
    return "Beginner";
  };

  const getLearningPath = () => {
    if (!analysisData) return "General Development";
    const analysis = analysisData.analysisStructured || analysisData.analysisJson || {};
    const weaknesses = analysis.weaknesses || [];
    if (weaknesses.length === 0) return "Advanced Development";
    return weaknesses[0] || "General Development";
  };

  const getNextGoal = () => {
    if (!analysisData) return "Complete your first analysis";
    const analysis = analysisData.analysisStructured || analysisData.analysisJson || {};
    const skillsToImprove = analysis.skillsToImprove || [];
    if (skillsToImprove.length === 0) return "Take a quiz to assess skills";
    return skillsToImprove[0];
  };

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Your Growth Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Level */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Rocket className="h-12 w-12 text-[#f8a4a8] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Current Skill Level</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
            {getSkillLevel()}
          </p>
          <p className="text-gray-600 mt-2">
            {getSkillLevel() === "Expert" ? "You're an expert in your field!" :
             getSkillLevel() === "Intermediate" ? "You're on your way to becoming an expert!" :
             "Keep learning and growing!"}
          </p>
        </div>

        {/* Suggested Learning Path */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Compass className="h-12 w-12 text-[#a78bfa] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Suggested Learning Path</h3>
          <p className="text-lg font-medium text-gray-700">{getLearningPath()}</p>
          <p className="text-gray-600 mt-2">Focus on improving your identified areas.</p>
          <Button variant="link" className="mt-4 text-[#a78bfa] hover:text-[#f8a4a8]">
            View Full Path
          </Button>
        </div>

        {/* Last Week's Progress */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <TrendingUp className="h-12 w-12 text-[#e9d5ff] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Last Analysis</h3>
          <p className="text-lg font-medium text-gray-700">
            {analysisData ? new Date(analysisData.createdAt).toLocaleDateString() : 'No analysis yet'}
          </p>
          <p className="text-gray-600 mt-2">
            {analysisData ? 'Keep up the great work!' : 'Upload your first resume to get started!'}
          </p>
        </div>

        {/* Next Goals */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Target className="h-12 w-12 text-[#d1d5db] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Next Goals</h3>
          <p className="text-lg font-medium text-gray-700">{getNextGoal()}</p>
          <p className="text-gray-600 mt-2">Focus on continuous improvement.</p>
          <Button className="mt-4 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90">
            Set New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
