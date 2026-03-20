"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Phase data                                                         */
/* ------------------------------------------------------------------ */

interface Step {
  title: string;
  desc: string;
  note?: string;
  noteType?: "primary" | "warning";
  warning?: boolean;
}

interface Phase {
  number: number;
  name: string;
  timing?: string;
  colorBg: string;
  dotBg: string;
  gradient: string;
  steps: Step[];
}

const PHASES: Phase[] = [
  {
    number: 1,
    name: "Before you open the AI",
    timing: "5-10 min",
    colorBg: "bg-primary",
    dotBg: "bg-primary",
    gradient: "gradient-peach",
    steps: [
      {
        title: "Define the problem in one sentence",
        desc: "Write what the feature does from the user's perspective. If you can't say it in one line, you don't understand it yet.",
        note: "Why: A clear sentence keeps you and the AI aligned. Vague prompts create vague code.",
        noteType: "primary",
      },
      {
        title: "Write the user flow step by step",
        desc: 'List every screen or action: "User lands on /dashboard, clicks New project, fills form, sees confirmation."',
        note: "Why: This becomes your build checklist and your test script.",
        noteType: "primary",
      },
      {
        title: "Decide what data you need to store",
        desc: "List the objects (e.g. Project, Task) and their key fields. You don't need a full schema -- just names and relationships.",
        note: "Why: Data shape drives everything. Getting it right now prevents rewrites later.",
        noteType: "primary",
      },
      {
        title: "Set your scope boundary",
        desc: 'Write one line: "This phase does NOT include ..." List the features you are deliberately leaving out.',
        note: "Why: Without a boundary, the AI will keep adding features and you'll ship nothing.",
        noteType: "warning",
        warning: true,
      },
    ],
  },
  {
    number: 2,
    name: "Set up the layers",
    timing: "10-15 min",
    colorBg: "bg-secondary",
    dotBg: "bg-secondary",
    gradient: "gradient-blue",
    steps: [
      {
        title: "Write your project instruction file",
        desc: "Create CLAUDE.md in your project root. Include: tech stack, file structure conventions, naming rules, and any constraints.",
        note: "Why: This is the AI's memory. Without it, every session starts from zero.",
        noteType: "primary",
      },
      {
        title: "Copy skills into .claude/skills/",
        desc: "Drop in any relevant skill files -- they give Claude reusable recipes for common patterns in your stack.",
      },
      {
        title: "Copy agents into .claude/agents/",
        desc: "Add agent definitions for tasks like feature planning, code review, or deployment prep.",
      },
      {
        title: "Create your .mcp.json",
        desc: "Configure MCP servers for any external tools you need -- databases, APIs, design systems, etc.",
      },
      {
        title: "Verify everything loaded",
        desc: "Start Claude Code and ask it to list its skills and tools. If something is missing, fix the file path now.",
        note: "Tip: Run /skills and /tools in the CLI to confirm.",
        noteType: "primary",
      },
    ],
  },
  {
    number: 3,
    name: "Start building",
    timing: "main phase",
    colorBg: "bg-warning",
    dotBg: "bg-warning",
    gradient: "gradient-amber",
    steps: [
      {
        title: "Run the feature-planner agent first",
        desc: "Feed it your one-sentence problem and user flow. It will return a phased build plan with file-by-file steps.",
        note: "Why: Planning before building prevents the AI from guessing your architecture.",
        noteType: "primary",
      },
      {
        title: "Review the plan before building",
        desc: "Read every step. Cut anything out of scope. Reorder if needed. This is your last cheap chance to change direction.",
      },
      {
        title: "Build in small steps",
        desc: "One prompt = one step from the plan. Don't combine steps. Small prompts give you checkpoints to review and revert.",
        note: "Warning: Large prompts create large diffs. Large diffs are hard to review and easy to break.",
        noteType: "warning",
        warning: true,
      },
      {
        title: "Test it yourself after each step",
        desc: 'Open the app, click through the flow, check the console. Don\'t trust "it should work" -- verify it does.',
      },
      {
        title: "Keep your instruction file current",
        desc: "When you add a new convention or change a pattern, update CLAUDE.md immediately. Stale instructions cause drift.",
      },
    ],
  },
  {
    number: 4,
    name: "Use agents for big tasks",
    colorBg: "bg-primary",
    dotBg: "bg-primary",
    gradient: "gradient-peach",
    steps: [
      {
        title: "Know when to switch to agents",
        desc: "Use agents when the task spans multiple files, needs a specific review process, or would benefit from parallel work.",
        note: "Rule of thumb: if you'd need more than 3 prompts, consider an agent.",
        noteType: "primary",
      },
      {
        title: "Write a clear parallel brief",
        desc: 'Tell the agent: what to do, what files to touch, what to leave alone, and what "done" looks like.',
      },
      {
        title: "Review, then direct the next step",
        desc: "After the agent finishes, review the output before sending it to the next task. Agents compound errors if you don't check.",
        note: 'Warning: Skipping review between agent steps is the #1 cause of "how did it get this broken?"',
        noteType: "warning",
        warning: true,
      },
    ],
  },
  {
    number: 5,
    name: "Before you ship",
    colorBg: "bg-danger",
    dotBg: "bg-danger",
    gradient: "gradient-red",
    steps: [
      {
        title: "Run the code-reviewer agent",
        desc: "Point it at your branch. It checks for bugs, security issues, unused code, and style violations.",
      },
      {
        title: "Walk through the user flow",
        desc: "Follow your step-by-step flow from Phase 1. Every step should work exactly as written.",
      },
      {
        title: "Check the three states",
        desc: "For every screen: empty state (no data), loaded state (with data), and error state (something broke). All three must be handled.",
        note: "Why: Users will hit all three. If you only tested the happy path, you only built the happy path.",
        noteType: "primary",
      },
      {
        title: "Confirm no secrets in the code",
        desc: "Search for API keys, passwords, tokens, and .env values. Nothing secret should be committed.",
        note: "Warning: AI-generated code sometimes hardcodes keys that were in your prompt. Always check.",
        noteType: "warning",
        warning: true,
      },
    ],
  },
  {
    number: 6,
    name: "After the project",
    timing: "5 min",
    colorBg: "bg-success",
    dotBg: "bg-success",
    gradient: "gradient-green",
    steps: [
      {
        title: "Update your instruction file",
        desc: "Add any new conventions, patterns, or tools you adopted during this project.",
      },
      {
        title: "Update your toolkit",
        desc: "If you wrote a useful skill or agent, clean it up and add it to your shared collection.",
      },
      {
        title: 'Write a "what I learned" note',
        desc: "Two or three sentences: what worked, what didn't, what you'd do differently. Future-you will thank present-you.",
        note: "Why: Learning compounds. A 2-minute note now saves hours on the next project.",
        noteType: "primary",
      },
      {
        title: "If you kept re-explaining -- make it a skill",
        desc: "If you gave Claude the same instruction more than twice, extract it into a skill file so you never type it again.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProcessPage() {
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <main className="text-foreground">
      <div className="mx-auto max-w-[960px] px-6 py-12">
        {/* ---- Header ---- */}
        <header className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">
            How to work
          </p>
          <h1 className="font-sans font-extrabold text-2xl leading-tight text-foreground mb-1">
            The 6-phase project process
          </h1>
          <p className="max-w-[620px] text-sm leading-relaxed text-muted">
            A repeatable sequence for building features with AI — from first thought to shipped code.
          </p>
        </header>

        {/* ---- Phases ---- */}
        <div className="flex flex-col gap-3">
          {PHASES.map((phase, i) => {
            const isOpen = openPhases.has(i);

            return (
              <div
                key={phase.number}
                className={`${phase.gradient} rounded-2xl border overflow-hidden ${
                  isOpen ? "border-border2 phase-open" : "border-border"
                }`}
              >
                {/* Phase header -- clickable */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-surface2"
                >
                  {/* Numbered circle */}
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${phase.colorBg}`}
                  >
                    {phase.number}
                  </span>

                  {/* Name */}
                  <span className="flex-1 font-sans text-[14px] font-semibold text-foreground">
                    {phase.name}
                  </span>

                  {/* Timing badge */}
                  {phase.timing && (
                    <span className="hidden font-mono text-[12px] text-muted sm:inline-block">
                      {phase.timing}
                    </span>
                  )}

                  {/* Chevron */}
                  <span
                    className={`phase-chevron text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    &#9654;
                  </span>
                </button>

                {/* Phase body */}
                {isOpen && (
                  <div className="border-t border-border px-5 pb-5 pt-3">
                    <ul className="flex flex-col gap-3">
                      {phase.steps.map((step, j) => (
                        <li key={j} className="flex gap-3">
                          {/* Dot */}
                          <span
                            className={`mt-2 h-2 w-2 shrink-0 rounded-full ${phase.dotBg} opacity-60`}
                          />

                          <div className="flex flex-col gap-1">
                            <p className="font-sans font-semibold text-foreground">
                              {step.title}
                            </p>
                            <p className="text-[13px] leading-relaxed text-muted">
                              {step.desc}
                            </p>
                            {step.note && (
                              <p
                                className={`mt-1 font-mono text-[11px] leading-relaxed ${
                                  step.noteType === "warning"
                                    ? "text-warning"
                                    : "text-primary"
                                }`}
                              >
                                {step.warning && "\u25B6 "}
                                {step.note}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
