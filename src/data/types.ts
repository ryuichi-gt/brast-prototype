/**
 * Domain types for the BRAST Phase 1 prototype.
 * All data is dummy JSON-shaped data (see other files in src/data). The fetch
 * layer in src/lib/api.ts is the single seam that Phase 2 (DIGITRAN) swaps for
 * real backend calls.
 */

/* ---------- Navigation / shell ---------- */
export type ViewId =
  | "briefing"
  | "rules"
  | "strategy"
  | "trends"
  | "knowledge"
  | "content"
  | "channels"
  | "agents"
  | "results";

export type IconId =
  | "brief"
  | "strat"
  | "radar"
  | "know"
  | "content"
  | "chan"
  | "agent"
  | "rules"
  | "results"
  | "chev"
  | "left"
  | "right"
  | "send"
  | "spark";

export interface NavItem {
  id?: ViewId;
  label?: string;
  icon?: IconId;
  badge?: string;
  sep?: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  unit: string;
  channels: string[];
}

/* ---------- Pipeline (orchestration that produced the briefing) ---------- */
/** Stable keys for the 9 pipeline stages. `you` = human review (amber). */
export type PipeKey =
  | "know"
  | "trend"
  | "strat"
  | "gen"
  | "img"
  | "review"
  | "score"
  | "you"
  | "dist";

export type PipeState = "done" | "you" | "pending";

export interface PipeNode {
  key: PipeKey;
  n: string;
  d: string;
  meta: string;
  state: PipeState;
  subs?: string[];
}

/* ---------- Briefing slides ---------- */
export type SlideKey =
  | "summary"
  | "knowledge"
  | "trend"
  | "competitor"
  | "strategy"
  | "plan"
  | "schedule";

/** The pipeline stage a slide traces back to when flagged for rework. */
export type TraceKey = "know" | "trend" | "strat" | "gen" | "dist";

export interface Kpi {
  v: string;
  unit?: string;
  l: string;
  d?: string;
  dTone?: "up" | "warn";
}

export interface Track {
  kind: "steady" | "camp";
  title: string;
  tag: string;
  body: string;
  meta: { k: string; v: string }[];
}

export interface SummaryData {
  lead: string;
  kpis: Kpi[];
  tracks: Track[];
}

export interface KCard {
  title: string;
  status: "fresh" | "stale";
  statusLabel: string;
  items: string[];
}

export interface KnowledgeSlideData {
  lead: string;
  cards: KCard[];
}

export interface Signal {
  score: number | string;
  h: string;
  src: string;
  delta: string;
  hot?: boolean;
}

export interface SignalsSlideData {
  lead: string;
  signals: Signal[];
  foot: string;
}

export interface ReasonNode {
  nm: string;
  role: string;
  says: string;
  synth?: boolean;
}

export interface StrategySlideData {
  lead: string;
  nodes: ReasonNode[];
}

export interface Piece {
  title: string;
  channels: string[];
  score: number;
  status: "pass" | "review" | "gen";
  statusLabel: string;
  track?: string;
  /** Links to a full Article body (TenantBundle.articles) for the reader. */
  articleId?: string;
}

export interface PlanSlideData {
  lead: string;
  pieces: Piece[];
}

export interface ScheduleRow {
  ch: string;
  auto: boolean;
  /** map of day index (0=Mon .. 6=Sun) -> [tone, label] */
  ev: Record<number, [tone: "t" | "a", label: string]>;
}

export interface ScheduleSlideData {
  lead: string;
  rows: ScheduleRow[];
}

export interface SlideMeta {
  key: SlideKey;
  eye: string;
  owner: string;
  trace: TraceKey;
  title: string;
}

/* ---------- Pillar 2: Reasoning graph (S1–S6, strategy-logic.md) ---------- */
export interface ScoredSignal {
  id: string;
  topic: string;
  relevanceScore: number;
  conceptMatchReason: string;
  magnitude: number;
  velocity: number;
  recency: string;
  sources: string[];
}

export interface DroppedSignal {
  topic: string;
  reason: string;
}

export interface Opportunity {
  id: string;
  topic: string;
  opportunityScore: number;
  demand: number;
  brandFit: number;
  competitorGap: number;
  selfGap: number;
  angle: string;
  intent: "steady" | "campaign";
  targetKPI: string;
  basisSignalIds: string[];
}

export interface StrategyBet {
  id: string;
  thesis: string;
  basisSignalIds: string[];
  fromOpportunityId: string;
  angle: string;
  channels: string[];
  intent: "steady" | "campaign";
  targetKPI: string;
  expectedOutcome: string;
  priority: number;
  conformance: { status: "pass" | "violation"; ruleId?: string; reason?: string };
}

export type ReasoningStageId = "s1" | "s2" | "s3" | "s4" | "s5" | "s6";

