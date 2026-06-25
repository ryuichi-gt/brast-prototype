"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useStore } from "@/state/store";

/**
 * AI chat — the primary operation surface. You instruct your AI subordinate in
 * natural language; it traces the request to a pipeline stage and offers an
 * inline re-run. (The deck stays the read surface; per CLAUDE.md §2 the chat is
 * how you *act*, not how you *consume* the strategy.)
 */
export function ChatPanel() {
  const { messages, sendChat, rerun, traceKey } = useStore();
  const [text, setText] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const submit = () => {
    const v = text.trim();
    if (!v) return;
    sendChat(v);
    setText("");
  };

  return (
    <div className="chat">
      <div className="chathead">
        <span className="dl">AIチャット — 部下に指示する</span>
      </div>

      <div className="chatlog" ref={logRef} aria-live="polite">
        {messages.map((m) => (
          <div className={`msg ${m.role}`} key={m.id}>
            {m.text}
            {m.rerun && traceKey ? (
              <span
                className="rerun"
                role="button"
                tabIndex={0}
                onClick={rerun}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") rerun();
                }}
              >
                ここから再実行 ▸
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="quickfb chatsug">
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => sendChat(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="dockin">
        <input
          id="fbinput"
          placeholder="例：トレンドに◯◯を加えて戦略から作り直して"
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
    </div>
  );
}

/** Suggested instructions (seed the natural-language flow). */
const SUGGESTIONS = ["戦略から作り直して", "トレンドを再調査して", "この記事だけ再生成して"];
