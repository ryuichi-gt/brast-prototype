"use client";

import { getKnowledge } from "@/lib/api";
import { useStore } from "@/state/store";

/** Brand knowledge: the base. Only diffs surface as "更新候補" (stale). */
export function KnowledgeView() {
  const { tenant } = useStore();
  const items = getKnowledge(tenant);

  return (
    <div className="page">
      <div className="pagehead">
        <h1>ブランドナレッジ</h1>
        <p>
          すべての発信の土台です。前提は勝手に変わらないので、差分があるものだけ「更新候補」として上げます。承認すると、以降のトレンド調査・戦略・生成すべてに反映されます。
        </p>
      </div>
      <div className="sectlabel">Base Knowledge</div>
      <div className="cards c2">
        {items.map((x, i) => (
          <div className="card" key={i}>
            <div className="ch">
              <h3>{x.title}</h3>
              <span className={`statpill ${x.status === "fresh" ? "live" : "man"}`}>{x.statusLabel}</span>
            </div>
            <p>{x.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
