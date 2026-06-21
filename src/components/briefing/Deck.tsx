"use client";

import { Icon } from "@/components/Icon";
import { SLIDE_META } from "@/data/product";
import { getBriefing } from "@/lib/api";
import { useStore } from "@/state/store";
import { SlideBody } from "./slides";

/** The warm paper presentation deck: 7 slides + flag-to-rework + slide rail. */
export function Deck() {
  const { tenant, slide, flagged, goSlide, toggleFlag } = useStore();
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

      <div className="deck">
        {SLIDE_META.map((s, i) => (
          <div className={`slide${i === slide ? " show" : ""}`} key={s.key} data-slide={i}>
            <div className="flagwrap">
              <button
                className={`flagbtn${flagged[s.key] ? " flagged" : ""}`}
                onClick={() => toggleFlag(s.key, s.trace)}
              >
                {flagged[s.key] ? "差し戻し中" : "このスライドを直す"}
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

      <div className="deckrail">
        <button className="navarrow" aria-label="前へ" onClick={() => goSlide(slide - 1)}>
          <Icon id="left" />
        </button>
        <div className="dots">
          {SLIDE_META.map((s, i) => (
            <div
              key={s.key}
              className={`dotseg${i < slide ? " done" : ""}${i === slide ? " active" : ""}`}
              onClick={() => goSlide(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goSlide(i);
              }}
            >
              <div className="bar" />
              <div className="lab">{s.eye}</div>
            </div>
          ))}
        </div>
        <button className="navarrow" aria-label="次へ" onClick={() => goSlide(slide + 1)}>
          <Icon id="right" />
        </button>
      </div>
    </div>
  );
}
