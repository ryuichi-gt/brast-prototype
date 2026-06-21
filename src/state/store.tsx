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
import { routeFeedback, SLIDE_META } from "@/data/product";
import { traceMessage as buildTraceMessage } from "@/data/product";
import type { PipeNode, TraceKey, ViewId } from "@/data/types";

interface ToastState {
  id: number;
  msg: string;
  amber: boolean;
}

interface Store {
  view: ViewId;
  tenant: number;
  slide: number;
  flagged: Record<string, boolean>;
  traceKey: TraceKey | null;
  pipeline: PipeNode[];
  toast: ToastState | null;

  setView: (view: ViewId) => void;
  switchTenant: () => void;
  goSlide: (i: number) => void;
  toggleFlag: (slideKey: string, trace: TraceKey) => void;
  setTrace: (key: TraceKey) => void;
  sendFeedback: (text: string) => void;
  approve: () => void;
  rerun: () => void;
  showToast: (msg: string, amber?: boolean) => void;
}

const StoreContext = createContext<Store | null>(null);

/** Deep-ish copy so approve() can mutate node state without touching dummy data. */
function clonePipeline(tenant: number): PipeNode[] {
  return getBriefing(tenant).pipeline.map((n) => ({ ...n, subs: n.subs ? [...n.subs] : undefined }));
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const tenantCount = getTenants().length;
  const [view, setViewRaw] = useState<ViewId>("briefing");
  const [tenant, setTenant] = useState(0);
  const [slide, setSlide] = useState(0);
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [traceKey, setTraceKey] = useState<TraceKey | null>(null);
  const [pipeline, setPipeline] = useState<PipeNode[]>(() => clonePipeline(0));
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastSeq = useRef(0);

  const showToast = useCallback((msg: string, amber = false) => {
    toastSeq.current += 1;
    setToast({ id: toastSeq.current, msg, amber });
  }, []);

  const setView = useCallback((next: ViewId) => {
    setViewRaw(next);
    setTraceKey(null);
  }, []);

  const switchTenant = useCallback(() => {
    setTenant((prev) => {
      const next = (prev + 1) % tenantCount;
      setSlide(0);
      setFlagged({});
      setTraceKey(null);
      setPipeline(clonePipeline(next));
      const name = getTenants()[next].name;
      showToast(`テナントを「${name}」に切り替えました`);
      return next;
    });
  }, [tenantCount, showToast]);

  const slideCount = SLIDE_META.length;
  const goSlide = useCallback(
    (i: number) => setSlide(Math.max(0, Math.min(slideCount - 1, i))),
    [slideCount],
  );

  const toggleFlag = useCallback(
    (slideKey: string, trace: TraceKey) => {
      setFlagged((prev) => {
        const nextOn = !prev[slideKey];
        setTraceKey(nextOn ? trace : null);
        if (nextOn) {
          const eye = SLIDE_META.find((s) => s.key === slideKey)?.eye ?? "";
          showToast(`「${eye}」を差し戻し。原因の工程を表示しました`, true);
        }
        return { ...prev, [slideKey]: nextOn };
      });
    },
    [showToast],
  );

  const setTrace = useCallback(
    (key: TraceKey) => {
      setTraceKey(key);
      showToast("指示を受け付けました。該当工程まで遡ります", true);
    },
    [showToast],
  );

  const sendFeedback = useCallback(
    (text: string) => {
      const key = routeFeedback(text);
      setTraceKey(key);
      showToast("フィードバックを受け付け、原因工程まで遡りました", true);
    },
    [showToast],
  );

  const approve = useCallback(() => {
    setPipeline((prev) =>
      prev.map((n) => {
        if (n.key === "you") return { ...n, state: "done", meta: "承認済み" };
        if (n.key === "dist") return { ...n, state: "done", meta: "配信を起動" };
        return n;
      }),
    );
    setTraceKey(null);
    showToast("承認しました。今週分の配信を自動で実行します");
  }, [showToast]);

  const rerun = useCallback(() => {
    setTraceKey(null);
    setFlagged({});
    showToast("該当工程から下流を再実行しました。新しい案をプレゼンに反映します");
  }, [showToast]);

  const value = useMemo<Store>(
    () => ({
      view,
      tenant,
      slide,
      flagged,
      traceKey,
      pipeline,
      toast,
      setView,
      switchTenant,
      goSlide,
      toggleFlag,
      setTrace,
      sendFeedback,
      approve,
      rerun,
      showToast,
    }),
    [
      view,
      tenant,
      slide,
      flagged,
      traceKey,
      pipeline,
      toast,
      setView,
      switchTenant,
      goSlide,
      toggleFlag,
      setTrace,
      sendFeedback,
      approve,
      rerun,
      showToast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export { buildTraceMessage };
