"use client";

import { StoreProvider, useStore } from "@/state/store";
import { LeftRail } from "./LeftRail";
import { TopBar } from "./TopBar";
import { Toast } from "./Toast";
import { BriefingView } from "@/components/briefing/BriefingView";
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
  return (
    <>
      <div className="app">
        <LeftRail />
        <main className="main">
          <TopBar />
          <div className="scroll">
            <CurrentView />
          </div>
        </main>
      </div>
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
