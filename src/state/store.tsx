"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getBriefing, getTenants } from "@/lib/api";
import { routeFeedback, SLIDE_META, traceMessage, traceToStage } from "@/data/product";
import type { PipeNode, ReasoningStageId, SlideKey, TraceKey, ViewId } from "@/data/types";

interface ToastState {
  id: number;
  msg: string;
  amber: boolean;
}

export interface ChatMessage {
  id: number;
  role: "ai" | "you";
  text: string;
  /** AI messages that trace back to a stage offer an inline re-run action. */
  rerun?: boolean;
}

interface Store {
  view: ViewId;
  tenant: number;
  /** Slide whose "fix" was last requested (for the deck's active state). */
  activeSlideFix: SlideKey | null;
  traceKey: TraceKey | null;
  pipeline: PipeNode[];
  messages: ChatMessage[];
  toast: ToastState | null;
  /** Article id currently open in the reader overlay (null = closed). */
  openArticleId: string | null;
  /** Reasoning-graph stage whose detail is expanded (null = none). */
  openStage: ReasoningStageId | null;

  setView: (view: ViewId) => void;
  switchTenant: () => void;
  fixSlide: (slideKey: SlideKey) => void;
  sendChat: (text: string) => void;
  rerun: () => void;
  approve: () => void;
  showToast: (msg: string, amber?: boolean) => void;
  openArticle: (id: string) => void;
  closeArticle: () => void;
  setOpenStage: (stage: ReasoningStageId | null) => void;
}

const StoreContext = createContext<Store | null>(null);

/** Deep-ish copy so approve() can mutate node state without touching dummy data. */
function clonePipeline(tenant: number): PipeNode[] {
  return getBriefing(tenant).pipeline.map((n) => ({ ...n, subs: n.subs ? [...n.subs] : undefined }));
}

function greeting(tenant: number, seq: () => number): ChatMessage {
  const b = getBriefing(tenant);
  return {
    id: seq(),
    role: "ai",
    text: `今週のブリーフィングをまとめました（${b.weekLabel}）。デッキを上から順にご確認ください。直したい結論があれば、ここで部下に指示するように伝えてください。例：「トレンドに◯◯を加えて戦略から作り直して」`,
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const tenantCount = getTenants().length;
  const msgSeq = useRef(0);
  const nextMsgId = useCallback(() => (msgSeq.current += 1), []);

  const [view, setViewRaw] = useState<ViewId>("briefing");
  const [tenant, setTenant] = useState(0);
  const [activeSlideFix, setActiveSlideFix] = useState<SlideKey | null>(null);
  const [traceKey, setTraceKey] = useState<TraceKey | null>(null);
  const [pipeline, setPipeline] = useState<PipeNode[]>(() => clonePipeline(0));
  const [messages, setMessages] = useState<ChatMessage[]>(() => [greeting(0, nextMsgId)]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const [openStage, setOpenStageRaw] = useState<ReasoningStageId | null>("s4");
  const toastSeq = useRef(0);

  const openArticle = useCallback((id: string) => setOpenArticleId(id), []);
  const closeArticle = useCallback(() => setOpenArticleId(null), []);
  const setOpenStage = useCallback((stage: ReasoningStageId | null) => setOpenStageRaw(stage), []);

  const showToast = useCallback((msg: string, amber = false) => {
    toastSeq.current += 1;
    setToast({ id: toastSeq.current, msg, amber });
  }, []);

  const pushMsg = useCallback(
    (role: ChatMessage["role"], text: string, rerunable = false) => {
      setMessages((prev) => [...prev, { id: nextMsgId(), role, text, rerun: rerunable }]);
    },
    [nextMsgId],
  );

  const setView = useCallback((next: ViewId) => {
    setViewRaw(next);
    setTraceKey(null);
  }, []);

  const switchTenant = useCallback(() => {
    setTenant((prev) => {
      const next = (prev + 1) % tenantCount;
      setActiveSlideFix(null);
      setTraceKey(null);
      setOpenArticleId(null);
      setOpenStageRaw(null);
      setPipeline(clonePipeline(next));
      setMessages([greeting(next, nextMsgId)]);
      showToast(`テナントを「${getTenants()[next].name}」に切り替えました`);
      return next;
    });
  }, [tenantCount, showToast, nextMsgId]);

  /** Reply in-thread: trace to a stage, highlight the pipeline, offer re-run. */
  const replyWithTrace = useCallback(
    (key: TraceKey) => {
      setTraceKey(key);
      setOpenStageRaw(traceToStage(key));
      const m = traceMessage(key);
      pushMsg(
        "ai",
        `「${m.title}」の工程まで遡りました。${m.body}。既に承認済みの記事は残したまま進めます。下の「ここから再実行」で実行してください。`,
        true,
      );
    },
    [pushMsg],
  );

  const fixSlide = useCallback(
    (slideKey: SlideKey) => {
      const meta = SLIDE_META.find((s) => s.key === slideKey);
      if (!meta) return;
      setActiveSlideFix(slideKey);
      pushMsg("you", `「${meta.eye}」のスライドを直したい`);
      replyWithTrace(meta.trace);
    },
    [pushMsg, replyWithTrace],
  );

  const sendChat = useCallback(
    (text: string) => {
      const v = text.trim();
      if (!v) return;
      pushMsg("you", v);
      replyWithTrace(routeFeedback(v));
    },
    [pushMsg, replyWithTrace],
  );

  const rerun = useCallback(() => {
    setTraceKey(null);
    setActiveSlideFix(null);
    pushMsg("ai", "該当工程から下流を再実行しました。新しい案をデッキに反映しています。承認いただければ今週分の配信に進みます。");
  }, [pushMsg]);

  const approve = useCallback(() => {
    setPipeline((prev) =>
      prev.map((n) => {
        if (n.key === "you") return { ...n, state: "done", meta: "承認済み" };
        if (n.key === "dist") return { ...n, state: "done", meta: "配信を起動" };
        return n;
      }),
    );
    setTraceKey(null);
    setActiveSlideFix(null);
    pushMsg("ai", "承認ありがとうございます。今週分のコンテンツを各チャネルへ自動で配信します。手動チャネルには配信指示を出しました。");
  }, [pushMsg]);

  const value = useMemo<Store>(
    () => ({
      view,
      tenant,
      activeSlideFix,
      traceKey,
      pipeline,
      messages,
      toast,
      openArticleId,
      openStage,
      setView,
      switchTenant,
      fixSlide,
      sendChat,
      rerun,
      approve,
      showToast,
      openArticle,
      closeArticle,
      setOpenStage,
    }),
    [
      view,
      tenant,
      activeSlideFix,
      traceKey,
      pipeline,
      messages,
      toast,
      openArticleId,
      openStage,
      setView,
      switchTenant,
      fixSlide,
      sendChat,
      rerun,
      approve,
      showToast,
      openArticle,
      closeArticle,
      setOpenStage,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
