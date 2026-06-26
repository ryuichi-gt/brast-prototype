"use client";

import { getResults, getStrategyArchive } from "@/lib/api";
import { useStore } from "@/state/store";

/** Strategy archive: weekly strategy sheets stack up, now with execution results. */
export function StrategyArchiveView() {
  const { tenant } = useStore();
  const weeks = getStrategyArchive(tenant);
  const results = getResults(tenant).weeks;
  const resultFor = (w: string) => results.find((r) => r.week === w);
  const expLabel = { met: "期待値 到達", below: "期待値 未達", pending: "実行待ち" } as const;
  const expCls = { met: "live", below: "man", pending: "draft" } as const;

  return (
    <div className="page">
      <div className="pagehead">
        <h1>戦略アーカイブ</h1>
        <p>
          週ごとの戦略シートが積み上がります。実行済みも、これから実行するものも、同じ流れで遡れます。先週までの判断・差し戻しの癖もここに学習されていきます。
        </p>
      </div>
      <div className="sectlabel">Weekly Strategy Sheets</div>
      <div className="cards">
        {weeks.map((x, i) => (
          <div className="card" key={i}>
            <div className="ch">
              <h3>{x.w}</h3>
              <span className={`statpill ${x.st === "you" ? "man" : "live"}`}>
                {x.st === "you" ? "承認待ち" : "実行済み"}
              </span>
            </div>
            <p>{x.th}</p>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 13,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--t-lo)",
              }}
            >
              <span>
                コンテンツ <b style={{ color: "var(--t-hi)" }}>{x.pieces}</b>
              </span>
              <span>
                リーチ <b style={{ color: "var(--t-hi)" }}>{x.reach}</b>
              </span>
              {resultFor(x.w)?.cv && resultFor(x.w)!.cv !== "—" ? (
                <span>
                  CV <b style={{ color: "var(--t-hi)" }}>{resultFor(x.w)!.cv}</b>
                </span>
              ) : null}
            </div>
            {resultFor(x.w) ? (
              <div style={{ marginTop: 11 }}>
                <span className={`statpill ${expCls[resultFor(x.w)!.expectation]}`}>
                  {expLabel[resultFor(x.w)!.expectation]}
                </span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
