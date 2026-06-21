"use client";

import { NAV } from "@/data/product";
import { getBriefing, getTenant } from "@/lib/api";
import { useStore } from "@/state/store";

/** Top bar: breadcrumb + (on briefing) week pill and approve/reject actions. */
export function TopBar() {
  const { view, tenant, approve, showToast } = useStore();
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
        <>
          <div className="weekpill">
            <span className="live" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--signal)" }} />
            {briefing.weekPill.code} · <b>{briefing.weekPill.date}</b> 週
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => {
              const el = document.getElementById("fbinput") as HTMLInputElement | null;
              el?.focus();
              showToast("差し戻したいスライドを選ぶか、フィードバックを入力してください", true);
            }}
          >
            差し戻す
          </button>
          <button className="btn btn-amber" onClick={approve}>
            このブリーフィングを承認して実行
          </button>
        </>
      ) : (
        <div className="weekpill mono">{t.unit}</div>
      )}
    </header>
  );
}
