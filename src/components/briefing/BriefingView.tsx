"use client";

import { Deck } from "./Deck";
import { PipeRail } from "./PipeRail";

/** The hero: weekly briefing — vertically stacked deck + thinking-process /
 * AI-chat rail. The approve action lives in the sticky footer (ApproveBar). */
export function BriefingView() {
  return (
    <div className="briefing">
      <Deck />
      <PipeRail />
    </div>
  );
}
