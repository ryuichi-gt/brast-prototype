"use client";

import { getReasoning } from "@/lib/api";
import { stageIsDownstream, traceToStage } from "@/data/product";
import { useStore } from "@/state/store";
import type { ReasoningStage, ReasoningTrace, ViewId } from "@/data/types";

/**
 * Pillar 2 — the glass box. S1→S6 strategy-derivation stages as a horizontal
 * progress, each clickable to reveal "inputs (根拠) / operation (適用ルール・重み) /
 * outputs (結論)". Drill down a bet → its opportunity → its source signals, so
 * "why is this output correct" is always traceable. (strategy-logic.md)
 */
export function ReasoningGraph() {
  const { tenant, traceKey, openStage, setOpenStage, setView } = useStore();
  const r = getReasoning(tenant);
  const tracedFrom = traceToStage(traceKey);

  return (
    <div className="rgraph">
      <div className="rgraph-head">
        <span className="rgraph-t">推論グラフ</span>
        <span className="rgraph-s">根拠 → 結論まで辿れる。各ステージをタップで「入力・操作・結論」を表示。</span>
      </div>

      <div className="rg-track">
        {r.stages.map((st, i) => {
          const traced = stageIsDownstream(tracedFrom, st.id);
          const active = openStage === st.id;
          return (
            <button
              key={st.id}
              className={`rg-node done${active ? " active" : ""}${traced ? " trace" : ""}`}
              onClick={() => setOpenStage(active ? null : st.id)}
            >
              <span className="rg-code">{st.code}</span>
              <span className="rg-name">{st.name}</span>
              {i < r.stages.length - 1 ? <span className="rg-arrow">→</span> : null}
            </button>
          );
        })}
      </div>

      {openStage ? (
        <StageDetail stage={r.stages.find((s) => s.id === openStage)!} r={r} nav={setView} />
      ) : null}
    </div>
  );
}

function StageDetail({ stage, r, nav }: { stage: ReasoningStage; r: ReasoningTrace; nav: (v: ViewId) => void }) {
  return (
    <div className="rg-detail">
      <div className="rg-detail-grid">
        <div className="rg-col">
          <div className="rg-col-h">入力した根拠</div>
          <ul className="rg-inputs">
            {stage.inputs.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rg-col">
          <div className="rg-col-h">操作（適用ルール・重み）</div>
          <p className="rg-op">{stage.operation}</p>
          <div className="rg-out">結論: {stage.outputSummary}</div>
        </div>
      </div>

      <div className="rg-payload">{renderPayload(stage.id, r)}</div>

      {stage.id === "s1" ? (
        <div className="rg-jump">
          <button onClick={() => nav("trends")}>トレンド・レーダーで詳しく ▸</button>
          <button onClick={() => nav("knowledge")}>ブランドナレッジで前提を見る ▸</button>
        </div>
      ) : null}
      {stage.id === "s5" ? (
        <div className="rg-jump">
          <button onClick={() => nav("rules")}>ブランド運用ルールを見る ▸</button>
        </div>
      ) : null}
    </div>
  );
}

function renderPayload(id: ReasoningStage["id"], r: ReasoningTrace) {
  const sigById = (sid: string) => r.scoredSignals.find((s) => s.id === sid);
  const oppById = (oid: string) => r.opportunities.find((o) => o.id === oid);

  if (id === "s1") {
    return (
      <>
        {r.scoredSignals.map((s) => (
          <div className="rg-card" key={s.id} id={`sig-${s.id}`}>
            <div className="rg-card-h">
              <span className="rg-score">{s.relevanceScore}</span>
              <span className="rg-card-t">{s.topic}</span>
            </div>
            <div className="rg-reason">関連の理由: {s.conceptMatchReason}</div>
            <div className="rg-src mono">{s.sources.join(" · ")}</div>
          </div>
        ))}
        <div className="rg-dropped-h">除外した信号となぜ（概念境界の外）</div>
        {r.droppedSignals.map((d, i) => (
          <div className="rg-dropped" key={i}>
            <span className="rg-x">除外</span>
            <div>
              <div className="rg-dropped-t">{d.topic}</div>
              <div className="rg-reason">{d.reason}</div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (id === "s2") {
    return r.opportunities.map((o) => (
      <div className="rg-card" key={o.id}>
        <div className="rg-card-h">
          <span className="rg-score">{o.opportunityScore}</span>
          <span className="rg-card-t">{o.topic}</span>
        </div>
        <div className="rg-bars">
          <Bar label="需要" v={o.demand} />
          <Bar label="強み適合" v={o.brandFit} />
          <Bar label="競合の空白" v={o.competitorGap} />
          <Bar label="自社未発信" v={o.selfGap} />
        </div>
        <div className="rg-angle">空白の角度: {o.angle}</div>
      </div>
    ));
  }

  if (id === "s3") {
    return r.opportunities.map((o) => (
      <div className="rg-row" key={o.id}>
        <span className="rg-card-t">{o.topic}</span>
        <span className={`kpitag ${o.intent}`}>{o.intent === "steady" ? "定常" : "キャンペーン"}</span>
        <span className="rg-kpi mono">{o.targetKPI}</span>
      </div>
    ));
  }

  if (id === "s4") {
    return r.bets.map((b) => {
      const opp = oppById(b.fromOpportunityId);
      return (
        <div className="rg-card" key={b.id}>
          <div className="rg-card-h">
            <span className="rg-prio mono">優先 {b.priority}</span>
            <span className="rg-card-t">{b.thesis}</span>
          </div>
          <div className="rg-angle">角度: {b.angle}</div>
          {/* drill-down chain: bet ← opportunity ← signals */}
          {opp ? <div className="rg-chain">← 機会: {opp.topic}（{opp.opportunityScore}）</div> : null}
          <div className="rg-basis">
            <span className="rg-basis-l">← 根拠の信号:</span>
            {b.basisSignalIds.map((sid) => {
              const s = sigById(sid);
              return s ? (
                <span className="rg-basis-chip" key={sid}>
                  {s.topic.slice(0, 18)}… <b>{s.relevanceScore}</b>
                </span>
              ) : null;
            })}
          </div>
        </div>
      );
    });
  }

  if (id === "s5") {
    return r.bets.map((b) => (
      <div className="rg-row" key={b.id}>
        <span className="rg-card-t">{b.thesis.slice(0, 40)}…</span>
        {b.conformance.status === "pass" ? (
          <span className="statpill live">規範 pass</span>
        ) : (
          <span className="statpill man">違反: {b.conformance.reason}</span>
        )}
      </div>
    ));
  }

  // s6
  return r.bets.map((b) => (
    <div className="rg-row" key={b.id}>
      <span className="rg-card-t">{b.thesis.slice(0, 36)}…</span>
      <span className={`kpitag ${b.intent}`}>{b.intent === "steady" ? "定常" : "キャンペーン"}</span>
      <span className="rg-kpi mono">→ メディアプランへ展開</span>
    </div>
  ));
}

function Bar({ label, v }: { label: string; v: number }) {
  return (
    <div className="rg-bar">
      <span className="rg-bar-l">{label}</span>
      <span className="rg-bar-track">
        <span className="rg-bar-fill" style={{ width: `${v}%` }} />
      </span>
      <span className="rg-bar-v mono">{v}</span>
    </div>
  );
}
