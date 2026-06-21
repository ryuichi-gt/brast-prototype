"use client";

import { getChannels } from "@/lib/api";
import { useStore } from "@/state/store";

/** Channels: many media in one place, each role visualized, auto vs manual. */
export function ChannelsView() {
  const { tenant } = useStore();
  const { unitLabel, channels } = getChannels(tenant);

  return (
    <div className="page">
      <div className="pagehead">
        <h1>チャネル</h1>
        <p>
          複数メディアを一元管理し、それぞれの役割を可視化します。自動連携できるチャネルは承認後そのまま配信、できないチャネルは配信指示だけ出します。
        </p>
      </div>
      <div className="sectlabel">Connected Channels — {unitLabel}</div>
      {channels.map((c, i) => (
        <div className="chan" key={i}>
          <div className="ci" style={{ background: `${c.color}1f`, color: c.color }}>
            {c.ic}
          </div>
          <div>
            <div className="cn">
              {c.n}{" "}
              <span className={`statpill ${c.auto ? "auto" : "man"}`} style={{ marginLeft: 6 }}>
                {c.auto ? "自動連携" : "手動投稿"}
              </span>
            </div>
            <div className="role">{c.role}</div>
          </div>
          <div className="cstats">
            <div className="cstat">
              <div className="v">{c.posts}</div>
              <div className="l">頻度</div>
            </div>
            <div className="cstat">
              <div className="v">{c.reach}</div>
              <div className="l">週リーチ</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
