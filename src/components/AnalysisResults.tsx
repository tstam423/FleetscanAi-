"use client";

import type { AnalysisResult, DamageItem } from "@/lib/analyzeImage";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewScan: () => void;
}

const severityColors: Record<DamageItem["severity"], string> = {
  low: "bg-blue-100 text-blue-800",
  moderate: "bg-yellow-100 text-yellow-800",
  severe: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const conditionConfig: Record<
  AnalysisResult["overallCondition"],
  { label: string; color: string; bg: string }
> = {
  pass: { label: "PASS", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  needs_attention: {
    label: "NEEDS ATTENTION",
    color: "text-yellow-700",
    bg: "bg-yellow-50 border-yellow-200",
  },
  fail: { label: "FAIL", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

export default function AnalysisResults({
  result,
  onNewScan,
}: AnalysisResultsProps) {
  const condition = conditionConfig[result.overallCondition];
  const dotIssues = result.damages.filter((d) => d.dotRelevant);

  return (
    <div className="space-y-6">
      {/* Overall status */}
      <div
        className={`p-6 rounded-xl border-2 ${condition.bg} text-center`}
      >
        <div className={`text-3xl font-bold ${condition.color} mb-2`}>
          {condition.label}
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          {result.summary}
        </p>
        <div className="flex justify-center gap-6 mt-4 text-xs text-[var(--color-text-muted)]">
          <span>
            ID: <span className="font-mono">{result.inspectionId.slice(0, 8)}</span>
          </span>
          <span>{new Date(result.timestamp).toLocaleString()}</span>
          <span>
            {result.damages.length} issue{result.damages.length !== 1 && "s"}{" "}
            found
          </span>
        </div>
      </div>

      {/* DOT alert */}
      {dotIssues.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-1">
            DOT Compliance Issues ({dotIssues.length})
          </h3>
          <p className="text-sm text-red-700">
            The following items may affect DOT inspection compliance and should
            be addressed before the trailer returns to service.
          </p>
        </div>
      )}

      {/* Damage list */}
      {result.damages.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Detected Issues</h3>
          <div className="space-y-3">
            {result.damages.map((damage) => (
              <DamageCard key={damage.id} damage={damage} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm bg-white p-3 rounded-lg border border-gray-100"
              >
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  {i + 1}.
                </span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onNewScan}
          className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-[var(--color-text-muted)] hover:border-gray-400 transition-colors"
        >
          New Scan
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 px-4 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Print Report
        </button>
      </div>
    </div>
  );
}

function DamageCard({ damage }: { damage: DamageItem }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${severityColors[damage.severity]}`}
          >
            {damage.severity.toUpperCase()}
          </span>
          <span className="text-sm font-semibold">{damage.category}</span>
          {damage.dotRelevant && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
              DOT
            </span>
          )}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] shrink-0">
          {Math.round(damage.confidence * 100)}% confidence
        </span>
      </div>
      <p className="text-sm text-[var(--color-text)]">{damage.description}</p>
      <p className="text-xs text-[var(--color-text-muted)] mt-1">
        Location: {damage.location}
      </p>
    </div>
  );
}
