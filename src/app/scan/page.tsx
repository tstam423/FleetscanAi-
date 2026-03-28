"use client";

import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResult } from "@/lib/analyzeImage";

export default function ScanPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCapture(imageData: string) {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  function handleNewScan() {
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inspection Scan</h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          {result
            ? "Review AI analysis results below"
            : "Capture or upload a photo of the trailer to begin AI analysis"}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {result ? (
        <AnalysisResults result={result} onNewScan={handleNewScan} />
      ) : (
        <CameraCapture onCapture={handleCapture} disabled={analyzing} />
      )}

      {analyzing && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[var(--color-text-muted)]">
              AI is analyzing the trailer image...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
