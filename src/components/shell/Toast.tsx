"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/state/store";

/** Transient confirmation toast. Mirrors the mockup's bottom-center toast. */
export function Toast() {
  const { toast } = useStore();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setShown(true);
    const t = setTimeout(() => setShown(false), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className={`toast${toast?.amber ? " amber" : ""}${shown ? " show" : ""}`} role="status" aria-live="polite">
      <span className="ti">{toast?.amber ? "!" : "✓"}</span>
      <span>{toast?.msg ?? ""}</span>
    </div>
  );
}
