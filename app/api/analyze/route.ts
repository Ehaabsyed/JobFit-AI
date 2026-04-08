import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { resumeAnalysisPrompt } from "@/app/data/prompt";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description required" },
        { status: 400 },
      );
    }

    // ✅ Convert file → buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Extract text
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const data = await pdfParse(buffer);

    const resumeText = data.text;

    // console.log("Extracted Resume:", resumeText);

    // ✅ Trim text
    const trimmedResume = resumeText.slice(0, 4000);

    // ✅ Gemini call
    let aiText = "AI unavailable";
const prompt = resumeAnalysisPrompt(trimmedResume, jobDescription);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      aiText =
        response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    } catch (err) {
      console.error("Gemini Error:", err);

      // ✅ fallback model
      try {
        const fallback = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: prompt,
        });

        aiText =
          fallback.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      } catch (err2) {
        console.error("Fallback also failed:", err2);
      }
    }
    console.log("AI Response:", aiText);

    return NextResponse.json({
      success: true,
      // resumeText: trimmedResume,
      // jobDescription,
      aiResponse: aiText,
    });
  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process resume",
      },
      { status: 500 },
    );
  }
}
