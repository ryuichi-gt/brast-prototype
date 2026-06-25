"use client";

import { SLIDE_META } from "@/data/product";
import { getBriefing } from "@/lib/api";
import { useStore } from "@/state/store";
import { SlideBody } from "./slides";

/** The warm paper deck. All 7 slides stacked vertically (single-scroll). */
export function Deck() {
  const { tenant, activeSlideFix, fixSlide } = useStore();
  const briefing = getBriefing(tenant);

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
            <div className="own">
              作成: <b>{s.owner}</b> エージェント
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
