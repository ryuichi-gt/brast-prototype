"use client";

import { useEffect, useRef, useState } from "react";
import { getArticle, getBrandRules, getReasoning } from "@/lib/api";
import { routeContentEdit } from "@/lib/contentEdit";
import { useStore } from "@/state/store";
import type { ArticleBlock } from "@/data/types";

interface EMsg {
  role: "ai" | "you";
  text: string;
}

/**
 * Content detail + inline edit chat (M7). Read the piece, see its score and
 * 4-agent review, trace back to the source StrategyBet, and instruct edits in
 * place. Instructions that violate a brand guardrail get pushed back (S5).
 */
export function ArticleReader() {
  const { openArticleId, tenant, closeArticle, setView, setOpenStage } = useStore();
  const [emsgs, setEmsgs] = useState<EMsg[]>([]);
  const [pending, setPending] = useState<{ category: string; text: string } | null>(null);
  const [etext, setEtext] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  // reset edit chat when switching article
  useEffect(() => {
    setEmsgs([]);
    setPending(null);
    setEtext("");
  }, [openArticleId]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [emsgs]);

  useEffect(() => {
    if (!openArticleId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArticle();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openArticleId, closeArticle]);

  if (!openArticleId) return null;
  const a = getArticle(tenant, openArticleId);
  if (!a) return null;

  const guardrails = getBrandRules(tenant)?.guardrails ?? [];
  const bet = a.fromBetId ? getReasoning(tenant).bets.find((b) => b.id === a.fromBetId) : null;
  const kindLabel = a.kind === "sns" ? "SNS草稿" : a.kind === "asset" ? "配布資料" : "記事";

  const submitEdit = () => {
    const v = etext.trim();
    if (!v) return;
    const route = routeContentEdit(v, guardrails);
    setEtext("");
    setEmsgs((m) => [...m, { role: "you", text: v }]);
    if (route.violation) {
      setPending(route.violation);
      setEmsgs((m) => [
        ...m,
        { role: "ai", text: `⚠️ ブランド運用ルール「${route.violation!.category}」に反します：${route.violation!.text} それでも実行しますか？` },
      ]);
    } else {
      setEmsgs((m) => [
        ...m,
        { role: "ai", text: `「${route.node}」に差し戻し、下流（画像・レビュー・スコア）を再実行します。承認済みの記事は残します。` },
      ]);
    }
  };

  const resolvePushback = (proceed: boolean) => {
    setEmsgs((m) => [
      ...m,
      {
        role: "ai",
        text: proceed
          ? "確認の上で実行します。コンテンツ生成に差し戻し、画像・レビュー・スコアを再実行します。"
          : "指示を取り消しました。ブランド運用ルールを維持します。",
      },
    ]);
    setPending(null);
  };

  const traceToBet = () => {
    closeArticle();
    setView("briefing");
    setOpenStage("s4");
  };

  return (
    <div className="reader-backdrop" onClick={closeArticle}>
      <div className="reader" role="dialog" aria-modal="true" aria-label={a.title} onClick={(e) => e.stopPropagation()}>
        <div className="reader-top">
          <span className="seye">{kindLabel}{a.track ? ` · ${a.track}` : ""}</span>
          <button className="reader-x" aria-label="閉じる" onClick={closeArticle}>
            ✕
          </button>
        </div>

        <div className="reader-body">
          <div className="art-channels">
            {a.channels.map((c) => (
              <span className="ch" key={c}>
                {c}
              </span>
            ))}
            <span className={`scorepill ${a.status}`}>
              {a.score} {a.status === "pass" ? "通過" : "要確認"}
            </span>
          </div>

          <h1 className="art-title">{a.title}</h1>
          {a.dek ? <p className="art-dek">{a.dek}</p> : null}

          {bet ? (
            <div className="art-bet">
              <span className="art-bet-l">生成元の戦略ベット（S4）</span>
              <span className="art-bet-t">{bet.thesis}</span>
              <button className="art-bet-link" onClick={traceToBet}>
                推論グラフで根拠を辿る ▸
              </button>
            </div>
          ) : null}

          {a.keyVisual ? (
            <div className="art-kv">
              <span className="art-kv-tag">KEY VISUAL（Visualエージェント生成）</span>
              <span className="art-kv-cap">{a.keyVisual}</span>
            </div>
          ) : null}

          <div className="art-review">
            <div className="art-review-h">多段レビュー結果 — 4体の審査エージェント</div>
            <div className="art-review-grid">
              {a.reviews.map((r) => (
                <div className="art-rev" key={r.label}>
                  <div className="art-rev-top">
                    <span className="art-rev-l">{r.label}</span>
                    <span className={`art-rev-s${r.score < 90 ? " low" : ""}`}>{r.score}</span>
                  </div>
                  <div className="art-rev-n">{r.note}</div>
                </div>
              ))}
            </div>
          </div>

          <article className="art-content">
            {a.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </article>

          {a.sources && a.sources.length > 0 ? (
            <div className="art-sources">
              <div className="art-sources-h">根拠ソース（トレンド調査エージェントが参照）</div>
              <ul>
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* inline edit chat + brand pushback */}
          <div className="art-edit">
            <div className="art-edit-h">この記事を修正 — 見ている場所で指示する</div>
            {emsgs.length > 0 ? (
              <div className="art-edit-log" ref={logRef}>
                {emsgs.map((m, i) => (
                  <div className={`msg ${m.role}`} key={i}>
                    {m.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="art-edit-hint">
                例：「導入事例の数値に出典を足して」「もっと専門的なトーンに」。ブランド運用ルールに反する指示は押し返します。
              </div>
            )}
            {pending ? (
              <div className="art-edit-confirm">
                <button className="btn btn-amber" onClick={() => resolvePushback(true)}>
                  それでも実行する
                </button>
                <button className="btn btn-ghost" onClick={() => resolvePushback(false)}>
                  取り消す
                </button>
              </div>
            ) : (
              <div className="dockin">
                <input
                  placeholder="例：トーンをやわらかく / 出典を足して"
                  value={etext}
                  onChange={(e) => setEtext(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitEdit();
                  }}
                />
                <button className="send" aria-label="送信" onClick={submitEdit}>
                  ▸
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ul":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
          ))}
        </ul>
      );
    case "quote":
      return <blockquote dangerouslySetInnerHTML={{ __html: block.html }} />;
    default:
      return null;
  }
}
