"use client";

import { getTrends } from "@/lib/api";
import { useStore } from "@/state/store";

/** Trend radar: live signals monitored in real time, feeding the strategy. */
export function TrendsView() {
  const { tenant } = useStore();
  const { blips, cards } = getTrends(tenant);

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
    </div>
  );
}
