"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { traceContains, traceMessage } from "@/data/product";
import { useStore } from "@/state/store";
import type { TraceKey } from "@/data/types";

/** Right rail: the thinking process (pipeline) + feedback dock. */
export function PipeRail() {
  const { pipeline, traceKey, setTrace, sendFeedback, rerun } = useStore();
  const [text, setText] = useState("");

  const msg = traceKey ? traceMessage(traceKey) : null;

  const submit = () => {
    const v = text.trim();
    if (!v) return;
    sendFeedback(v);
    setText("");
  };

  return (
    <div className="pipe">
      <div className="pipehead">
        <div className="t">
          <Icon id="spark" />
          &nbsp;思考プロセス
        </div>
        <div className="s">
          このブリーフィングを作った工程です。気になるスライドを「直す」と、原因の工程まで遡って下流だけ再実行します。
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

      <div className="dock">
        <div className="dl">フィードバック — 部下に指示するように</div>
        {msg ? (
          <div className="tracemsg show">
            <b>{msg.title}</b> の仕事に差し戻します。{msg.body}。<br />
            既に承認済みの記事は残したまま進められます。{" "}
            <b style={{ cursor: "pointer", textDecoration: "underline" }} onClick={rerun} role="button" tabIndex={0}>
              ここから再実行 ▸
            </b>
          </div>
        ) : null}
        <div className="dockin">
          <input
            id="fbinput"
            placeholder="例：トレンドに○○も加えて戦略から作り直して"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          <button className="send" aria-label="送信" onClick={submit}>
            <Icon id="send" />
          </button>
        </div>
        <div className="quickfb">
          {QUICK.map((q) => (
            <button key={q.key} onClick={() => setTrace(q.key)}>
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const QUICK: { key: TraceKey; label: string }[] = [
  { key: "strat", label: "戦略から作り直す" },
  { key: "trend", label: "トレンドを再調査" },
  { key: "gen", label: "この記事だけ再生成" },
];
