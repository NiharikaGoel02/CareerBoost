import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";
import { ImageUpload } from "./ImageUpload";

export function DashboardHeader() {
  const { user, updateUserImage } = useUser();
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
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading user data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const getResumeScore = () => {
    if (!analysisData) return "N/A";
    const analysis = analysisData.analysisStructured || analysisData.analysisJson || {};
    const strengths = analysis.strengths || [];
    const weaknesses = analysis.weaknesses || [];
    const totalSkills = strengths.length + weaknesses.length;
    if (totalSkills === 0) return "N/A";
    const score = Math.round((strengths.length / totalSkills) * 100);
    return `${score}/100`;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardContent className="p-0 flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <ImageUpload onImageUpdate={updateUserImage} />
          <div>
            <h2 className="text-3xl font-bold">Welcome, {user?.name || 'User'}!</h2>
            <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Calendar className="h-6 w-6 text-[#f8a4a8] mb-2" />
            <span className="text-sm text-gray-500">Last Analysis</span>
            <span className="font-medium">
              {analysisData ? new Date(analysisData.createdAt).toLocaleDateString() : 'Never'}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <TrendingUp className="h-6 w-6 text-[#a78bfa] mb-2" />
            <span className="text-sm text-gray-500">Resume Score</span>
            <span className="font-medium text-xl">{getResumeScore()}</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <User className="h-6 w-6 text-[#e9d5ff] mb-2" />
            <span className="text-sm text-gray-500">Joined On</span>
            <span className="font-medium">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
