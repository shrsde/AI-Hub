"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const features = [
  {
    color: "bg-secondary",
    gradient: "gradient-blue",
    title: "Plain English, always",
    desc: "Every concept explained without jargon — real analogies, not technical walls.",
  },
  {
    color: "bg-primary",
    gradient: "gradient-peach",
    title: "Step-by-step from zero",
    desc: "From opening your terminal to running agents. No coding required.",
  },
  {
    color: "bg-success",
    gradient: "gradient-green",
    title: "A process that scales",
    desc: "One workflow that grows from single prompts to multi-agent orchestration.",
  },
  {
    color: "bg-warning",
    gradient: "gradient-amber",
    title: "From assistant to team",
    desc: "Start with one helper, then run parallel agents like a small engineering team.",
  },
];

const processSteps = [
  { num: 1, title: "Plan", glyph: "◎", href: "/process", hoverGradient: "gradient-peach" },
  { num: 2, title: "Set up", glyph: "◧", href: "/setup", hoverGradient: "gradient-blue" },
  { num: 3, title: "Build", glyph: "▸", href: "/process", hoverGradient: "gradient-amber" },
  { num: 4, title: "Agents", glyph: "⬡", href: "/flows", hoverGradient: "gradient-peach" },
  { num: 5, title: "Ship", glyph: "△", href: "/process", hoverGradient: "gradient-red" },
  { num: 6, title: "Learn", glyph: "↻", href: "/skills", hoverGradient: "gradient-green" },
];

const steps = [
  { num: 1, title: "Get Started", desc: "Install tools, open terminal, first session", href: "/get-started", tag: "start here", tagClass: "tag tag-primary" },
  { num: 2, title: "Terms", desc: "24 terms explained in plain English", href: "/terms", tag: "reference", tagClass: "tag tag-secondary" },
  { num: 3, title: "Project Setup", desc: "The 5-layer project architecture", href: "/setup", tag: "foundation", tagClass: "tag tag-warning" },
  { num: 4, title: "6-Step Process", desc: "Repeatable workflow for every feature", href: "/process", tag: "workflow", tagClass: "tag tag-success" },
  { num: 5, title: "Skills", desc: "Teach the AI your specific processes", href: "/skills", tag: "capability", tagClass: "tag tag-secondary" },
  { num: 6, title: "With vs Without", desc: "Side-by-side: agents change everything", href: "/workflow", tag: "mindset", tagClass: "tag tag-danger" },
  { num: 7, title: "Agent Flows", desc: "Four automation patterns with diagrams", href: "/flows", tag: "advanced", tagClass: "tag tag-primary" },
];

const toolIcons = [
  {
    id: "cheatsheet",
    label: "Cheat Sheet",
    desc: "Your quick-reference command guide for Claude Code and Cursor. Every slash command, shortcut, and mode in one place — click any command to copy it.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4.5 7L6.5 8.5L4.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    spotlight: "cheatsheet",
  },
  {
    id: "search",
    label: "AI Search",
    desc: "Ask anything about Claude Code in plain English. Powered by Claude, it searches every page on this site and returns a direct answer with a link to the relevant section.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    spotlight: "search",
  },
  {
    id: "explain",
    label: "Explain This",
    desc: "The floating ? button in the bottom-right corner. Click it, then click any word or highlight a phrase on any page — Claude explains it in plain English instantly.",
    icon: (
      <span className="text-lg font-bold">?</span>
    ),
    spotlight: "explain",
  },
];

