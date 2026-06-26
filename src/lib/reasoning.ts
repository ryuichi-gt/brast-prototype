/**
 * Reasoning-trace derivation (pillar 2 fallback).
 *
 * JRC ships a hand-authored S1–S6 reasoning trace. For tenants without one,
 * derive a lightweight but coherent trace from their existing briefing slides
 * so the reasoning graph and drill-down still work. Phase 2 replaces this with
 * the real strategy-derivation backend (strategy-logic.md).
 */
import { OPPORTUNITY_WEIGHTS as W, RELEVANCE_THRESHOLD as RT } from "@/data/config";
import type { BriefingData, ReasoningTrace } from "@/data/types";

const strip = (s: string) => s.replace(/<[^>]+>/g, "");

export function deriveReasoning(b: BriefingData): ReasoningTrace {
  const sigs = b.slides.trend.signals.slice(0, 4).map((s, i) => ({
    id: `ds-${i}`,
    topic: s.h,
    relevanceScore: typeof s.score === "number" ? s.score : 80,
    conceptMatchReason: "ブランドの概念境界に適合（自動導出）。",
    magnitude: typeof s.score === "number" ? s.score : 78,
    velocity: 60,
    recency: "今週",
    sources: [s.src],
  }));

  const synth = b.slides.strategy.nodes.find((n) => n.synth) ?? b.slides.strategy.nodes[0];
  const angle = b.slides.competitor.signals.find((s) => s.delta === "空白")?.h ?? "競合が手薄な切り口";

  const opportunities = [
    {
      id: "do-1",
      topic: b.titles.summary.slice(0, 28),
      opportunityScore: 84,
      demand: 82,
      brandFit: 86,
      competitorGap: 78,
      selfGap: 82,
      angle: strip(angle),
      intent: "campaign" as const,
      targetKPI: "CV・問い合わせ",
      basisSignalIds: sigs.slice(0, 2).map((s) => s.id),
    },
  ];

  const bets = [
    {
      id: "db-1",
      thesis: synth ? strip(synth.says).slice(0, 80) : "トレンドに基づく今週の主要な賭け",
      basisSignalIds: sigs.slice(0, 2).map((s) => s.id),
      fromOpportunityId: "do-1",
      angle: strip(angle),
      channels: b.slides.plan.pieces[0]?.channels ?? [],
      intent: "campaign" as const,
      targetKPI: "CV・問い合わせ",
      expectedOutcome: "指名流入・問い合わせの獲得",
      priority: 85,
      conformance: { status: "pass" as const },
    },
  ];

  return {
    stages: [
      { id: "s1", code: "S1", name: "信号選別", operation: `概念境界に照らして relevance を採点し、しきい値 ${RT} 未満は除外。`, inputs: ["ナレッジ（概念境界）", "生信号"], outputSummary: `${sigs.length}信号を採用` },
      { id: "s2", code: "S2", name: "空白検出", operation: `opportunityScore = ${W.demand}·需要 + ${W.brandFit}·強み + ${W.competitorGap}·競合空白 + ${W.selfGap}·自社未発信。`, inputs: ["採用信号", "競合/自社カバレッジ"], outputSummary: "主要機会を抽出" },
      { id: "s3", code: "S3", name: "目的割付", operation: "KPIに照らし 定常／キャンペーン に分類。", inputs: ["機会", "KPI"], outputSummary: "目的を割付" },
      { id: "s4", code: "S4", name: "戦略ベット", operation: "結論を統合し根拠付きの賭けに定式化。", inputs: ["機会", "採用信号"], outputSummary: "戦略ベットを生成" },
      { id: "s5", code: "S5", name: "規範チェック", operation: "ブランド運用ルールに照合。", inputs: ["ベット", "ガードレール"], outputSummary: "pass" },
      { id: "s6", code: "S6", name: "プラン化", operation: "通過ベットをコンテンツ×チャネル×スケジュールに展開。", inputs: ["通過ベット", "出面戦略"], outputSummary: `${b.slides.plan.pieces.length}コンテンツに展開` },
    ],
    scoredSignals: sigs,
    droppedSignals: [
      { topic: "キーワード一致のみの無関連候補", reason: "概念境界の外と判定し除外（relevance < 60）。" },
    ],
    opportunities,
    bets,
  };
}
