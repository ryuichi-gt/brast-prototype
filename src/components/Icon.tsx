import type { IconId } from "@/data/types";

/** Inline 1.6-stroke icon set, ported from the mockup's `I` map. */
const PATHS: Record<IconId, string> = {
  brief: '<path d="M4 5h16M4 12h16M4 19h10"/>',
  strat: '<path d="M3 17l5-5 4 3 8-9"/><circle cx="20" cy="6" r="0"/>',
  radar: '<circle cx="12" cy="12" r="9"/><path d="M12 12l6-3"/><path d="M12 3v9"/>',
  know: '<path d="M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2z"/><path d="M9 7h6M9 11h6"/>',
  content: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  chan: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.7 7.7 10.5 16M16.3 7.7 13.5 16"/>',
  agent: '<rect x="4" y="8" width="16" height="11" rx="2"/><path d="M12 8V5M9 4h6"/><circle cx="9" cy="13.5" r="1"/><circle cx="15" cy="13.5" r="1"/>',
  rules: '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  results: '<path d="M4 19V5"/><path d="M4 19h16"/><rect x="7" y="11" width="3" height="5"/><rect x="12" y="8" width="3" height="8"/><rect x="17" y="13" width="3" height="3"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  send: '<path d="M4 12l16-7-7 16-2-7z"/>',
  spark: '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
};

export function Icon({ id, className }: { id: IconId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: PATHS[id] }}
    />
  );
}
