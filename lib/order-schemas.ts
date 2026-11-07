import { z } from "zod";
import { aiLanguageCodes } from "@/lib/ai-languages";

export const analysisSnapshotSchema = z.object({
  summary: z.string().trim().min(1).max(2_000),
  requirements: z.array(z.object({
    requirement: z.string().trim().min(1).max(500),
    clarity: z.enum(["clear", "unclear"]),
    evidence: z.string().trim().max(500),
  }).strict()).max(30),
  risks: z.array(z.object({
    risk: z.string().trim().min(1).max(500),
    severity: z.enum(["critical", "high", "medium", "low"]),
    evidence: z.string().trim().max(500),
  }).strict()).max(30),
  deadline: z.object({ value: z.string().trim().min(1).max(300), evidence: z.string().trim().max(500) }).strict(),
  budget: z.object({ value: z.string().trim().min(1).max(300), evidence: z.string().trim().max(500) }).strict(),
  client_questions: z.array(z.string().trim().min(1).max(500)).max(20),
  action_items: z.array(z.object({
    order: z.number().int().min(1).max(30),
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().max(500),
    timing: z.string().trim().min(1).max(160),
  }).strict()).max(30),
  recommendation: z.object({
    decision: z.enum(["take", "negotiate", "decline"]),
    rationale: z.string().trim().min(1).max(700),
  }).strict(),
  extracted_links: z.array(z.object({
    url: z.string().max(2048),
    title: z.string().trim().max(160),
    description: z.string().trim().max(500),
  }).strict()).max(50),
}).strict();

export type AnalysisSnapshot = z.infer<typeof analysisSnapshotSchema>;

export const saveOrderSchema = z.object({
  organizationId: z.string().uuid(),
  analysisId: z.string().uuid(),
  name: z.string().trim().min(1).max(160),
  clientName: z.string().trim().max(160).optional().default(""),
  language: z.enum(aiLanguageCodes),
  analysis: analysisSnapshotSchema,
  completedActions: z.array(z.number().int().min(0).max(29)).max(30).default([]),
}).strict();

export const orderStatuses = ["active", "completed", "archived"] as const;
export type OrderStatus = (typeof orderStatuses)[number];

export const orderStatusLabels: Record<OrderStatus, string> = {
  active: "Aktyvus",
  completed: "Baigtas",
  archived: "Archyvuotas",
};

export const decisionLabels = {
  take: "Imtis",
  negotiate: "Derėtis",
  decline: "Atsisakyti",
} as const;

/** Orders action items by their `order` and carries the "done" flag from the original index. */
export function buildOrderTasks(
  actionItems: AnalysisSnapshot["action_items"],
  completedActions: number[],
) {
  const done = new Set(completedActions);
  return actionItems
    .map((item, index) => ({ item, index }))
    .sort((left, right) => left.item.order - right.item.order || left.index - right.index)
    .map(({ item, index }) => ({
      title: item.title,
      description: item.description,
      timing: item.timing,
      done: done.has(index),
    }));
}
