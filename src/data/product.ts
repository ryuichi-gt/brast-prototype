import type { Agent, NavItem, SlideMeta, TraceKey } from "./types";
import { SCORE_THRESHOLD } from "./config";

/** Left-rail navigation. teal/amber semantics: the amber badge = needs you. */
export const NAV: NavItem[] = [
  { id: "briefing", label: "週次ブリーフィング", icon: "brief", badge: "要承認" },
  { id: "results", label: "実行・結果", icon: "results" },
  { id: "strategy", label: "戦略アーカイブ", icon: "strat" },
  { sep: true },
  { id: "rules", label: "ブランド運用ルール", icon: "rules", badge: "提案" },
  { id: "knowledge", label: "ブランドナレッジ", icon: "know" },
  { id: "trends", label: "トレンド・レーダー", icon: "radar" },
  { sep: true },
  { id: "content", label: "コンテンツ", icon: "content", badge: "7" },
  { id: "channels", label: "チャネル", icon: "chan" },
  { id: "agents", label: "エージェント", icon: "agent" },
];

/** Slide order + metadata. Content per tenant lives in BriefingData.slides. */
export const SLIDE_META: SlideMeta[] = [
  { key: "summary", eye: "Executive Summary", owner: "戦略統合", trace: "strat", title: "" },
  { key: "knowledge", eye: "Knowledge Status", owner: "ナレッジ更新", trace: "know", title: "" },
  { key: "trend", eye: "Market Trend", owner: "トレンド調査", trace: "trend", title: "" },
  { key: "competitor", eye: "Competitive Move", owner: "トレンド調査", trace: "trend", title: "" },
  { key: "strategy", eye: "Strategy", owner: "戦略統合", trace: "strat", title: "" },
  { key: "plan", eye: "This Week’s Media Plan", owner: "コンテンツ生成 + 多段レビュー", trace: "gen", title: "" },
  { key: "schedule", eye: "Distribution", owner: "配信", trace: "dist", title: "" },
];

/**
 * Orchestration pipeline shown in the Agents view. This is product-level
 * (the AI's process is the same across tenants); only run-time meta differs.
 * Editing is intentionally disabled in Phase 1 (view-only).
 */
export const AGENTS: Agent[] = [
  {
    color: "var(--signal)",
    n: "トレンド調査",
    r: "Research",
    d: "ナレッジを前提に制度・市場・SNS・競合をリアルタイム収集。関連度でランク付けして信号化する。",
    cfg: ["頻度: 週次 月06:00", "ソース: 政府/業界紙/SNS/検索", "出力: 関連度スコア"],
  },
  {
    color: "var(--signal)",
    n: "戦略統合",
    r: "Strategy Orchestrator",
    d: "市場・競合エージェントの結論を統合し、定常発信とキャンペーンの2トラックで週次戦略を決定する。",
    cfg: ["統合元: 市場/競合", "出力: 戦略シート", "トラック: 定常 + キャンペーン"],
  },
  {
    color: "var(--signal)",
    n: "コンテンツ生成",
    r: "Content",
    d: "戦略に紐づけて記事・SNS草稿を生成。媒体ごとに文量とトーンを出し分ける。",
    cfg: ["媒体別フォーマット", "トーン: ナレッジ準拠", "出力: 記事 / SNS / 配布資料"],
  },
  {
    color: "var(--signal)",
    n: "画像生成",
    r: "Visual",
    d: "各記事のキービジュアルを生成。ブランドのビジュアルトーンに準拠する。",
    cfg: ["出力: キービジュアル", "準拠: ブランドトーン"],
  },
  {
    gate: true,
    color: "var(--amber)",
    n: "多段レビュー（4体）",
    r: "Review Cluster",
    d: "4体の審査エージェントが並列で審査。1つでも基準未達なら生成工程へ戻す。",
    cfg: ["AIライティング検知", "法務・景表法", "レピュテーション", "IR・専門"],
  },
  {
    gate: true,
    color: "var(--amber)",
    n: "スコアリング & ゲート",
    r: "Score Gate",
    d: `審査結果を統合し${SCORE_THRESHOLD}点しきい値で判定。基準超なら原則そのまま、未満はあなたのレビューを推奨。`,
    cfg: [`しきい値: ${SCORE_THRESHOLD} / 100`, "超過: 自動承認候補", "未満: 人間レビュー推奨"],
  },
];

/**
 * Trace-back logic: flagging a slide highlights its origin pipeline stage and
 * everything downstream up to the score gate (already-approved work is kept).
 */
export const TRACE_ORDER = [
  "know",
  "trend",
  "strat",
  "gen",
  "img",
  "review",
  "score",
  "you",
  "dist",
] as const;

export function traceContains(traceKey: string | null, nodeKey: string): boolean {
  if (!traceKey) return false;
  const start = TRACE_ORDER.indexOf(traceKey as (typeof TRACE_ORDER)[number]);
  const here = TRACE_ORDER.indexOf(nodeKey as (typeof TRACE_ORDER)[number]);
  const end = TRACE_ORDER.indexOf("score");
  return here >= start && here <= end;
}

const TRACE_MESSAGES: Record<TraceKey, [string, string]> = {
  know: ["ナレッジ更新", "ナレッジを更新すると、トレンド〜戦略〜生成まで全工程を作り直します"],
  trend: ["トレンド調査", "調査をやり直し、戦略・コンテンツ・スコアまで下流6工程を再実行します"],
  strat: ["戦略統合", "戦略から作り直し、生成・画像・レビュー・スコアの下流5工程を再実行します"],
  gen: ["コンテンツ生成", "この記事だけ再生成し、画像・レビュー・スコアを通し直します"],
  dist: ["配信", "配信のチャネル割り当て・スケジュールのみ調整します（生成はやり直しません）"],
};

export function traceMessage(key: TraceKey): { title: string; body: string } {
  const [title, body] = TRACE_MESSAGES[key] ?? TRACE_MESSAGES.strat;
  return { title, body };
}

/** Naive intent routing for free-text feedback (demo only). */
export function routeFeedback(text: string): TraceKey {
  if (/トレンド|調査|市場|ニュース/.test(text)) return "trend";
  if (/ナレッジ|前提|情報更新/.test(text)) return "know";
  if (/記事|生成|文章|画像/.test(text)) return "gen";
  if (/配信|スケジュール|チャネル|投稿/.test(text)) return "dist";
  return "strat";
}
