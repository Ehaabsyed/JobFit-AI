// /app/page.jsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-5xl font-bold mb-4">
        AI Resume Analyzer 🚀
      </h1>

      <p className="text-gray-400 max-w-xl mb-8">
        Analyze your resume against any job description using AI.
        Get match scores, ATS insights, and improvement tips instantly.
      </p>

      <Link href="/upload">
        <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg transition">
          Get Started
        </button>
      </Link>

    </div>
  );
}