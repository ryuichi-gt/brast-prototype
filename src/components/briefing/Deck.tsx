"use client";

import { SLIDE_META } from "@/data/product";
import { getBriefing } from "@/lib/api";
import { useStore } from "@/state/store";
import { SlideBody } from "./slides";
import { ReasoningGraph } from "./ReasoningGraph";
import type { ReasoningStageId, SlideKey } from "@/data/types";

/** Which reasoning stage a slide's claim drills down to. */
const SLIDE_TO_STAGE: Record<SlideKey, ReasoningStageId> = {
  summary: "s4",
  knowledge: "s1",
  trend: "s1",
  competitor: "s2",
  strategy: "s4",
  plan: "s6",
  schedule: "s6",
};

/** The warm paper deck. All 7 slides stacked vertically (single-scroll). */
export function Deck() {
  const { tenant, activeSlideFix, fixSlide, setOpenStage } = useStore();
  const briefing = getBriefing(tenant);

  const traceTo = (key: SlideKey) => {
    setOpenStage(SLIDE_TO_STAGE[key]);
    document.getElementById("rgraph")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="deckwrap">
      <div className="deckhead">
        <h1>
          週次ブリーフィング{" "}
          <span className="jp" style={{ color: "var(--t-md)", fontWeight: 500, fontSize: 14 }}>
            — {briefing.weekLabel}
          </span>
        </h1>
        <span className="aitag">
          <span className="dot" />
          {briefing.deckSubtitle}
        </span>
      </div>

      <ReasoningGraph />

      <div className="deck stacked">
        {SLIDE_META.map((s, i) => (
          <div className="slide" key={s.key} data-slide={i}>
            <div className="flagwrap">
              <button
                className={`flagbtn${activeSlideFix === s.key ? " flagged" : ""}`}
                onClick={() => fixSlide(s.key)}
              >
                {activeSlideFix === s.key ? "差し戻し中" : "このスライドを直す"}
              </button>
            </div>
            <div className="skicker">
              <span className="snum mono">
                {String(i + 1).padStart(2, "0")} / {String(SLIDE_META.length).padStart(2, "0")}
              </span>
              <span className="seye">{s.eye}</span>
            </div>
            <h2>{briefing.titles[s.key]}</h2>
            <SlideBody slideKey={s.key} slides={briefing.slides} />
            <button className="tracebtn" onClick={() => traceTo(s.key)}>
              推論グラフで根拠を辿る ▸
            </button>
            <div className="own">
              作成: <b>{s.owner}</b> エージェント
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
