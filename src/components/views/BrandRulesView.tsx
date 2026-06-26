"use client";

import { getBrandRules } from "@/lib/api";
import { useStore } from "@/state/store";
import type { RuleStatus } from "@/data/types";

/** Status → pill label + class (amber = needs your decision, teal/ok = settled). */
function statusPill(status: RuleStatus): { label: string; cls: string } {
  if (status === "approved") return { label: "承認済み", cls: "live" };
  if (status === "editing") return { label: "編集中", cls: "draft" };
  return { label: "提案中", cls: "man" };
}

/**
 * Pillar 1 — Brand Operating Rules (the brand "constitution"). AI proposes,
 * the human approves/edits. Everything downstream is checked against this.
 */
export function BrandRulesView() {
  const { tenant, showToast } = useStore();
  const rules = getBrandRules(tenant);

  if (!rules) {
    return (
      <div className="page">
        <div className="pagehead">
          <h1>ブランド運用ルール</h1>
          <p>このテナントのルールはAIが初期提案を準備中です。</p>
        </div>
      </div>
    );
  }

  const act = (label: string) => showToast(label);

  return (
    <div className="page">
      <div className="pagehead">
        <h1>ブランド運用ルール</h1>
        <p>{rules.summary}</p>
      </div>

      <div className="sectlabel">出面（チャネル）戦略</div>
      {rules.channelStrategy.map((c, i) => {
        const p = statusPill(c.status);
        return (
          <div className={`rule${c.aiProposed ? " ai" : ""}`} key={i}>
            <div className="rule-head">
              <div className="rule-title">
                {c.aiProposed ? <span className="ai-flag">AI提案</span> : null}
                {c.name}
                <span className={`statpill ${c.auto ? "auto" : "man"}`} style={{ marginLeft: 8 }}>
                  {c.auto ? "自動連携" : "手動投稿"}
                </span>
              </div>
              <span className={`statpill ${p.cls}`}>{p.label}</span>
            </div>
            <div className="rule-body">{c.role}</div>
            {c.reason ? <div className="rule-reason">なぜ: {c.reason}</div> : null}
            {c.status === "proposed" ? (
              <div className="rule-actions">
                <button className="btn btn-amber" onClick={() => act("提案を承認しました")}>
                  承認
                </button>
                <button className="btn btn-ghost" onClick={() => act("編集モードを開きます")}>
                  編集
                </button>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="sectlabel">ガードレール（必須 / 禁止）</div>
      {rules.guardrails.map((g, i) => {
        const p = statusPill(g.status);
        return (
          <div className={`rule${g.aiProposed ? " ai" : ""}`} key={i}>
            <div className="rule-head">
              <div className="rule-title">
                {g.aiProposed ? <span className="ai-flag">AI提案</span> : null}
                <span className={`guardtag ${g.kind}`}>{g.kind === "must" ? "必須" : "禁止"}</span>
                <span className="guardcat">{g.category}</span>
              </div>
              <span className={`statpill ${p.cls}`}>{p.label}</span>
            </div>
            <div className="rule-body">{g.text}</div>
            {g.reason ? <div className="rule-reason">なぜ: {g.reason}</div> : null}
            {g.status === "proposed" ? (
              <div className="rule-actions">
                <button className="btn btn-amber" onClick={() => act("提案を承認しました")}>
                  承認
                </button>
                <button className="btn btn-ghost" onClick={() => act("編集モードを開きます")}>
                  編集
                </button>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="sectlabel">KPI（目的の定義）</div>
      {rules.kpis.map((k, i) => {
        const p = statusPill(k.status);
        return (
          <div className={`rule${k.aiProposed ? " ai" : ""}`} key={i}>
            <div className="rule-head">
              <div className="rule-title">
                {k.aiProposed ? <span className="ai-flag">AI提案</span> : null}
                <span className={`kpitag ${k.track}`}>{k.track === "steady" ? "定常" : "キャンペーン"}</span>
                {k.label}
              </div>
              <span className={`statpill ${p.cls}`}>{p.label}</span>
            </div>
            <div className="rule-body">{k.definition}</div>
            {k.reason ? <div className="rule-reason">なぜ: {k.reason}</div> : null}
            {k.status === "proposed" ? (
              <div className="rule-actions">
                <button className="btn btn-amber" onClick={() => act("提案を承認しました")}>
                  承認
                </button>
                <button className="btn btn-ghost" onClick={() => act("編集モードを開きます")}>
                  編集
                </button>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="sectlabel">改訂履歴</div>
      <div className="revisions">
        {rules.revisions.map((r, i) => (
          <div className="rev" key={i}>
            <span className="rev-date mono">{r.date}</span>
            <span className="rev-who">{r.who}</span>
            <span className="rev-note">{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
