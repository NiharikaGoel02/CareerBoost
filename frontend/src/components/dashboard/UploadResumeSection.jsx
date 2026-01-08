"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Brain, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function UploadResumeSection() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

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
          setLatestAnalysis(response.analyses[0]);
        }
      } catch (err) {
        console.error('Error fetching analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [user]);

  const handleAnalyzeAgain = () => {
    navigate('/analysis');
  };

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Upload / Update Resume</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading resume data...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Upload / Update Resume</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          {latestAnalysis ? (
            <>
              <p className="text-lg font-medium mb-2">Resume Analysis</p>
              <p className="text-sm text-gray-600">
                Last analyzed: {new Date(latestAnalysis.createdAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium mb-2">No Resume Analyzed</p>
              <p className="text-sm text-gray-600">Upload your first resume to get started</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Button 
            className="w-full rounded-full py-6 bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-purple-200/30"
            onClick={() => navigate('/analysis')}
          >
            <Upload className="mr-2 h-5 w-5" /> Upload New Resume
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full py-6 border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800"
            onClick={handleAnalyzeAgain}
          >
            <Brain className="mr-2 h-5 w-5" /> Analyze Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
