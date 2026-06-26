/**
 * Product-level configuration constants.
 *
 * SCORE_THRESHOLD — the multi-stage review score gate. At or above this value a
 * piece is an auto-approval candidate; below it, human review is recommended.
 *
 * Confirmed value: 90 (decided by Okamoto on 2026-06-21, matching the meeting
 * transcript). Centralized here so the gate is a one-line change; CLAUDE.md §4
 * reflects the same number.
 */
export const SCORE_THRESHOLD = 90;

/**
 * Strategy-derivation tuning (strategy-logic.md S1/S2). These drive the
 * reasoning graph's explanations.
 *
 * ⚠️ 要確認 (v1 / 叩き台): relevance threshold and opportunity weights are
 * provisional values from strategy-logic.md §8; to be confirmed with Long.
 * Centralized here so tuning is a one-line change once decided.
 */
export const RELEVANCE_THRESHOLD = 60;

export const OPPORTUNITY_WEIGHTS = {
  demand: 0.35,
  brandFit: 0.3,
  competitorGap: 0.2,
  selfGap: 0.15,
} as const;
