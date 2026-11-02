export type Assessment = {
  summary: string;
  requirements: { requirement: string; clarity: "clear" | "unclear"; evidence: string }[];
  risks: { risk: string; severity: "critical" | "high" | "medium" | "low"; evidence: string }[];
  deadline: { value: string; evidence: string };
  budget: { value: string; evidence: string };
  client_questions: string[];
  action_items: { order: number; title: string; description: string; timing: string }[];
  recommendation: { decision: "take" | "negotiate" | "decline"; rationale: string };
  extracted_links: { url: string; title: string; description: string }[];
  source_language: "lt" | "en" | "ru" | "pl" | "fr" | "de" | "es" | "uk" | "it" | "pt" | "nl" | "sv" | "ja" | "zh" | "other";
};

export function normalizeGeneratedText(value: string, languageCode: string): string;
export function normalizeGeneratedValue<T>(value: T, languageCode: string): T;
export function applyDeterministicAssessmentRules(
  analysis: Assessment,
  sourceText: string,
  languageName: string,
): Assessment;
