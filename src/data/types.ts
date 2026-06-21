/**
 * Domain types for the BRAST Phase 1 prototype.
 * All data is dummy JSON-shaped data (see other files in src/data). The fetch
 * layer in src/lib/api.ts is the single seam that Phase 2 (DIGITRAN) swaps for
 * real backend calls.
 */

/* ---------- Navigation / shell ---------- */
export type ViewId =
  | "briefing"
  | "strategy"
  | "trends"
  | "knowledge"
  | "content"
  | "channels"
  | "agents";

export type IconId =
  | "brief"
  | "strat"
  | "radar"
  | "know"
  | "content"
  | "chan"
  | "agent"
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

export interface BriefingData {
  weekLabel: string;
  weekPill: { code: string; date: string };
  deckSubtitle: string;
  pipeline: PipeNode[];
  /** Per-slide H2 headline (tenant-specific). */
  titles: Record<SlideKey, string>;
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
}
