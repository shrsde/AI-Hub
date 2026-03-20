"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type SearchResult = {
  answer: string;
  page: string;
  path: string;
  section: string;
  followUp: string;
};

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResult(null);
    setLoading(false);
  }, []);

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, close]);

  // Custom event from nav search button
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-search", handler);
    return () => window.removeEventListener("open-search", handler);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        answer: "Something went wrong. Please try again.",
        page: "",
        path: "/",
        section: "",
        followUp: "",
      });
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bento-cell max-w-lg w-full mx-4 shadow-2xl border border-border2 p-0 overflow-hidden"
      >
        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex items-center border-b border-border px-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-muted shrink-0"
          >
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about Claude Code..."
            className="flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block text-[10px] text-muted bg-surface2 border border-border px-1.5 py-0.5 rounded font-mono">
              ESC
            </kbd>
            <button
              type="button"
              onClick={close}
              className="text-muted hover:text-foreground cursor-pointer p-1"
            >
              ✕
            </button>
          </div>
        </form>

        {/* Results area */}
        <div className="p-4 max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-3 bg-surface2 rounded w-full" />
              <div className="h-3 bg-surface2 rounded w-4/5" />
              <div className="h-3 bg-surface2 rounded w-3/5" />
              <div className="h-10 bg-surface2 rounded w-full mt-4" />
            </div>
          )}

          {!loading && !result && (
            <p className="text-sm text-muted text-center py-6">
              Press Enter to search — or try &ldquo;how do I install Claude?&rdquo;
            </p>
          )}

          {!loading && result && (
            <div className="space-y-4">
              {/* Answer */}
              <p className="text-sm text-foreground leading-relaxed">
                {result.answer}
              </p>

              {/* Page link */}
              {result.path && result.page && (
                <Link
                  href={result.path}
                  onClick={close}
                  className="block gradient-blue bento-cell card-lift !p-3 border border-border"
                >
                  <p className="text-xs text-muted mb-0.5">{result.section}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {result.page} &rarr;
                  </p>
                </Link>
              )}

              {/* Follow-up */}
              {result.followUp && (
                <button
                  onClick={() => {
                    setQuery(result.followUp);
                    search(result.followUp);
                  }}
                  className="w-full text-left text-xs text-secondary bg-surface2 rounded-xl px-3 py-2 hover:bg-surface border border-border transition-colors cursor-pointer"
                >
                  Follow-up: {result.followUp}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
