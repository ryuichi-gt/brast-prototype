"use client";

import { Icon } from "@/components/Icon";
import { AGENTS } from "@/data/product";
import { useStore } from "@/state/store";

/** Agents: the orchestration pipeline. View-only (config visible, not editable). */
export function AgentsView() {
  const { showToast } = useStore();

  return (
    <div className="page">
      <div className="pagehead">
        <h1>エージェント</h1>
        <p>
          裏側のオーケストレーションです。構成はこちらで用意し、あなたは中身を確認できます（編集は不可、選んで使う設計）。審査ゲートを通った成果だけが、あなたのレビューに上がります。
        </p>
      </div>
      <div className="sectlabel">Orchestration Pipeline · Agent SDK</div>
      {AGENTS.map((a, i) => (
        <div className="agentrow" key={i}>
          <div className="agut">
            <div className="ad" style={{ background: a.color }} />
            <div className="al" />
          </div>
          <div className={`acard${a.gate ? " gate" : ""}`}>
            <div className="ahead">
              <div className="an" style={a.gate ? { color: "var(--amber)" } : undefined}>
                {a.n}
              </div>
              <div className="arole">{a.r}</div>
            </div>
            <p>{a.d}</p>
            <div className="cfg">
              {a.cfg.map((c) => (
                <span className="c" key={c}>
                  {c}
                </span>
              ))}
            </div>
            <span
              className="viewcfg"
              role="button"
              tabIndex={0}
              onClick={() => showToast("設定の中身を表示（編集は不可）")}
              onKeyDown={(e) => {
                if (e.key === "Enter") showToast("設定の中身を表示（編集は不可）");
              }}
            >
              <Icon id="chev" /> 設定の中身を見る
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
