"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function LiveInsightsPreview() {
  const skillData = [
    { name: "React", value: 85 },
    { name: "Node.js", value:75 },
    { name: "MongoDB", value: 80 },
    { name: "Express", value: 70 },
    { name: "TypeScript", value: 65 },
    { name: "Redux", value: 60 },
  ];

  const companyMatchData = [
    { name: "Tech Innovators", match: 92 },
    { name: "WebStack Solutions", match: 88 },
    { name: "DevForge", match: 85 },
    { name: "CodeCraft", match: 82 },
    { name: "ByteWave", match: 78 },
  ];

  const progressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 72 },
    { month: "Apr", score: 75 },
    { month: "May", score: 79 },
    { month: "Jun", score: 82 },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Resume Analysis Dashboard</h3>
          <div className="bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white px-4 py-1 rounded-full text-sm font-medium">
            Premium
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/** Score Cards */}
          {[
            {
              label: "Resume Score",
              value: 78,
              suffix: "/100",
              note: "Top 22% of applicants",
              delay: 0.2,
            },
            {
              label: "ATS Compatibility",
              value: 92,
              suffix: "%",
              note: "Excellent compatibility",
              delay: 0.3,
            },
            {
              label: "Job Match Index",
              value: 85,
              suffix: "%",
              note: "MERN Stack Developer",
              delay: 0.4,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
            >
              <h4 className="text-lg font-medium mb-2">{item.label}</h4>
              <div className="flex items-end">
                <span className="text-4xl font-bold bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
                  {item.value}
                </span>
                <span className="text-gray-500 ml-1">{item.suffix}</span>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500">{item.note}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Radar Chart - Skill Confidence */}
          <motion.div
            className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-lg font-medium mb-4">Skill Confidence</h4>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Skill Level",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 10 }} />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.5}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </motion.div>

          {/* Bar Chart - Company Match */}
          <motion.div
            className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-lg font-medium mb-4">Company Match Index</h4>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  match: {
                    label: "Match Percentage",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companyMatchData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="match" fill="url(#colorGradient)" radius={[0, 4, 4, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f8a4a8" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </motion.div>
        </div>

        {/* Line Chart - Score Progress */}
        <motion.div
          className="mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="text-lg font-medium mb-4">Resume Score Progress</h4>
          <div className="h-[200px]">
            <ChartContainer
              config={{
                score: {
                  label: "Resume Score",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="url(#lineGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#a78bfa", strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f8a4a8" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
