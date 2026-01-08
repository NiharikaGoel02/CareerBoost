"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Brain, RefreshCw, BarChart2, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { analysisService } from "@/services/analysisService";

export function QuizSection() {
  const { user } = useUser();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
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
          const weaknesses = analysis.weaknesses || [];

          // Generate mock quiz performance data based on weaknesses
          const quizPerformanceData = weaknesses.slice(0, 5).map((weakness, index) => ({
            topic: weakness.split(' ')[0], // Use first word as topic
            score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
          }));

          // Generate mock progress over time
          const quizProgressOverTime = [
            { date: "Jan", score: 55 },
            { date: "Feb", score: 60 },
            { date: "Mar", score: 65 },
            { date: "Apr", score: 70 },
            { date: "May", score: 75 },
            { date: "Jun", score: 78 },
          ];

          setQuizData({
            performanceData: quizPerformanceData,
            progressData: quizProgressOverTime,
            lastQuiz: {
              title: weaknesses.length > 0 ? `${weaknesses[0]} Quiz` : "Skills Assessment Quiz",
              score: Math.floor(Math.random() * 30) + 70,
              date: new Date().toLocaleDateString(),
            }
          });
        }
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to load quiz data');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [user]);

  if (loading) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Quiz Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading quiz data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Quiz Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quizData) {
    return (
      <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-2xl font-bold">Quiz Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-center py-8 text-gray-600">
            No quiz data available. Take a quiz to see your performance!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Quiz Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="h-5 w-5 text-[#f8a4a8] mr-2" /> Last Quiz Taken
          </h3>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md mb-4">
            <p className="text-lg font-medium">{quizData.lastQuiz.title}</p>
            <p className="text-gray-600">
              Score: <span className="font-bold text-[#a78bfa]">{quizData.lastQuiz.score}%</span>
            </p>
            <p className="text-sm text-gray-500">Taken on: {quizData.lastQuiz.date}</p>
          </div>
          <Button className="rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90">
            <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
          </Button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 text-[#a78bfa] mr-2" /> Performance Graph (Over Time)
          </h3>
          <div className="h-[250px] bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <ChartContainer
              config={{
                score: {
                  label: "Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quizData.progressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{
                      fill: "hsl(var(--chart-1))",
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
