"use client";

import { getReasoning, getTrends } from "@/lib/api";
import { useStore } from "@/state/store";

/** Trend radar: live signals monitored in real time, feeding the strategy. */
export function TrendsView() {
  const { tenant } = useStore();
  const { blips, cards } = getTrends(tenant);
  const { scoredSignals, droppedSignals } = getReasoning(tenant);

  return (
    <div className="page">
      <div className="pagehead">
        <h1>トレンド・レーダー</h1>
        <p>
          ナレッジを前提に、制度・市場・SNS・競合をリアルタイムで監視します。中心に近いほど関連度・緊急度が高い信号です。ここで拾った変化が、週次戦略の根拠になります。
        </p>
      </div>
      <div className="radarwrap">
        <div className="radar">
          <div className="ring" style={{ inset: "14%" }} />
          <div className="ring" style={{ inset: "30%" }} />
          <div className="ring" style={{ inset: "46%" }} />
          <div className="cross" style={{ left: "50%", top: 0, width: 1, height: "100%" }} />
          <div className="cross" style={{ top: "50%", left: 0, height: 1, width: "100%" }} />
          <div className="sweep" />
          {blips.map((b, i) => (
            <div className={`blip${b.hot ? " hot" : ""}`} style={{ left: `${b.x}%`, top: `${b.y}%` }} key={i}>
              <span className="bl">{b.l}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="sectlabel" style={{ marginTop: 0 }}>
            Live Signals
          </div>
          <div className="cards">
            {cards.map((c, i) => (
              <div className="card" key={i}>
                <div className="ch">
                  <h3>{c.h}</h3>
                  <span className={`statpill ${c.pill.kind}`}>{c.pill.label}</span>
                </div>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sectlabel">関連度の判定（S1）— なぜ関連／非関連か</div>
      <p style={{ color: "var(--t-md)", fontSize: 12.5, margin: "0 0 14px", lineHeight: 1.65, maxWidth: "74ch" }}>
        キーワード一致ではなく、ブランドの<b style={{ color: "var(--t-hi)" }}>概念境界</b>に照らして関連度を判定します。無関連を落とした理由まで開示するのが BRAST のグラスボックスです。
      </p>
      {scoredSignals.map((s) => (
        <div className="relcard" key={s.id}>
          <span className="relscore">{s.relevanceScore}</span>
          <div className="relbody">
            <div className="relh">{s.topic}</div>
            <div className="relreason">関連の理由: {s.conceptMatchReason}</div>
            <div className="relsrc mono">{s.sources.join(" · ")}</div>
          </div>
        </div>
      ))}
      <div className="sectlabel" style={{ marginTop: 18 }}>除外した無関連（概念境界の外）</div>
      {droppedSignals.map((d, i) => (
        <div className="relcard dropped" key={i}>
          <span className="relx">除外</span>
          <div className="relbody">
            <div className="relh">{d.topic}</div>
            <div className="relreason">{d.reason}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
