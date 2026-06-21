import type { Config } from "tailwindcss";

/**
 * Tailwind is available for layout utilities, but the BRAST design system
 * lives in `src/app/globals.css` as CSS custom properties (design tokens)
 * faithfully ported from the reviewed mockup. Color tokens are surfaced here
 * so utilities like `text-signal` / `bg-amber` map onto the same variables.
 *
 * Color semantics (do not break):
 *   signal (teal) = the AI's autonomous / live work
 *   amber         = where the human's decision is required
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        signal: "var(--signal)",
        amber: "var(--amber)",
        rose: "var(--rose)",
        ok: "var(--ok)",
      },
      fontFamily: {
        disp: "var(--disp)",
        jp: "var(--jp)",
        mono: "var(--mono)",
      },
    },
  },
  plugins: [],
};

export default config;
