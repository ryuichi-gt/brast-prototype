"use client";

import { Icon } from "@/components/Icon";
import { NAV } from "@/data/product";
import { getTenant } from "@/lib/api";
import { useStore } from "@/state/store";

/** Left rail: brand, tenant switcher, navigation, ops status footer. */
export function LeftRail() {
  const { view, tenant, setView, switchTenant } = useStore();
  const t = getTenant(tenant);

  return (
    <aside className="rail">
      <div className="brand">
        <div className="mark" />
        <div>
          <div className="name">BRAST</div>
          <div className="sub">BRAND STRATEGY OS</div>
        </div>
      </div>

      <button className="tenant" id="tenantbtn" onClick={switchTenant} aria-label="テナントを切り替える">
        <div className="tlabel">TENANT</div>
        <div className="tname">
          {t.name} <Icon id="chev" />
        </div>
        <div style={{ fontSize: 11, color: "var(--t-lo)", marginTop: 1 }}>{t.unit}</div>
        <div className="chips">
          {t.channels.map((c, i) => (
            <span key={c} className={`chip${i === 0 ? " on" : ""}`}>
              {c}
            </span>
          ))}
        </div>
      </button>

      <div className="navlabel">OPERATIONS</div>
      <nav className="nav">
        {NAV.map((n, i) =>
          n.sep ? (
            <div key={`sep-${i}`} className="sep" />
          ) : (
            <button
              key={n.id}
              className={view === n.id ? "active" : ""}
              onClick={() => setView(n.id!)}
              aria-current={view === n.id ? "page" : undefined}
            >
              <Icon id={n.icon!} />
              <span>{n.label}</span>
              {n.badge ? <span className="badge">{n.badge}</span> : null}
            </button>
          ),
        )}
      </nav>

      <div className="railfoot">
        <div className="opsbox">
          <div className="row">
            <span className="live" /> 自走モード：稼働中
          </div>
          <div className="row" style={{ color: "var(--t-lo)" }}>
            <Icon id="spark" />
            &nbsp;次回ブリーフィング：来週月 06:00
          </div>
          <div className="row" style={{ color: "var(--t-lo)" }}>
            Slackに日次レポート送信中
          </div>
        </div>
      </div>
    </aside>
  );
}