function IconExplainer() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = toolIcons.find((t) => t.id === active);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  // When spotlight is active, find and highlight the target element
  useEffect(() => {
    if (!active) return;

    // Add a data attribute to the spotlight target so we can style it
    let targetEl: HTMLElement | null = null;

    if (active === "cheatsheet") {
      targetEl = document.querySelector('[title="Command cheat sheet"]');
    } else if (active === "search") {
      targetEl = document.querySelector('[title="Search (⌘K)"]');
    } else if (active === "explain") {
      // The ? button is the last fixed button bottom-right
      targetEl = document.querySelector('.fixed.bottom-6.right-6');
    }

    if (targetEl) {
      targetEl.setAttribute("data-spotlight", "true");
    }

    return () => {
      if (targetEl) {
        targetEl.removeAttribute("data-spotlight");
      }
    };
  }, [active]);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Tools at your fingertips</h2>
      <p className="text-muted text-sm mb-6 max-w-md">Three helpers built into every page. Click one to see where it lives.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {toolIcons.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActive(tool.id)}
            className="glass-cell group rounded-2xl p-5 text-left cursor-pointer transition-all duration-300 hover:shadow-md hover:border-border2"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface2 group-hover:bg-white/80 text-muted group-hover:text-foreground transition-all duration-300">
                {tool.icon}
              </span>
              <p className="text-sm font-semibold text-foreground">{tool.label}</p>
            </div>
            <p className="text-[12px] text-muted leading-relaxed">{tool.desc}</p>
          </button>
        ))}
      </div>

      {/* Spotlight overlay */}
      {active && (
        <div
          className="fixed inset-0 z-[39] spotlight-overlay"
          onClick={() => setActive(null)}
        >
          {/* Tooltip near the highlighted element */}
          {activeItem && (
            <div
              className={`fixed bento-cell shadow-2xl border border-border2 p-4 max-w-[260px] z-[201] ${
                active === "explain"
                  ? "bottom-20 right-6"
                  : "top-14 right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-muted">{activeItem.icon}</span>
                <p className="text-sm font-semibold text-foreground">{activeItem.label}</p>
              </div>
              <p className="text-[12px] text-muted leading-relaxed">{activeItem.desc}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-3 text-[11px] text-primary font-medium cursor-pointer hover:underline underline-offset-2"
              >
                Got it
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayed}
      <span className={`typing-cursor ${done ? "typing-cursor-blink" : ""}`}>|</span>
    </>
  );
}

export default function Home() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12 sm:py-16">
      {/* ── Hero ──────────────────────────────── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main hero */}
          <div className="md:col-span-2 glass-hero bento-cell flex flex-col justify-center" style={{ padding: "36px 32px" }}>
            <span className="version-pill mb-4 self-start text-[11px] font-semibold px-3 py-1 rounded-full">
              <TypingText text="The free guide to start building +" />
            </span>
            <h1 className="font-extrabold tracking-[0.01em] text-foreground leading-[1.15]">
              <span className="block text-2xl sm:text-3xl">So You Want To Be Dangerous</span>
              <span className="block text-2xl sm:text-3xl text-primary">With Claude?</span>
            </h1>
            <p className="mt-3 text-muted text-[15px] leading-relaxed max-w-md">
              The step-by-step system that takes non-technical founders from zero to shipping real products with Claude Code.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="version-pill inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold group transition-all duration-200 hover:shadow-[0_4px_16px_rgba(139,70,220,0.12)]"
              >
                Get Started <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/terms"
                className="glass-btn inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-medium"
              >
                Learn the Terms
              </Link>
            </div>
          </div>

          {/* 6-Step Process visual */}
          <div className="glass-card flex flex-col justify-center p-5">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-3 text-center">
              The 6-step process
            </p>
            <div className="grid grid-cols-3 gap-2">
              {processSteps.map((step) => (
                <Link
                  key={step.num}
                  href={step.href}
                  className={`rounded-xl px-2 py-3.5 text-center transition-all duration-300 ease-out border border-transparent ${
                    hoveredStep === step.num
                      ? `${step.hoverGradient} shadow-md border-border2`
                      : "glass-cell"
                  }`}
                  onMouseEnter={() => setHoveredStep(step.num)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <span className={`block text-lg transition-colors duration-300 ${
                    hoveredStep === step.num ? "text-foreground" : "text-muted/50"
                  }`}>
                    {step.glyph}
                  </span>
                  <p className={`text-[12px] font-semibold mt-1 transition-colors duration-300 ${
                    hoveredStep === step.num ? "text-foreground" : "text-foreground/70"
                  }`}>
                    {step.title}
                  </p>
                  <span className={`block h-0.5 mx-auto mt-1.5 rounded-full bg-primary/40 transition-all duration-300 ${
                    hoveredStep === step.num ? "w-5" : "w-0"
                  }`} />
                </Link>
              ))}
            </div>
            <Link
              href="/process"
              className="mt-3 text-center text-[11px] text-primary font-medium hover:underline underline-offset-2"
            >
              Full process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── What is this hub? ─────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">What is this hub?</h2>
        <p className="text-muted text-sm mb-6 max-w-md">A structured learning path — no prerequisites, no assumptions.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.title} className={`bento-cell card-lift ${f.gradient}`}>
              <div className={`w-7 h-1 rounded-full ${f.color} mb-4`} />
              <h3 className="font-semibold text-foreground text-[14px] mb-1">{f.title}</h3>
              <p className="text-muted text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tools at your fingertips ────────────── */}
      <IconExplainer />

      {/* ── Learning order ────────────────────── */}
      <section className="mb-8">
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Suggested learning order</h2>
        <p className="text-muted text-sm mb-6">Follow in sequence, or jump to what you need.</p>

        <div className="flex flex-col gap-2">
          {steps.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bento-cell card-lift group flex items-center gap-4 !py-3.5 !px-5"
            >
              <span className="font-mono text-lg font-bold text-primary/30 w-6 text-center shrink-0">
                {s.num}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-[14px] group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-muted text-[12px] leading-snug">{s.desc}</p>
              </div>
              <span className={`${s.tagClass} hidden sm:inline-flex shrink-0`}>{s.tag}</span>
              <span className="text-muted text-sm group-hover:translate-x-0.5 transition-transform shrink-0">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