export interface ReasoningStage {
  id: ReasoningStageId;
  code: string;
  name: string;
  operation: string;
  inputs: string[];
  outputSummary: string;
}

/** reasoningTrace = the S1–S6 glass box the briefing's top graph renders. */
export interface ReasoningTrace {
  stages: ReasoningStage[];
  scoredSignals: ScoredSignal[];
  droppedSignals: DroppedSignal[];
  opportunities: Opportunity[];
  bets: StrategyBet[];
}

export interface BriefingData {
  weekLabel: string;
  weekPill: { code: string; date: string };
  deckSubtitle: string;
  pipeline: PipeNode[];
  /** Per-slide H2 headline (tenant-specific). */
  titles: Record<SlideKey, string>;
  /** Pillar 2 — S1–S6 reasoning trace (optional; derived if absent). */
  reasoning?: ReasoningTrace;
  slides: {
    summary: SummaryData;
    knowledge: KnowledgeSlideData;
    trend: SignalsSlideData;
    competitor: SignalsSlideData;
    strategy: StrategySlideData;
    plan: PlanSlideData;
    schedule: ScheduleSlideData;
  };
}

/* ---------- Other views ---------- */
export interface StrategyWeek {
  w: string;
  th: string;
  st: "you" | "live";
  pieces: string;
  reach: string;
}

export interface RadarBlip {
  x: number;
  y: number;
  hot?: boolean;
  l: string;
}

export interface TrendCard {
  h: string;
  pill: { kind: "auto" | "man"; label: string };
  body: string;
}

export interface TrendsData {
  blips: RadarBlip[];
  cards: TrendCard[];
}

export interface KnowledgeItem {
  title: string;
  body: string;
  statusLabel: string;
  status: "fresh" | "stale";
}

export interface ContentItem {
  title: string;
  channels: string[];
  meta: string;
  badge?: "hot" | "review";
  /** Links to a full Article body (TenantBundle.articles) for the reader. */
  articleId?: string;
}

/** One reviewer's verdict in the 4-agent review cluster. */
export interface ReviewBreakdown {
  label: string;
  score: number;
  note: string;
}

/** A block of article body (avoids a markdown dependency; type-safe). */
export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; html: string };

/** A full generated piece, viewable in the article reader. */
export interface Article {
  id: string;
  kind: "article" | "sns" | "asset";
  title: string;
  dek?: string;
  channels: string[];
  track?: string;
  score: number;
  status: "pass" | "review";
  reviews: ReviewBreakdown[];
  keyVisual?: string;
  body: ArticleBlock[];
  sources?: { label: string; url: string }[];
}

export interface VersionCompare {
  title: string;
  note: string;
  channels: string[];
  old: { label: string; ver: string; body: string };
  next: { label: string; ver: string; body: string };
}

export interface ContentData {
  upcoming: ContentItem[];
  published: ContentItem[];
  versionCompare: VersionCompare;
}

export interface Channel {
  ic: string;
  color: string;
  n: string;
  role: string;
  auto: boolean;
  posts: string;
  reach: string;
}

export interface ChannelsData {
  unitLabel: string;
  channels: Channel[];
}

export interface Agent {
  color: string;
  n: string;
  r: string;
  d: string;
  cfg: string[];
  gate?: boolean;
}

/** Everything a single tenant needs to render every screen. */
export interface TenantBundle {
  tenant: Tenant;
  briefing: BriefingData;
  strategyArchive: StrategyWeek[];
  trends: TrendsData;
  knowledge: KnowledgeItem[];
  content: ContentData;
  channels: ChannelsData;
  /** Full generated pieces, keyed by id, for the article reader (optional). */
  articles?: Record<string, Article>;
  /** Pillar 1 — the brand "constitution" that governs everything (M5). */
  brandRules?: BrandRules;
}

/* ---------- Pillar 1: Brand Operating Rules (M5) ---------- */
/** AI proposes, the human approves/edits — nothing starts from a blank page. */
export type RuleStatus = "proposed" | "approved" | "editing";

export interface RevisionEntry {
  date: string;
  who: string;
  note: string;
}

export interface ChannelRule {
  name: string;
  role: string;
  /** API-linked (auto) vs manual posting. */
  auto: boolean;
  status: RuleStatus;
  /** True when this is an AI proposal (e.g. "stand up a new media site"). */
  aiProposed?: boolean;
  reason?: string;
}

export interface Guardrail {
  kind: "must" | "forbidden";
  category: string;
  text: string;
  status: RuleStatus;
  aiProposed?: boolean;
  reason?: string;
}

export interface KpiRule {
  track: "steady" | "campaign";
  label: string;
  definition: string;
  status: RuleStatus;
  aiProposed?: boolean;
  reason?: string;
}

export interface BrandRules {
  summary: string;
  channelStrategy: ChannelRule[];
  guardrails: Guardrail[];
  kpis: KpiRule[];
  revisions: RevisionEntry[];
}
