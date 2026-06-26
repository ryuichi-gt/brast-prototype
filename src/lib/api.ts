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
  StrategyWeek,
  Tenant,
  TenantBundle,
  TrendsData,
} from "@/data/types";

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
