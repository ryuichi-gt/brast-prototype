"use client";

import { getContent } from "@/lib/api";
import { useStore } from "@/state/store";
import type { ContentItem } from "@/data/types";

/** Content: upcoming / published. On strategy change, old vs new is offered. */
export function ContentView() {
  const { tenant, showToast } = useStore();
  const { upcoming, published, versionCompare } = getContent(tenant);

  return (
    <div className="page">
      <div className="pagehead">
        <h1>コンテンツ</h1>
        <p>
          これから配信される予定のもの／すでに配信したものが一覧で溜まります。戦略が変わった記事は、骨子を残したまま旧版と新版を並べて提示するので、どちらを出すかはあなたが選べます。
        </p>
      </div>
      <div className="content-cols">
        <div>
          <div className="col-h">
            <div className="ct">
              <span className="statpill auto">配信予定</span> これから出るもの
            </div>
            <div className="cn">{upcoming.length}件</div>
          </div>
          {upcoming.map((it, i) => (
            <CItem item={it} key={i} />
          ))}
        </div>
        <div>
          <div className="col-h">
            <div className="ct">
              <span className="statpill live">配信済み</span> もう出たもの
            </div>
            <div className="cn">直近</div>
          </div>
          {published.map((it, i) => (
            <CItem item={it} key={i} />
          ))}

          <div className="citem">
            <div className="cih">
              <div className="cit">{versionCompare.title}</div>
            </div>
            <div className="cim">
              {versionCompare.channels.map((c) => (
                <span className="ch" key={c}>
                  {c}
                </span>
              ))}
              <span>{versionCompare.note}</span>
            </div>
            <div className="versions">
              <div className="ver">
                <div className="vh">
                  <span>{versionCompare.old.label}</span>
                  <span>{versionCompare.old.ver}</span>
                </div>
                <p>{versionCompare.old.body}</p>
                <button className="pick" onClick={() => showToast("旧版を採用しました")}>
                  旧版を残す
                </button>
              </div>
              <div className="ver new">
                <div className="vh">
                  <span>{versionCompare.next.label}</span>
                  <span>{versionCompare.next.ver}</span>
                </div>
                <p>{versionCompare.next.body}</p>
                <button className="pick" onClick={() => showToast("新版を採用しました")}>
                  新版を採用
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CItem({ item }: { item: ContentItem }) {
  const { openArticle } = useStore();
  const clickable = !!item.articleId;
  return (
    <div
      className={`citem${clickable ? " clickable" : ""}`}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? () => openArticle(item.articleId!) : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") openArticle(item.articleId!);
            }
          : undefined
      }
    >
      <div className="cih">
        <div className="cit">
          {item.title}
          {clickable ? <span className="readcue">中身を読む ▸</span> : null}
        </div>
        {item.badge === "hot" ? (
          <span className="statpill auto">主力</span>
        ) : item.badge === "review" ? (
          <span className="statpill man">要確認</span>
        ) : null}
      </div>
      <div className="cim">
        {item.channels.map((c) => (
          <span className="ch" key={c}>
            {c}
          </span>
        ))}
        <span>{item.meta}</span>
      </div>
    </div>
  );
}
