"use client";

import { Icon } from "@/components/Icon";
import { traceContains } from "@/data/product";
import { useStore } from "@/state/store";
import { ChatPanel } from "./ChatPanel";

/** Right rail: the thinking process (pipeline) + AI chat (operation surface). */
export function PipeRail() {
  const { pipeline, traceKey } = useStore();

  return (
    <div className="pipe">
      <div className="pipehead">
        <div className="t">
          <Icon id="spark" />
          &nbsp;思考プロセス
        </div>
        <div className="s">
          このブリーフィングを作った工程です。チャットで直したい点を伝えると、原因の工程まで遡って下流だけ再実行します。
        </div>
      </div>

      <div className="pipeline">
        {pipeline.map((p) => {
          const isTrace = traceContains(traceKey, p.key);
          return (
            <div className={`pnode ${p.state}${isTrace ? " trace" : ""}`} key={p.key}>
              <div className="gut">
                <div className="nd" />
                <div className="ln" />
              </div>
              <div className="pbody">
                <div className="pn">{p.n}</div>
                <div className="pd">{p.d}</div>
                {p.subs ? (
                  <div className="subagents">
                    {p.subs.map((s) => (
                      <span className="sa ok" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="pmeta">{p.meta}</div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatPanel />
    </div>
  );
}
