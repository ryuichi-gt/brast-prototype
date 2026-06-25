"use client";

import { NAV } from "@/data/product";
import { getBriefing, getTenant } from "@/lib/api";
import { useStore } from "@/state/store";

/** Top bar: breadcrumb + (on briefing) the week pill. The approve/reject
 * actions now live in the sticky footer (ApproveBar). */
export function TopBar() {
  const { view, tenant } = useStore();
  const t = getTenant(tenant);
  const isBrief = view === "briefing";
  const briefing = getBriefing(tenant);
  const viewLabel = NAV.find((n) => n.id === view)?.label ?? "";

  return (
    <header className="topbar">
      <div className="crumb">
        <b>{t.name}</b>
        <span className="slash">/</span>
        {t.unit}
        <span className="slash">/</span>
        {viewLabel}
      </div>
      <div className="grow" />
      {isBrief ? (
        <div className="weekpill">
          <span className="live" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }} />
          {briefing.weekPill.code} · <b>{briefing.weekPill.date}</b> 週
        </div>
      ) : (
        <div className="weekpill mono">{t.unit}</div>
      )}
    </header>
  );
}

