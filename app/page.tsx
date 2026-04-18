import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import Link from "next/link";
  

export default function Home() {
  return (
  <HexagonBackground>
  <div className="relative flex pointer-events-none flex-col items-center justify-center h-screen text-center px-6">
    <h1 className="text-4xl space-x-2 md:text-5xl font-bold mb-4 text-[#e11021]">
      JobFit AI
    </h1>
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white/90">
      (AI Resume Analyzer)
    </h1>

  <p className="text-gray-300 text-lg mb-8 max-w-xl">
    Analyze your resume against job descriptions and get instant insights,
    ATS score, and improvement suggestions.
  </p>

  <Link
    href="/upload"
    className="pointer-events-auto px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ease-in-out 
               hover:scale-105 
               hover:shadow-[0_0_20px_rgba(225,16,33,0.6)]"
    style={{ backgroundColor: "#e11021" }}
  >
    Get Started
  </Link>


</div>
</HexagonBackground>
  );
}