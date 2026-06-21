"use client";

import { useEffect } from "react";
import { useStore } from "@/state/store";
import { Deck } from "./Deck";
import { PipeRail } from "./PipeRail";

/** The hero: weekly briefing — paper deck + thinking-process rail + dock. */
export function BriefingView() {
  const { slide, goSlide } = useStore();

  // Keyboard slide navigation (ignored while typing in an input).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "ArrowRight") goSlide(slide + 1);
      if (e.key === "ArrowLeft") goSlide(slide - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [slide, goSlide]);

  return (
    <div className="briefing">
      <Deck />
      <PipeRail />
    </div>
  );
}
