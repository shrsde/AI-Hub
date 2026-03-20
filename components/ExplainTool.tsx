"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type State = "idle" | "active" | "loading" | "showing";

export function ExplainTool() {
  const [state, setState] = useState<State>("idle");
  const [selectedText, setSelectedText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  // Toggle explain mode
  const activate = () => {
    if (state === "idle") {
      setState("active");
      document.body.classList.add("explain-mode");
    } else {
      dismiss();
    }
  };

  const dismiss = useCallback(() => {
    setState("idle");
    setSelectedText("");
    setExplanation("");
    document.body.classList.remove("explain-mode");
  }, []);

  // Lock body scroll is not needed — explain mode just changes cursor

  // Escape to dismiss
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dismiss]);

  // Click outside popover to dismiss
  useEffect(() => {
    if (state !== "showing") return;
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        dismiss();
      }
    };
    // Delay to avoid the same click that triggered showing
    const timer = setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClick);
    };
  }, [state, dismiss]);

  // Text detection on mouseup when active
  useEffect(() => {
    if (state !== "active") return;

    const handleMouseUp = async (e: MouseEvent) => {
      let text = "";
      const selection = window.getSelection();

      if (selection && selection.toString().trim()) {
        text = selection.toString().trim();
      } else {
        // Try to get word under cursor
        if (document.caretRangeFromPoint) {
          const range = document.caretRangeFromPoint(e.clientX, e.clientY);
          if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
            const textContent = range.startContainer.textContent || "";
            const offset = range.startOffset;
            let start = offset;
            let end = offset;
            while (start > 0 && /\w/.test(textContent[start - 1])) start--;
            while (end < textContent.length && /\w/.test(textContent[end])) end++;
            if (end > start) {
              text = textContent.slice(start, end);
            }
          }
        }
      }

      if (!text) return;

      setSelectedText(text.slice(0, 200));
      setPopoverPos({
        top: Math.min(e.clientY + 16, window.innerHeight - 220),
        left: Math.min(Math.max(e.clientX - 140, 12), window.innerWidth - 320),
      });
      setState("loading");
      document.body.classList.remove("explain-mode");

      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: text.slice(0, 200),
            pageContext: document.title,
          }),
        });
        const data = await res.json();
        setExplanation(data.explanation || "No explanation available.");
      } catch {
        setExplanation("Something went wrong. Please try again.");
      }
      setState("showing");
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [state]);

  return (
    <>
      {/* Floating ? button */}
      <button
        onClick={activate}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-all hover:scale-105 cursor-pointer ${
          state === "active"
            ? "bg-foreground text-white ring-2 ring-primary ring-offset-2"
            : "gradient-purple border border-[rgba(139,70,220,0.3)] text-foreground"
        }`}
        title={state === "active" ? "Cancel explain mode" : "Explain anything on this page"}
      >
        {state === "active" ? "✕" : "?"}
      </button>

      {/* Tooltip when active */}
      {state === "active" && (
        <div className="fixed bottom-20 right-6 z-40 bento-cell gradient-purple py-2 px-4 text-xs text-foreground shadow-lg max-w-[200px] text-center">
          Click any word or highlight a phrase
        </div>
      )}

      {/* Popover */}
      {(state === "loading" || state === "showing") && (
        <div
          ref={popoverRef}
          className="fixed z-50 w-[300px] bento-cell shadow-xl border border-border2 p-4"
          style={{ top: popoverPos.top, left: popoverPos.left }}
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold text-foreground leading-snug pr-4">
              &ldquo;{selectedText.slice(0, 60)}
              {selectedText.length > 60 ? "…" : ""}&rdquo;
            </p>
            <button
              onClick={dismiss}
              className="text-muted hover:text-foreground text-sm shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {state === "loading" ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-surface2 rounded w-full" />
              <div className="h-3 bg-surface2 rounded w-4/5" />
              <div className="h-3 bg-surface2 rounded w-3/5" />
            </div>
          ) : (
            <p className="text-[13px] text-muted leading-relaxed">
              {explanation}
            </p>
          )}
        </div>
      )}
    </>
  );
}
