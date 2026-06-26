"use client";

import { getResults } from "@/lib/api";
import { useStore } from "@/state/store";

/**
 * Pillar 3 — Execution & Results. Closes the loop: what's publishing now, the
 * results of executed weeks (reach / CV / expectation), and the Slack daily
 * report. The human evaluates "met / missed expectation" → feeds next week.
 */
export function ResultsView() {
  const { tenant, showToast } = useStore();
  const { inFlight, weeks, daily } = getResults(tenant);

  const statusPill = (s: "published" | "publishing" | "scheduled") =>
    s === "published"
      ? { cls: "live", label: "配信済み" }
      : s === "publishing"
        ? { cls: "auto", label: "配信中" }
        : { cls: "draft", label: "予定" };

  const expPill = (e: "met" | "below" | "pending") =>
    e === "met"
      ? { cls: "live", label: "期待値 到達" }
      : e === "below"
        ? { cls: "man", label: "期待値 未達" }
        : { cls: "draft", label: "実行待ち" };

  return (
    <div className="page">
      <div className="pagehead">
        <h1>実行・結果</h1>
        <p>
          配信の進行と、実行済み戦略の結果（リーチ／CV／期待値到達）です。「期待値に届いたか」をあなたが評価すると、翌週の戦略へ学習として反映されます。Slack日次レポートとも接続。
        </p>
      </div>

      <div className="sectlabel">配信の進行状況</div>
      {inFlight.map((d, i) => {
        const p = statusPill(d.status);
        return (
          <div className="chan" key={i}>
            <div className="ci" style={{ background: "rgba(70,203,190,.12)", color: "var(--signal)" }}>
              {d.auto ? "自動" : "手動"}
            </div>
            <div>
              <div className="cn">
                {d.piece} <span className={`statpill ${p.cls}`} style={{ marginLeft: 6 }}>{p.label}</span>
              </div>
              <div className="role">{d.channel} · {d.when}</div>
            </div>
            <div className="cstats">
              <div className="cstat">
                <div className="v">{d.auto ? "API" : "指示"}</div>
                <div className="l">配信方式</div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="sectlabel">週次結果と期待値評価</div>
      {weeks.map((w, i) => {
        const p = expPill(w.expectation);
        return (
          <div className="card" key={i} style={{ marginBottom: 11 }}>
            <div className="ch">
              <h3>{w.week}</h3>
              <span className={`statpill ${p.cls}`}>{p.label}</span>
            </div>
            <div style={{ display: "flex", gap: 20, margin: "10px 0", fontFamily: "var(--mono)", fontSize: 11, color: "var(--t-lo)" }}>
              <span>リーチ <b style={{ color: "var(--t-hi)" }}>{w.reach}</b></span>
              <span>CV <b style={{ color: "var(--t-hi)" }}>{w.cv}</b></span>
            </div>
            <p style={{ color: "var(--t-md)", fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>{w.note}</p>
            {w.expectation !== "pending" ? (
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-teal" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => showToast("到達として承認。翌週の戦略に反映します")}>
                  到達として承認
                </button>
                <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => showToast("未達として学習。翌週は切り口を調整します", true)}>
                  未達として学習
                </button>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="sectlabel">Slack 日次レポート</div>
      <div className="slackcard">
        <div className="slack-h">
          <span className="slack-dot" /> #brast-medical-it · <span className="mono">{daily.date}</span>
        </div>
        {daily.lines.map((l, i) => (
          <div className="slack-line" key={i}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
