/**
 * Content edit-chat routing + brand pushback (M7, strategy-logic.md S5).
 *
 * An instruction either (a) violates a brand guardrail — in which case BRAST
 * pushes back ("rule X forbids this — proceed anyway?") — or (b) routes to the
 * origin stage (content generation, or a specific reviewer) for a downstream
 * re-run. Deterministic/keyword-based for the prototype; Phase 2 uses the real
 * conformance gate.
 */
import type { Guardrail } from "@/data/types";

export interface EditRoute {
  violation?: { category: string; text: string };
  node: string;
}

const TRIGGERS: { re: RegExp; category: string }[] = [
  { re: /最強|絶対|必ず治|完全に治|no\.?\s?1|ナンバーワン|業界一|日本一/i, category: "薬機法・景表法" },
  { re: /(競合|他社|ライバル|[A-Za-z]社).{0,10}(劣|ダメ|負け|批判|より悪|下回|遅れ)/, category: "主張の制約" },
  { re: /煽[っら]|不安をあお|怖がら|恐怖をあお|危機感をあお/, category: "レピュテーション" },
];

export function routeContentEdit(text: string, guardrails: Guardrail[]): EditRoute {
  for (const t of TRIGGERS) {
    if (t.re.test(text)) {
      const g = guardrails.find((x) => x.kind === "forbidden" && x.category === t.category);
      if (g) return { violation: { category: g.category, text: g.text }, node: "コンテンツ生成" };
    }
  }
  let node = "コンテンツ生成";
  if (/法務|景表|薬機|表現|広告/.test(text)) node = "法務・景表法レビュー";
  else if (/トーン|印象|やわらか|硬|口調/.test(text)) node = "レピュテーションレビュー";
  else if (/専門|根拠|出典|事実|正確|データ/.test(text)) node = "IR・専門レビュー";
  return { node };
}
