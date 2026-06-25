import type {
  KnowledgeSlideData,
  PlanSlideData,
  ScheduleSlideData,
  SignalsSlideData,
  SlideKey,
  StrategySlideData,
  SummaryData,
} from "@/data/types";
import type { BriefingData } from "@/data/types";
import { useStore } from "@/state/store";

/** Inline rich text: dummy copy contains <b> emphasis from the mockup. */
function Rich({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Lead({ html }: { html: string }) {
  return <p className="lead" dangerouslySetInnerHTML={{ __html: html }} />;
}

function SummarySlide({ d }: { d: SummaryData }) {
  return (
    <>
      <Lead html={d.lead} />
      <div className="kpis">
        {d.kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="v">
              {k.v}
              {k.unit ? <small>{k.unit}</small> : null}
            </div>
            <div className="l">{k.l}</div>
            {k.d ? <div className={`d${k.dTone ? ` ${k.dTone}` : ""}`}>{k.d}</div> : null}
          </div>
        ))}
      </div>
      <div className="tracks">
        {d.tracks.map((tr, i) => (
          <div className={`track ${tr.kind}`} key={i}>
            <div className="tt">
              {tr.title} <span className="tag">{tr.tag}</span>
            </div>
            <p>{tr.body}</p>
            <div className="meta">
              {tr.meta.map((m, j) => (
                <span key={j}>
                  {m.k} <b>{m.v}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function KnowledgeSlide({ d }: { d: KnowledgeSlideData }) {
  return (
    <>
      <Lead html={d.lead} />
      <div className="kgrid">
        {d.cards.map((c, i) => (
          <div className="kcard" key={i}>
            <div className="kh">
              {c.title} <span className={`kst ${c.status}`}>{c.statusLabel}</span>
            </div>
            <ul>
              {c.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function SignalsSlide({ d }: { d: SignalsSlideData }) {
  return (
    <>
      <Lead html={d.lead} />
      <div className="signals">
        {d.signals.map((s, i) => (
          <div className="sig" key={i}>
            <div className="score">
              {s.score}
              <small>RELEV</small>
            </div>
            <div className="body">
              <div className="h">{s.h}</div>
              <div className="src">{s.src}</div>
            </div>
            <div className={`delta${s.hot ? " hot" : ""}`}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="sigfoot">
        <span className="live" />
        <Rich html={d.foot} />
      </div>
    </>
  );
}

function StrategySlide({ d }: { d: StrategySlideData }) {
  return (
    <>
      <Lead html={d.lead} />
      <div className="reason">
        {d.nodes.map((n, i) => (
          <div className={`rnode${n.synth ? " synth" : ""}`} key={i}>
            <div className="who">
              <span className="ag" />
              <div>
                <div className="nm">{n.nm}</div>
                <div className="role">{n.role}</div>
              </div>
            </div>
            <div className="says" dangerouslySetInnerHTML={{ __html: n.says }} />
          </div>
        ))}
      </div>
    </>
  );
}

function PlanSlide({ d }: { d: PlanSlideData }) {
  const { openArticle } = useStore();
  return (
    <>
      <Lead html={d.lead} />
      <div className="pieces">
        {d.pieces.map((p, i) => {
          const clickable = !!p.articleId;
          return (
            <div
              className={`piece${clickable ? " clickable" : ""}`}
              key={i}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onClick={clickable ? () => openArticle(p.articleId!) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") openArticle(p.articleId!);
                    }
                  : undefined
              }
            >
              <div className="pl">
                <div className="pt">
                  {p.title}
                  {clickable ? <span className="readcue">中身を読む ▸</span> : null}
                </div>
                <div className="pm">
                  {p.channels.map((c) => (
                    <span className="ch" key={c}>
                      {c}
                    </span>
                  ))}
                  {p.track ? <span>{p.track}</span> : null}
                </div>
              </div>
              <div className="pr">
                <span className={`scorepill ${p.status}`}>{p.statusLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const DAYS = ["月", "火", "水", "木", "金", "土", "日"];

function ScheduleSlide({ d }: { d: ScheduleSlideData }) {
  return (
    <>
      <Lead html={d.lead} />
      <div className="cal">
        <div className="hd" />
        {DAYS.map((day) => (
          <div className="hd" key={day}>
            {day}
          </div>
        ))}
        {d.rows.map((r, ri) => (
          <Row key={ri} ch={r.ch} auto={r.auto} ev={r.ev} />
        ))}
      </div>
      <div className="callegend">
        <span>
          <i style={{ background: "var(--signal)" }} />
          自動連携（API）
        </span>
        <span>
          <i style={{ background: "var(--amber)" }} />
          手動投稿（指示のみ）
        </span>
      </div>
    </>
  );
}

function Row({ ch, auto, ev }: ScheduleSlideData["rows"][number]) {
  return (
    <>
      <div className="ch">
        <span className={auto ? "auto" : "man"} />
        {ch}
      </div>
      {Array.from({ length: 7 }).map((_, i) => {
        const e = ev[i];
        return (
          <div className="cell" key={i}>
            {e ? <div className={`ev ${e[0]}`}>{e[1]}</div> : null}
          </div>
        );
      })}
    </>
  );
}

/** Render the body for a given slide key from this tenant's briefing data. */
export function SlideBody({ slideKey, slides }: { slideKey: SlideKey; slides: BriefingData["slides"] }) {
  switch (slideKey) {
    case "summary":
      return <SummarySlide d={slides.summary} />;
    case "knowledge":
      return <KnowledgeSlide d={slides.knowledge} />;
    case "trend":
      return <SignalsSlide d={slides.trend} />;
    case "competitor":
      return <SignalsSlide d={slides.competitor} />;
    case "strategy":
      return <StrategySlide d={slides.strategy} />;
    case "plan":
      return <PlanSlide d={slides.plan} />;
    case "schedule":
      return <ScheduleSlide d={slides.schedule} />;
    default:
      return null;
  }
}
