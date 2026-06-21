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
