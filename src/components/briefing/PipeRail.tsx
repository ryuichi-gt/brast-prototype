"use client";

import { ChatPanel } from "./ChatPanel";

/**
 * Right rail = the AI chat (operation surface). The strategy "process" now
 * lives in the reasoning graph at the top of the deck (M6), so this rail is
 * dedicated to instructing your AI subordinate.
 */
export function PipeRail() {
  return (
    <div className="pipe">
      <ChatPanel />
    </div>
  );
}
