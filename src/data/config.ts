/**
 * Product-level configuration constants.
 *
 * SCORE_THRESHOLD — the multi-stage review score gate. At or above this value a
 * piece is an auto-approval candidate; below it, human review is recommended.
 *
 * ⚠️ 要確認 (open spec item): the meeting transcript has the CEO say "90点"
 * while the reviewed mockup uses 95. Per CLAUDE.md the provisional value is 95
 * (matches the mockup = UI source of truth). Centralized here so confirming the
 * final number is a one-line change. Update CLAUDE.md §4 once decided.
 */
export const SCORE_THRESHOLD = 95;
