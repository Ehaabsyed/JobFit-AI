"use client";
import Aurora from "@/components/Aurora";
import SkillBtn from "@/components/skill";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AtsBreakdown {
  formatting: number;
  keywords: number;
  skills: number;
  experience: number;
}

interface AnalysisResult {
  match_percentage: number;
  skill_gaps: string[];
  improvements: string[];
  ats_score: number;
  ats_breakdown: AtsBreakdown;
  ai_suggestions: string[];
}

const Page = () => {
  const [percentage, setPercentage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [Width, setWidth] = useState(0);

  // ✅ Load from localStorage and set result
  useEffect(() => {
    const storedResult = localStorage.getItem("analysisResult");
    if (storedResult) {
      const parsed: AnalysisResult = JSON.parse(storedResult);
      setResult(parsed);
    }
  }, []);

  // ✅ Animate circular progress — runs when result is ready
  useEffect(() => {
    if (!result) return;
    const target = result.match_percentage;
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setPercentage(start);
    }, 20);
    return () => clearInterval(interval);
  }, [result]); // ✅ depends on result, not empty

  // ✅ Animate ATS bar — runs when result is ready
  useEffect(() => {
    if (!result) return;
    setTimeout(() => {
      setWidth(result.ats_score); // ats_score is already 0-100
    }, 500);
  }, [result]); // ✅ depends on result, not empty

  if (!result) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <p>No analysis data found. Please upload a resume first.</p>
      </div>
    );
  }

  const { formatting, keywords, skills, experience } = result.ats_breakdown;
  const avgAts = ((formatting + keywords + skills + experience) / 4).toFixed(1);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#2b0000", "#8b0000", "#ff3b3b"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row  gap-4 text-white p-5 h-screen">
        <div className="md:w-1/3 w-full flex flex-col gap-4">

          {/* Match Score */}
          <div className="flex-1 border-4 border-[#8B0000] flex flex-col items-center justify-start rounded-xl p-3">
            <h3 className="md:text-2xl text-xl font-semibold text-red-400">Match Score</h3>
            <div className="w-30 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mt-1 mb-2"></div>
            <div className="md:w-45 w-33 h-33 md:h-45 mt-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  path: {
                    stroke: "#ff3b3b",
                    strokeLinecap: "round",
                    transition: "stroke-dashoffset 0.8s ease-in-out",
                  },
                  trail: { stroke: "#2b0000" },
                  text: { fill: "#ff6a6a", fontSize: "18px" },
                }}
              />
            </div>
          </div>

          {/* Skill Gaps */}
          <div className="flex-1 border-4 border-[#8B0000] flex flex-col items-center justify-start p-3 rounded-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-red-400 text-center">Skill Gaps</h3>
            <div className="w-25 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mt-1 mb-2"></div>
            <div className="flex flex-wrap mt-4 gap-3 w-full justify-center">
              {/* ✅ Dynamic skill gaps */}
              {result.skill_gaps.map((gap, i) => (
                <SkillBtn key={i} label={gap} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row flex-1 gap-4">

            {/* Improvements */}
            <div className="w-full md:w-1/2 h-74.5 border-4 border-[#8B0000] rounded-xl flex flex-col items-center justify-start py-3">
              <h3 className="text-xl md:text-2xl font-semibold text-red-400">Improvements</h3>
              <div className="w-35 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mt-1 mb-2"></div>
              <ul className="list-disc list-inside mt-2 text-left px-4 text-red-200 text-md space-y-1">
                {/* ✅ Dynamic improvements */}
                {result.improvements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* ATS Score */}
            <div className="w-full md:w-1/2 h-74.5 border-4 px-10 border-[#8B0000] rounded-xl flex flex-col py-3 items-center justify-start">
              <h3 className="text-xl md:text-2xl font-semibold text-red-400">ATS Score</h3>
              <div className="w-25 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mt-1 mb-2"></div>
              <div className="flex w-full items-center justify-between mt-4">
                {/* ✅ Dynamic breakdown */}
                <p className="text-[18px] mt-1 text-red-300 px-2">Formatting: {formatting}/10</p>
                <p className="text-[18px] mt-1 text-red-300 px-2">Keywords: {keywords}/10</p>
              </div>
              <div className="flex w-full items-center justify-between mt-4">
                <p className="text-[18px] mt-1 text-red-300 px-2">Experience: {experience}/10</p>
                <p className="text-[18px] mt-1 text-red-300 px-2">Skills: {skills}/10</p>
              </div>
              <div className="w-full mt-4 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mb-2"></div>
              {/* ✅ Dynamic average score */}
              <h3 className="text-2xl mt-1 font-semibold text-red-300">{avgAts}/10</h3>
              <div className="bar w-full h-6 bg-[#2b0000] mt-2 rounded-xl">
                <div
                  className="fill bg-red-500 h-full rounded-l-xl transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                  style={{ width: `${Width}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="flex-1 mb-5 md:mb-0 border-4 border-[#8B0000] rounded-xl flex flex-col items-start justify-start py-3 px-4">
            <h3 className="text-xl md:text-2xl font-semibold text-red-400">AI Suggestions</h3>
            <div className="w-20 h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] mt-1 mb-3"></div>
            <ul className="list-disc list-inside mt-2 text-left text-red-200 text-base space-y-2 leading-relaxed">
              {result.ai_suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          </div>
          <Link href="/upload">
          <div  className="button block hover:shadow-[0_0_20px_rgba(225,16,33,0.6)] 
                       disabled:opacity-50 md:hidden w-full py-3 bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer mb-1 rounded-lg text-white font-medium transition-all duration-300">
            Analyse next
          </div>
          </Link>
          <p className="text-red-200 block md:hidden mb-4 text-center text-sm">© 2026 JobFit AI. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Page;