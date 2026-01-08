import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Award, BookOpen, MessageSquare, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function ProgressTracker() {
  const { user } = useUser();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
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
          const strengths = analysis.strengths || [];
          const weaknesses = analysis.weaknesses || [];

          // Calculate scores based on analysis data
          const totalSkills = strengths.length + weaknesses.length;
          const strengthPercentage = totalSkills > 0 ? Math.round((strengths.length / totalSkills) * 100) : 0;

          const progressItems = [
            {
              area: "Resume Strength",
              score: strengthPercentage,
              status: strengthPercentage >= 70 ? "Strong" : strengthPercentage >= 50 ? "Good" : "Needs Work",
              lastUpdated: new Date().toLocaleDateString(),
              icon: <FileText className="h-6 w-6 text-[#f8a4a8]" />,
              color: "#f8a4a8",
            },
            {
              area: "Quiz Performance",
              score: Math.floor(Math.random() * 30) + 60, // Mock quiz score
              status: "Moderate",
              lastUpdated: new Date().toLocaleDateString(),
              icon: <Award className="h-6 w-6 text-[#a78bfa]" />,
              color: "#a78bfa",
            },
            {
              area: "Technical Knowledge",
              score: Math.max(0, strengthPercentage - 10),
              status: strengthPercentage >= 60 ? "Strong" : "Needs Work",
              lastUpdated: new Date().toLocaleDateString(),
              icon: <BookOpen className="h-6 w-6 text-[#e9d5ff]" />,
              color: "#e9d5ff",
            },
            {
              area: "Communication Skills",
              score: Math.max(0, strengthPercentage - 5),
              status: strengthPercentage >= 65 ? "Strong" : "Moderate",
              lastUpdated: new Date().toLocaleDateString(),
              icon: <MessageSquare className="h-6 w-6 text-[#d1d5db]" />,
              color: "#d1d5db",
            },
          ];

          setProgressData(progressItems);
        }
      } catch (err) {
        console.error('Error fetching progress data:', err);
        setError('Failed to load progress data');
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [user]);

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading progress data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progressData) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            No progress data available. Upload a resume to start tracking your progress!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressData.map((item, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm mr-3">
                {item.icon}
              </div>
              <h4 className="font-semibold text-lg">{item.area}</h4>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-bold" style={{ color: item.color }}>
                {item.score}%
              </span>
              <span className="text-sm text-gray-500 ml-1">{item.status}</span>
            </div>
            <Progress
              value={item.score}
              className="h-2 mb-2"
              style={{ "--progress-color": item.color }}
            />
            <p className="text-xs text-gray-500">Last Updated: {item.lastUpdated}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
