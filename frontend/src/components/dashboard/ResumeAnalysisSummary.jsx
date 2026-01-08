"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, BarChart2, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function ResumeAnalysisSummary() {
  const { user } = useUser();
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await analysisService.getUserAnalyses();
        if (response.success && response.analyses.length > 0) {
          setLatestAnalysis(response.analyses[0]); // Most recent analysis
        }
      } catch (err) {
        console.error('Error fetching analysis:', err);
        setError('Failed to load analysis data');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [user]);

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Resume Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading analysis data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Resume Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!latestAnalysis) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Resume Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            No resume analysis found. Upload a resume to get started!
          </div>
        </CardContent>
      </Card>
    );
  }

  const analysis = latestAnalysis.analysisStructured || latestAnalysis.analysisJson || {};
  const strengths = analysis.strengths || [];
  const weaknesses = analysis.weaknesses || [];

  // Calculate score breakdown based on strengths vs weaknesses
  const totalSkills = strengths.length + weaknesses.length;
  const strengthPercentage = totalSkills > 0 ? Math.round((strengths.length / totalSkills) * 100) : 0;
  
  const scoreBreakdown = [
    { label: "Technical Skills", score: strengthPercentage, color: "#f8a4a8" },
    { label: "Soft Skills", score: Math.max(0, strengthPercentage - 10), color: "#a78bfa" },
    { label: "Experience", score: Math.max(0, strengthPercentage - 5), color: "#e9d5ff" },
    { label: "Formatting", score: Math.max(0, strengthPercentage - 15), color: "#d1d5db" },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Resume Analysis Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Technical Strengths
          </h3>
          {strengths.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No strengths identified yet</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" /> Weak Areas
          </h3>
          {weaknesses.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No weaknesses identified yet</p>
          )}
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 text-gray-700 mr-2" /> Resume Score Breakdown
          </h3>
          <div className="space-y-4">
            {scoreBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{item.label}</span>
                  <span>{item.score}%</span>
                </div>
                <Progress
                  value={item.score}
                  className="h-2"
                  style={{ "--progress-color": item.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
