"use client";

import { useEffect } from "react";
import { getArticle } from "@/lib/api";
import { useStore } from "@/state/store";
import type { ArticleBlock } from "@/data/types";

/** Full-screen reader for a generated piece: meta, 4-agent review, body, sources. */
export function ArticleReader() {
  const { openArticleId, tenant, closeArticle } = useStore();

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

  const kindLabel = a.kind === "sns" ? "SNS草稿" : a.kind === "asset" ? "配布資料" : "記事";

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
