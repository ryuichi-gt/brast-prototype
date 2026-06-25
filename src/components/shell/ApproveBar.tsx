"use client";

import { useStore } from "@/state/store";

/**
 * Sticky footer with the human decision (amber = your call). Always pinned to
 * the bottom so the same UI layout holds on desktop and mobile.
 */
export function ApproveBar() {
  const { approve, showToast } = useStore();

  return (
    <div className="approvebar">
      <span className="hint">AIが全工程を自走済み。あなたの承認待ちです。</span>
      <div className="grow" />
      <button
        className="btn btn-ghost"
        onClick={() => {
          document.getElementById("fbinput")?.focus();
          showToast("チャットで直したい点を指示してください", true);
        }}
      >
        差し戻す
      </button>
      <button className="btn btn-amber" onClick={approve}>
        このブリーフィングを承認して実行
      </button>
    </div>
  );
}
