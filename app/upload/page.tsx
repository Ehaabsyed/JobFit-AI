// /app/upload/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import JobRoleSearch from "@/components/jobRoleSearch";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      alert("Please upload resume and add job description");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);
      console.log("Submitting resume:", file.name);
      console.log("Submitting job description:", jobDescription);
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const parsed = JSON.parse(data.aiResponse);
      console.log("API Response:", parsed);
      localStorage.setItem("analysisResult", JSON.stringify(parsed));
      router.push("/dashboard");
    } catch (error) {
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HexagonBackground>
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#e11021] mb-4">
          Upload Your Resume
        </h1>

        <p className="text-gray-400 mb-8 max-w-lg">
          Upload your resume and paste the job description to get AI-powered
          insights.
        </p>

        <div className="w-full max-w-xl bg-[#111111] backdrop-blur-md border border-gray-300 rounded-xl p-6 shadow-lg">
          <label className="block mb-4 text-left text-gray-300 text-sm">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="w-full mb-6 text-gray-300 file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 file:text-sm 
                       file:bg-[#e11021] file:text-white hover:file:bg-red-700"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <JobRoleSearch
            value={jobDescription}
            onChange={(val) => setJobDescription(val)}
          />

          <textarea
            placeholder="Paste or edit job description..."
            className="w-full bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#e11021]"
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-medium transition-all duration-300 
                       hover:scale-105 
                       hover:shadow-[0_0_20px_rgba(225,16,33,0.6)] 
                       disabled:opacity-50"
            style={{ backgroundColor: "#e11021" }}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>
    </HexagonBackground>
  );
}
