/**
 * Fetch layer — the single seam between the UI and its data.
 *
 * Phase 1 (now): returns dummy data from src/data synchronously.
 * Phase 2 (DIGITRAN): swap each body for a real backend call
 *   (e.g. `return (await fetch(`/api/tenants/${id}/briefing`)).json()`).
 * Keep all data access going through this module so the swap is localized.
 */
import { TENANT_BUNDLES } from "@/data/tenants";
import type {
  Article,
  BrandRules,
  BriefingData,
  ChannelsData,
  ContentData,
  KnowledgeItem,
  ReasoningTrace,
  ResultsData,
  StrategyWeek,
  Tenant,
  TenantBundle,
  TrendsData,
} from "@/data/types";
import { deriveReasoning } from "@/lib/reasoning";

function bundleAt(index: number): TenantBundle {
  const safe = ((index % TENANT_BUNDLES.length) + TENANT_BUNDLES.length) % TENANT_BUNDLES.length;
  return TENANT_BUNDLES[safe];
}

/** List of tenants for the rail switcher. */
export function getTenants(): Tenant[] {
  return TENANT_BUNDLES.map((b) => b.tenant);
}

export function getTenant(index: number): Tenant {
  return bundleAt(index).tenant;
}

export function getBriefing(tenantIndex: number): BriefingData {
  return bundleAt(tenantIndex).briefing;
}

export function getStrategyArchive(tenantIndex: number): StrategyWeek[] {
  return bundleAt(tenantIndex).strategyArchive;
}

export function getTrends(tenantIndex: number): TrendsData {
  return bundleAt(tenantIndex).trends;
}

export function getKnowledge(tenantIndex: number): KnowledgeItem[] {
  return bundleAt(tenantIndex).knowledge;
}

export function getContent(tenantIndex: number): ContentData {
  return bundleAt(tenantIndex).content;
}

export function getChannels(tenantIndex: number): ChannelsData {
  return bundleAt(tenantIndex).channels;
}

export function getArticle(tenantIndex: number, id: string): Article | null {
  return bundleAt(tenantIndex).articles?.[id] ?? null;
}

export function getBrandRules(tenantIndex: number): BrandRules | null {
  return bundleAt(tenantIndex).brandRules ?? null;
}

/** S1–S6 reasoning trace; hand-authored if present, otherwise derived. */
export function getReasoning(tenantIndex: number): ReasoningTrace {
  const b = bundleAt(tenantIndex).briefing;
  return b.reasoning ?? deriveReasoning(b);
}

/** Execution + results; hand-authored if present, otherwise derived. */
export function getResults(tenantIndex: number): ResultsData {
  const bundle = bundleAt(tenantIndex);
  if (bundle.results) return bundle.results;
  const autoCh = bundle.channels.channels.filter((c) => c.auto).slice(0, 2);
  return {
    inFlight: autoCh.map((c, i) => ({
      channel: c.n,
      piece: bundle.briefing.slides.plan.pieces[i]?.title ?? "今週のコンテンツ",
      status: i === 0 ? "publishing" : "scheduled",
      when: i === 0 ? "本日 09:00" : "今週",
      auto: true,
    })),
    weeks: bundle.strategyArchive.map((w, i) => ({
      week: w.w,
      reach: w.reach,
      cv: w.st === "you" ? "—" : "資料DL・問い合わせ（推定）",
      expectation: w.st === "you" ? "pending" : i === 2 ? "below" : "met",
      note: w.st === "you" ? "承認待ち。承認後に配信を起動。" : "実行済み。週次結果は推定値。",
    })),
    daily: {
      date: "本日 08:00",
      lines: ["昨日の配信リーチが堅調に推移", "問い合わせ・保存などの反応を集計中", "次回ブリーフィング：来週月 06:00"],
    },
  };
}
