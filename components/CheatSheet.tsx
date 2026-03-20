"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Command = {
  cmd: string;
  desc: string;
  tool: "claude" | "cursor" | "both";
};

const commands: Command[] = [
  // ── Getting started ──
  { cmd: "claude", desc: "Start a Claude Code session in the current folder", tool: "claude" },
  { cmd: "claude --model opus", desc: "Start with a specific model (Opus, Sonnet, Haiku)", tool: "claude" },
  { cmd: "claude --version", desc: "Check which version of Claude Code is installed", tool: "claude" },
  { cmd: "npm install -g @anthropic-ai/claude-code", desc: "Install or update Claude Code globally", tool: "claude" },

  // ── Modes ──
  { cmd: "/plan", desc: "Enter plan mode — Claude thinks and plans but won't write code", tool: "claude" },
  { cmd: "/model", desc: "Switch between Claude models mid-session", tool: "claude" },
  { cmd: "/compact", desc: "Summarize the conversation to save context space", tool: "claude" },
  { cmd: "/clear", desc: "Reset the conversation context and start fresh", tool: "claude" },
  { cmd: "/review", desc: "Ask Claude to review your recent changes or a specific file", tool: "claude" },
  { cmd: "/commit", desc: "Generate a commit message and commit staged changes", tool: "claude" },

  // ── Info & discovery ──
  { cmd: "/help", desc: "Show all available slash commands", tool: "claude" },
  { cmd: "/skills", desc: "List all loaded skills in the current session", tool: "claude" },
  { cmd: "/tools", desc: "List all tools and MCP servers available", tool: "claude" },
  { cmd: "/config", desc: "View or edit Claude Code settings", tool: "claude" },
  { cmd: "/cost", desc: "Show token usage and cost for the current session", tool: "claude" },
  { cmd: "/status", desc: "Show the current model, context usage, and session info", tool: "claude" },

  // ── Session control ──
  { cmd: "/resume", desc: "Resume the most recent conversation from where you left off", tool: "claude" },
  { cmd: "/undo", desc: "Undo the last file change Claude made", tool: "claude" },
  { cmd: "/diff", desc: "Show a diff of all changes Claude has made this session", tool: "claude" },

  // ── Keyboard shortcuts ──
  { cmd: "Escape", desc: "Cancel the current generation mid-response", tool: "both" },
  { cmd: "Ctrl + R", desc: "Retry the last prompt with the same input", tool: "claude" },
  { cmd: "Up arrow", desc: "Cycle through your previous prompts", tool: "claude" },
  { cmd: "Tab", desc: "Accept Claude's suggested edit or completion", tool: "claude" },

  // ── Cursor shortcuts ──
  { cmd: "Cmd + Shift + X", desc: "Open the Extensions panel to install Claude Code", tool: "cursor" },
  { cmd: "Cmd + I", desc: "Open the inline AI chat panel", tool: "cursor" },
  { cmd: "Cmd + K", desc: "Open the AI command bar for quick edits", tool: "cursor" },
  { cmd: "Cmd + L", desc: "Open the full AI sidebar chat", tool: "cursor" },
  { cmd: "Cmd + Shift + P", desc: "Open the command palette for any action", tool: "cursor" },
  { cmd: "Cmd + Shift + L", desc: "Add current selection to AI chat as context", tool: "cursor" },
  { cmd: "Cmd + .", desc: "Toggle AI suggestions on or off", tool: "cursor" },
];

const filters = [
  { id: "all", label: "All" },
  { id: "claude", label: "Claude Code" },
  { id: "cursor", label: "Cursor" },
] as const;

export function CheatSheet() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "claude" | "cursor">("all");
  const [copied, setCopied] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setFilter("all");
  }, []);

  // Listen for global open event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cheatsheet", handler);
    return () => window.removeEventListener("open-cheatsheet", handler);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, close]);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = filter === "all"
    ? commands
    : commands.filter((c) => c.tool === filter || c.tool === "both");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

      <div
        ref={modalRef}
        className="relative bento-cell max-w-xl w-full mx-4 shadow-2xl border border-border2 p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Command Cheat Sheet</h2>
            <p className="text-[11px] text-muted mt-0.5">Click any command to copy</p>
          </div>
          <button
            onClick={close}
            className="text-muted hover:text-foreground cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-5 py-3 border-b border-border">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? "version-pill"
                  : "text-muted bg-surface2 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Commands */}
        <div className="max-h-[55vh] overflow-y-auto p-3">
          <div className="flex flex-col gap-1.5">
            {filtered.map((c) => (
              <button
                key={c.cmd}
                onClick={() => copy(c.cmd)}
                className="group flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-[rgba(255,255,255,0.5)] cursor-pointer"
              >
                <code className="shrink-0 font-mono text-[12px] text-foreground bg-surface2 group-hover:bg-white/80 rounded-lg px-2 py-1 transition-colors">
                  {copied === c.cmd ? "✓ copied" : c.cmd}
                </code>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[12px] text-muted leading-snug">{c.desc}</p>
                </div>
                <span className={`shrink-0 text-[9px] font-mono uppercase tracking-wider mt-1 ${
                  c.tool === "cursor" ? "text-secondary/50" : c.tool === "both" ? "text-muted/40" : "text-primary/50"
                }`}>
                  {c.tool === "both" ? "all" : c.tool}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
