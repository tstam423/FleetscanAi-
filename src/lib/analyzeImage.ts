export interface DamageItem {
  id: string;
  category: string;
  description: string;
  severity: "low" | "moderate" | "severe" | "critical";
  location: string;
  dotRelevant: boolean;
  confidence: number;
}

export interface AnalysisResult {
  inspectionId: string;
  timestamp: string;
  overallCondition: "pass" | "needs_attention" | "fail";
  damages: DamageItem[];
  summary: string;
  recommendations: string[];
}

/**
 * Analyze a trailer image for DOT compliance issues and damage.
 *
 * Currently uses a simulated AI response for development.
 * Replace with actual AI vision API call (Claude, GPT-4V, or custom model)
 * when API keys are configured.
 */
export async function analyzeTrailerImage(
  imageBase64: string
): Promise<AnalysisResult> {
  const apiKey = process.env.AI_MODEL_API_KEY;

  if (apiKey) {
    return analyzeWithAI(imageBase64, apiKey);
  }

  // Simulated analysis for development/demo
  return simulatedAnalysis();
}

async function analyzeWithAI(
  imageBase64: string,
  apiKey: string
): Promise<AnalysisResult> {
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: base64Data,
              },
            },
            {
              type: "text",
              text: `You are a DOT trailer inspection AI assistant. Analyze this trailer image for:
1. Visible structural damage (dents, cracks, holes, rust)
2. Tire condition (tread depth, sidewall damage, inflation)
3. Lighting and reflector issues (broken lights, missing reflectors)
4. Brake system visible issues
5. Coupling/kingpin condition
6. Floor/deck condition
7. Door and seal condition
8. Any other DOT compliance concerns

Respond in this exact JSON format:
{
  "overallCondition": "pass" | "needs_attention" | "fail",
  "damages": [
    {
      "category": "string (e.g. Structural, Tires, Lighting, Brakes, Coupling, Floor, Doors, Other)",
      "description": "string",
      "severity": "low" | "moderate" | "severe" | "critical",
      "location": "string (e.g. Left side panel, Rear door, Right tire #2)",
      "dotRelevant": true/false,
      "confidence": 0.0-1.0
    }
  ],
  "summary": "string (2-3 sentence summary)",
  "recommendations": ["string array of recommended actions"]
}

If no damage is visible, return an empty damages array with overallCondition "pass".
Only return the JSON, no other text.`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text;
  if (!text) {
    throw new Error("No response from AI model");
  }

  const parsed = JSON.parse(text);

  return {
    inspectionId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    overallCondition: parsed.overallCondition,
    damages: parsed.damages.map(
      (d: Omit<DamageItem, "id">, i: number) => ({
        ...d,
        id: `dmg-${i + 1}`,
      })
    ),
    summary: parsed.summary,
    recommendations: parsed.recommendations,
  };
}

function simulatedAnalysis(): AnalysisResult {
  const damages: DamageItem[] = [
    {
      id: "dmg-1",
      category: "Structural",
      description:
        "Visible dent on lower side panel, approximately 8 inches in diameter. No penetration detected.",
      severity: "moderate",
      location: "Left side panel, rear quarter",
      dotRelevant: false,
      confidence: 0.87,
    },
    {
      id: "dmg-2",
      category: "Lighting",
      description:
        "Rear left brake light lens is cracked. Bulb appears functional but lens integrity is compromised.",
      severity: "severe",
      location: "Rear left brake light",
      dotRelevant: true,
      confidence: 0.93,
    },
    {
      id: "dmg-3",
      category: "Tires",
      description:
        "Right rear outer tire showing uneven tread wear pattern. Estimated remaining tread: 4/32 inches.",
      severity: "moderate",
      location: "Right rear axle, outer tire",
      dotRelevant: true,
      confidence: 0.78,
    },
    {
      id: "dmg-4",
      category: "Reflectors",
      description:
        "Side reflector missing on the right side between axles.",
      severity: "severe",
      location: "Right side, mid-body",
      dotRelevant: true,
      confidence: 0.91,
    },
  ];

  return {
    inspectionId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    overallCondition: "needs_attention",
    damages,
    summary:
      "Trailer shows moderate wear with several DOT-relevant issues requiring attention. Cracked brake light lens and missing reflector are priority items that may result in inspection failure. Tire wear should be monitored.",
    recommendations: [
      "Replace cracked rear left brake light lens immediately",
      "Install replacement reflector on right side mid-body",
      "Schedule tire rotation and monitor right rear outer tire tread depth",
      "Document side panel dent for fleet records — no immediate action needed",
    ],
  };
}
