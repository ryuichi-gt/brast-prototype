"use client";

import { StoreProvider, useStore } from "@/state/store";
import { LeftRail } from "./LeftRail";
import { TopBar } from "./TopBar";
import { Toast } from "./Toast";
import { ApproveBar } from "./ApproveBar";
import { ArticleReader } from "@/components/ArticleReader";
import { BriefingView } from "@/components/briefing/BriefingView";
import { BrandRulesView } from "@/components/views/BrandRulesView";
import { StrategyArchiveView } from "@/components/views/StrategyArchiveView";
import { TrendsView } from "@/components/views/TrendsView";
import { KnowledgeView } from "@/components/views/KnowledgeView";
import { ContentView } from "@/components/views/ContentView";
import { ChannelsView } from "@/components/views/ChannelsView";
import { AgentsView } from "@/components/views/AgentsView";

function CurrentView() {
  const { view } = useStore();
  switch (view) {
    case "briefing":
      return <BriefingView />;
    case "rules":
      return <BrandRulesView />;
    case "results":
      return (
        <div className="page">
          <div className="pagehead">
            <h1>実行・結果</h1>
            <p>配信の進行状況と実行済み戦略の結果（リーチ／CV／期待値到達）。M8 で実装します。</p>
          </div>
        </div>
      );
    case "strategy":
      return <StrategyArchiveView />;
    case "trends":
      return <TrendsView />;
    case "knowledge":
      return <KnowledgeView />;
    case "content":
      return <ContentView />;
    case "channels":
      return <ChannelsView />;
    case "agents":
      return <AgentsView />;
    default:
      return null;
  }
}

function Shell() {
  const { view } = useStore();
  return (
    <>
      <div className="app">
        <LeftRail />
        <main className="main">
          <TopBar />
          <div className="scroll">
            <CurrentView />
          </div>
          {view === "briefing" ? <ApproveBar /> : null}
        </main>
      </div>
      <ArticleReader />
      <Toast />
    </>
  );
}

export function AppShell() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
