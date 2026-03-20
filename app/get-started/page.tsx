"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Terminal-line helper spans                                         */
/* ------------------------------------------------------------------ */
const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#A6E3A1" }}>{children}</span>
);
const C = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#CDD6F4" }}>{children}</span>
);
const CM = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#585B70" }}>{children}</span>
);
const O = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#7F849C" }}>{children}</span>
);
const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#F9E2AF" }}>{children}</span>
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const STEP_LABELS = [
  "What to install",
  "The terminal",
  "Install Claude Code",
  "Your first session",
  "Set up your project",
  "Going further",
];

const REQUIRED_APPS = [
  {
    name: "Node.js",
    role: "runtime",
    desc: "JavaScript runtime that powers Claude Code and its toolchain.",
    install: "brew install node",
    installAlt: "Or download from nodejs.org/en/download (LTS version)",
    checkIndex: 0,
  },
  {
    name: "Claude Code",
    role: "cli",
    desc: "Anthropic\u2019s agentic coding assistant \u2014 runs in your terminal.",
    install: "npm install -g @anthropic-ai/claude-code",
    installAlt: "Requires Node.js to be installed first",
    checkIndex: 2,
  },
  {
    name: "Git",
    role: "version-control",
    desc: "Tracks changes so Claude (and you) can safely modify code.",
    install: "brew install git",
    installAlt: "Or download from git-scm.com/downloads",
    checkIndex: 1,
  },
];

const RECOMMENDED_APPS = [
  {
    name: "Cursor",
    role: "editor",
    desc: "AI-native code editor with a built-in Claude Code extension.",
    tag: "recommended",
    install: "brew install --cask cursor",
    installAlt: "Or download from cursor.com",
    checkIndex: 3,
  },
  {
    name: "GitHub",
    role: "hosting",
    desc: "Remote repository hosting \u2014 needed for collaboration and CI.",
    tag: "free account",
    install: "gh auth login",
    installAlt: "Sign up at github.com, then install gh CLI: brew install gh",
    checkIndex: 4,
  },
  {
    name: "Anthropic account",
    role: "api-access",
    desc: "Gives you API keys and access to the latest Claude models.",
    tag: "sign up",
    install: null,
    installAlt: "Sign up at console.anthropic.com",
    checkIndex: -1,
  },
];

const CHECKLIST_ITEMS = [
  "Node.js v18+ installed",
  "Git installed and configured",
  "Claude Code CLI installed globally",
  "Cursor or VS Code ready",
  "GitHub account created",
];

const TERMINAL_COMMANDS = [
  { cmd: "cd", what: "Change directory", example: "cd ~/projects" },
  { cmd: "ls", what: "List files", example: "ls -la" },
  { cmd: "mkdir", what: "Create a folder", example: "mkdir my-app" },
  { cmd: "pwd", what: "Print working directory", example: "pwd" },
  { cmd: "claude", what: "Start Claude Code", example: "claude" },
];

const SHORTCUTS = [
  { key: "Escape", action: "Cancel current generation" },
  { key: "Ctrl + R", action: "Retry the last prompt" },
  { key: "/model", action: "Switch Claude model" },
  { key: "/clear", action: "Reset conversation context" },
  { key: "/help", action: "Show all slash commands" },
  { key: "Up arrow", action: "Cycle through prompt history" },
];

const TROUBLESHOOTING = [
  {
    issue: "npm: command not found",
    fix: "Install Node.js from nodejs.org \u2014 it includes npm.",
  },
  {
    issue: "claude: command not found",
    fix: "Run npm install -g @anthropic-ai/claude-code again, then restart your terminal.",
  },
  {
    issue: "Permission denied on install",
    fix: "Prefix with sudo (macOS/Linux) or run terminal as Admin (Windows).",
  },
  {
    issue: "CLAUDE.md not picked up",
    fix: "Make sure the file is in the project root and named exactly CLAUDE.md.",
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable small components                                          */
/* ------------------------------------------------------------------ */
function AppCard({
  name,
  role,
  desc,
  tag,
  variant,
  install,
  installAlt,
  copied,
  onCopy,
}: {
  name: string;
  role: string;
  desc: string;
  tag: string;
  variant: "required" | "neutral";
  install?: string | null;
  installAlt?: string;
  copied?: boolean;
  onCopy?: () => void;
}) {
  return (
    <div className={`bento-cell bg-surface rounded-2xl border p-5 flex flex-col gap-2 card-lift ${copied ? "border-success/40" : "border-border"}`}>
      <p className="text-foreground font-semibold text-[15px]">{name}</p>
      <p className="font-mono text-[11px] text-muted">{role}</p>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
      {install && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(install);
            onCopy?.();
          }}
          className="mt-1 group relative flex items-center gap-2 rounded-lg bg-[#1E1E2E] px-3 py-2 font-mono text-[11px] text-[#CDD6F4] overflow-x-auto text-left cursor-pointer hover:bg-[#252436] transition-colors"
        >
          <span className="flex-1">
            <span style={{ color: "#A6E3A1" }}>$ </span>{install}
          </span>
          <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded transition-all ${copied ? "text-[#A6E3A1]" : "text-[#585B70] group-hover:text-[#CDD6F4]"}`}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="4.5" y="1.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M9.5 4.5H3A1.5 1.5 0 001.5 6v5A1.5 1.5 0 003 12.5h5A1.5 1.5 0 009.5 11V4.5z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            )}
          </span>
        </button>
      )}
      {installAlt && (
        <p className="text-[11px] text-muted/70">{installAlt}</p>
      )}
      <span
        className={`mt-auto self-start tag ${
          variant === "required" ? "tag-success" : "tag-primary"
        }`}
      >
        {tag}
      </span>
    </div>
  );
}

function CheckItem({
  label,
  checked,
  toggle,
}: {
  label: string;
  checked: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-3 text-left py-2 group cursor-pointer"
    >
      <span
        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors border ${
          checked
            ? "bg-success border-success"
            : "border-border2 bg-surface"
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span
        className={`text-sm transition-colors ${
          checked ? "line-through text-muted" : "text-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-foreground mt-6 mb-2">
      {children}
    </h3>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="font-mono text-foreground bg-surface2 border border-border px-1.5 py-0.5 rounded text-xs">
      {children}
    </kbd>
  );
}

/* ------------------------------------------------------------------ */
/*  Step content components                                            */
/* ------------------------------------------------------------------ */
function Step0({
  checks,
  toggle,
  markCheck,
}: {
  checks: boolean[];
  toggle: (i: number) => void;
  markCheck: (i: number) => void;
}) {
  return (
    <div>
      <div className="info-box mb-5">
        <p className="text-sm">
          Don&apos;t worry about installing these one by one right now &mdash; the next steps will walk you through installing each of these directly in your terminal, with exact commands you can copy and paste.
        </p>
      </div>

      <SectionHeading>Required</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-4">
        {REQUIRED_APPS.map((a) => (
          <AppCard
            key={a.name}
            {...a}
            tag="required"
            variant="required"
            copied={a.checkIndex >= 0 && checks[a.checkIndex]}
            onCopy={() => a.checkIndex >= 0 && markCheck(a.checkIndex)}
          />
        ))}
      </div>

      <SectionHeading>Recommended</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-4">
        {RECOMMENDED_APPS.map((a) => (
          <AppCard
            key={a.name}
            {...a}
            tag={a.tag}
            variant="neutral"
            copied={a.checkIndex >= 0 && checks[a.checkIndex]}
            onCopy={() => a.checkIndex >= 0 && markCheck(a.checkIndex)}
          />
        ))}
      </div>

      <SectionHeading>Checklist</SectionHeading>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5">
        <div className="flex flex-col gap-0.5">
          {CHECKLIST_ITEMS.map((item, i) => (
            <CheckItem
              key={item}
              label={item}
              checked={checks[i]}
              toggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5 mb-5">
        <p className="text-sm font-semibold text-foreground mb-2">What is the terminal?</p>
        <p className="text-sm text-muted leading-relaxed mb-3">
          The terminal is just a text-based way to talk to your computer. Instead of clicking buttons and icons, you type short commands. That&apos;s it. It&apos;s not hacking, it&apos;s not dangerous, and you can&apos;t break your computer by typing the wrong thing &mdash; the worst that happens is you get an error message.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Think of it like texting your computer instead of tapping on apps. Developers use it because it&apos;s faster, and Claude Code lives here because it needs to read and write your project files directly.
        </p>
      </div>

      <SectionHeading>How to open the terminal on Mac</SectionHeading>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5">
        <p className="text-sm text-muted leading-relaxed">
          Press <Kbd>Cmd</Kbd> + <Kbd>Space</Kbd> to open Spotlight, type{" "}
          <span className="text-foreground font-medium">Terminal</span>, and hit
          Enter. You can also find it in{" "}
          <span className="text-foreground">
            Applications &rarr; Utilities &rarr; Terminal
          </span>
          . You&apos;ll see a small window with a blinking cursor &mdash; that&apos;s it, you&apos;re in.
        </p>
      </div>

      <SectionHeading>5 commands you need to know</SectionHeading>
      <div className="bg-surface rounded-2xl border border-border overflow-hidden text-sm">
        <div className="grid grid-cols-3 bg-surface2 px-4 py-2.5 font-medium text-muted text-xs uppercase tracking-wider">
          <span>Command</span>
          <span>What it does</span>
          <span>Example</span>
        </div>
        {TERMINAL_COMMANDS.map((c) => (
          <div
            key={c.cmd}
            className="grid grid-cols-3 px-4 py-2.5 border-t border-border"
          >
            <span className="font-mono text-primary text-xs">{c.cmd}</span>
            <span className="text-foreground text-xs">{c.what}</span>
            <span className="font-mono text-muted text-xs">{c.example}</span>
          </div>
        ))}
      </div>

      <SectionHeading>Worked example</SectionHeading>
      <div className="terminal-block">
        <CM># Navigate to your home folder</CM>
        <br />
        <P>~ $</P> <C>cd ~/Desktop</C>
        <br />
        <br />
        <CM># List what&apos;s there</CM>
        <br />
        <P>~/Desktop $</P> <C>ls</C>
        <br />
        <O>projects/  notes.txt  screenshot.png</O>
        <br />
        <br />
        <CM># Create a new folder and enter it</CM>
        <br />
        <P>~/Desktop $</P> <C>mkdir my-project</C>
        <br />
        <P>~/Desktop $</P> <C>cd my-project</C>
        <br />
        <P>~/Desktop/my-project $</P> <C>pwd</C>
        <br />
        <O>/Users/you/Desktop/my-project</O>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5 mb-5">
        <p className="text-sm font-semibold text-foreground mb-2">What is Claude Code?</p>
        <p className="text-sm text-muted leading-relaxed mb-3">
          Claude Code is an AI assistant that lives in your terminal and works directly inside your project files. It can read, write, and edit code on your behalf &mdash; all from plain English instructions.
        </p>
        <p className="text-sm font-semibold text-foreground mb-2">How is it different from Claude online?</p>
        <p className="text-sm text-muted leading-relaxed mb-3">
          <span className="text-foreground font-medium">Claude.ai (the website)</span> is like texting a smart friend &mdash; great for questions and ideas, but it can&apos;t touch your files. <span className="text-foreground font-medium">Claude Code</span> is like having that friend sit at your computer and actually build things for you. It reads your project, writes real files, runs commands, and makes changes directly.
        </p>
        <p className="text-sm font-semibold text-foreground mb-2">Why use Claude Code over Claude online?</p>
        <ul className="text-sm text-muted leading-relaxed list-disc list-inside space-y-1">
          <li>It sees your entire project &mdash; not just what you paste into a chat</li>
          <li>It writes and edits files directly &mdash; no copy-pasting back and forth</li>
          <li>It can run commands, install packages, and test things for you</li>
          <li>It remembers your project rules via a simple instruction file</li>
        </ul>
      </div>

      <SectionHeading>Install Claude Code</SectionHeading>
      <p className="text-sm text-muted mb-3 leading-relaxed">
        Copy and paste this command into your terminal and press Enter. It installs Claude Code so you can use it from any folder on your computer.
      </p>
      <div className="terminal-block">
        <P>~ $</P> <C>npm install -g @anthropic-ai/claude-code</C>
      </div>

      <SectionHeading>Check that it worked</SectionHeading>
      <p className="text-sm text-muted mb-3 leading-relaxed">
        Type this command to confirm it installed correctly. You should see a version number appear.
      </p>
      <div className="terminal-block">
        <P>~ $</P> <C>claude --version</C>
        <br />
        <O>1.0.12</O>
      </div>
      <p className="text-sm text-muted mt-2 leading-relaxed">
        If you see a version number, you&apos;re all set. If you get an error, make sure Node.js is installed (Step 1) and try closing and reopening your terminal.
      </p>

      <SectionHeading>Cursor extension (optional)</SectionHeading>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5">
        <p className="text-sm text-muted leading-relaxed">
          If you installed Cursor (the code editor), you can also add Claude Code as a sidebar panel. Open Cursor, press{" "}
          <Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>X</Kbd>, search for{" "}
          <span className="text-foreground font-medium">Claude Code</span>, and
          click{" "}
          <span className="text-primary font-medium">Install</span>. This gives you Claude right inside your editor &mdash; but the terminal version works great on its own.
        </p>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <div className="info-box mb-5">
        <p className="text-sm">
          <span className="font-medium text-foreground">Why create a folder?</span> Claude Code works inside a specific folder on your computer &mdash; that folder becomes your &quot;project.&quot; Everything Claude creates (files, pages, images) will live inside it, nice and organized. Think of it like creating a new folder on your desktop for a school project &mdash; everything related goes in one place.
        </p>
      </div>

      <SectionHeading>Create a folder and start Claude</SectionHeading>
      <p className="text-sm text-muted mb-3 leading-relaxed">
        These three commands create a new folder, set it up for version tracking (so you can undo mistakes), and launch Claude inside it.
      </p>
      <div className="terminal-block">
        <P>~ $</P> <C>mkdir ~/my-first-project && cd ~/my-first-project</C>
        <br />
        <P>~/my-first-project $</P> <C>git init</C>
        <br />
        <O>Initialized empty Git repository</O>
        <br />
        <P>~/my-first-project $</P> <C>claude</C>
        <br />
        <O>Claude Code v1.0.12</O>
        <br />
        <H>What would you like to build?</H>
      </div>

      <SectionHeading>Essential shortcuts</SectionHeading>
      <div className="bg-surface rounded-2xl border border-border overflow-hidden text-sm">
        <div className="grid grid-cols-2 bg-surface2 px-4 py-2.5 font-medium text-muted text-xs uppercase tracking-wider">
          <span>Key / command</span>
          <span>Action</span>
        </div>
        {SHORTCUTS.map((s) => (
          <div
            key={s.key}
            className="grid grid-cols-2 px-4 py-2.5 border-t border-border"
          >
            <span className="font-mono text-secondary text-xs">{s.key}</span>
            <span className="text-foreground text-xs">{s.action}</span>
          </div>
        ))}
      </div>

      <SectionHeading>Example prompts to try</SectionHeading>
      <div className="terminal-block">
        <H>&gt;</H>{" "}
        <C>
          Create a simple HTML page with a centered heading that says &quot;Hello
          World&quot;
        </C>
        <br />
        <br />
        <H>&gt;</H> <C>Add a dark mode toggle button with CSS transitions</C>
        <br />
        <br />
        <H>&gt;</H> <C>Write a README.md describing this project</C>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div>
      <SectionHeading>Navigate to your project</SectionHeading>
      <p className="text-sm text-muted mb-3 leading-relaxed">
        Open your terminal and navigate to the folder where your project lives. Then start Claude inside it.
      </p>
      <div className="terminal-block">
        <P>~ $</P> <C>cd ~/Desktop/my-real-project</C>
        <br />
        <P>~/Desktop/my-real-project $</P> <C>claude</C>
      </div>

      <SectionHeading>Create a CLAUDE.md</SectionHeading>
      <p className="text-sm text-muted mb-3 leading-relaxed">
        A CLAUDE.md is a simple text file that tells Claude about your project &mdash; what tools you&apos;re using, what rules to follow, and what to avoid. Think of it as an onboarding document you&apos;d hand to a new team member on their first day. Drop it in your project folder and Claude reads it automatically every time you start a session.
      </p>
      <div className="terminal-block">
        <CM># CLAUDE.md &mdash; paste this template and customise</CM>
        <br />
        <br />
        <C># Project overview</C>
        <br />
        <O>This is a website built with Next.js, styled with Tailwind CSS.</O>
        <br />
        <br />
        <C># Tools being used</C>
        <br />
        <O>- Next.js 15 (the framework that builds the website)</O>
        <br />
        <O>- Tailwind CSS v4 (the tool that handles all the styling)</O>
        <br />
        <O>- TypeScript (a version of JavaScript with safety checks)</O>
        <br />
        <br />
        <C># Rules to follow</C>
        <br />
        <O>- Keep files short and focused</O>
        <br />
        <O>- Use simple, readable code</O>
        <br />
        <O>- Explain what you changed after each edit</O>
        <br />
        <br />
        <C># Things to avoid</C>
        <br />
        <O>- Don&apos;t install new tools without asking me first</O>
        <br />
        <O>- Don&apos;t delete files without confirming</O>
      </div>

      <SectionHeading>Check that it loaded</SectionHeading>
      <div className="terminal-block">
        <P>~/Desktop/my-real-project $</P> <C>claude</C>
        <br />
        <O>Claude Code v1.0.12</O>
        <br />
        <O>Loaded CLAUDE.md (project context)</O>
        <br />
        <H>What would you like to build?</H>
      </div>
      <p className="text-sm text-muted mt-2 leading-relaxed">
        If you see &quot;Loaded CLAUDE.md&quot; in the output, Claude has read your project instructions and is ready to go.
      </p>
    </div>
  );
}

function Step5({
  nextChecks,
  toggleNext,
}: {
  nextChecks: boolean[];
  toggleNext: (i: number) => void;
}) {
  const NEXT_STEPS = [
    "Read the Process page to learn the full workflow",
    "Try a 3-prompt session: plan, build, review",
    "Experiment with /model to switch between Sonnet and Opus",
  ];

  return (
    <div>
      <SectionHeading>Next steps</SectionHeading>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5">
        <div className="flex flex-col gap-0.5">
          {NEXT_STEPS.map((item, i) => (
            <CheckItem
              key={item}
              label={item}
              checked={nextChecks[i]}
              toggle={() => toggleNext(i)}
            />
          ))}
        </div>
      </div>

      <SectionHeading>Running multiple Claudes at once</SectionHeading>
      <div className="bento-cell bg-surface rounded-2xl border border-border p-5">
        <p className="text-sm text-muted leading-relaxed">
          Once you&apos;re comfortable with one Claude session, you can level up by running multiple sessions at the same time &mdash; each working on a different part of your project simultaneously. It&apos;s like having a small team instead of one assistant. This is covered in the{" "}
          <Link
            href="/workflow"
            className="text-secondary underline underline-offset-2 hover:text-primary transition-colors"
          >
            With vs Without
          </Link>{" "}
          section &mdash; don&apos;t worry about it yet.
        </p>
      </div>

      <SectionHeading>Troubleshooting</SectionHeading>
      <div className="bg-surface rounded-2xl border border-border overflow-hidden text-sm">
        <div className="grid grid-cols-2 bg-surface2 px-4 py-2.5 font-medium text-muted text-xs uppercase tracking-wider">
          <span>Issue</span>
          <span>Fix</span>
        </div>
        {TROUBLESHOOTING.map((t) => (
          <div
            key={t.issue}
            className="grid grid-cols-2 px-4 py-2.5 border-t border-border"
          >
            <span className="font-mono text-warning text-xs">{t.issue}</span>
            <span className="text-foreground text-xs">{t.fix}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */
export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState<boolean[]>(
    Array(CHECKLIST_ITEMS.length).fill(false)
  );
  const [nextChecks, setNextChecks] = useState<boolean[]>(
    Array(3).fill(false)
  );

  const toggleCheck = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const markCheck = (i: number) =>
    setChecks((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  const toggleNext = (i: number) =>
    setNextChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section className="py-12 px-6">
      <div className="max-w-[960px] mx-auto">
        {/* ---- Header ---- */}
        <p className="text-primary text-xs font-mono uppercase tracking-widest mb-2">
          Beginner guide
        </p>
        <h1 className="font-sans font-extrabold text-2xl text-foreground leading-tight mb-1">
          Your first session from zero
        </h1>
        <p className="text-muted text-sm max-w-xl mb-8 leading-relaxed">
          Six short steps — from blank laptop to working Claude Code session.
        </p>

        {/* ---- Progress bar (desktop) ---- */}
        <div className="hidden sm:flex items-center gap-1 bg-surface rounded-2xl border border-border p-1.5 mb-6 overflow-hidden">
          {STEP_LABELS.map((label, i) => {
            let classes =
              "flex-1 text-center text-xs py-2.5 px-1 rounded-xl cursor-pointer transition-all duration-200 ";
            if (i === step)
              classes += "version-pill font-medium";
            else if (i < step)
              classes += "bg-surface2 text-muted";
            else
              classes += "bg-surface text-muted";

            return (
              <button
                key={label}
                className={classes}
                onClick={() => setStep(i)}
              >
                <span className="font-mono mr-1 opacity-60">{i + 1}.</span>
                {label}
              </button>
            );
          })}
        </div>

        {/* ---- Mobile step indicator ---- */}
        <p className="sm:hidden text-xs text-muted mb-6 font-mono">
          Step {step + 1} of {STEP_LABELS.length} &mdash;{" "}
          <span className="text-foreground font-medium">
            {STEP_LABELS[step]}
          </span>
        </p>

        {/* ---- Step heading ---- */}
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          <span className="text-muted font-mono text-sm mr-2">
            {String(step + 1).padStart(2, "0")}
          </span>
          {STEP_LABELS[step]}
        </h2>

        {/* ---- Step content ---- */}
        <div>
          {step === 0 && <Step0 checks={checks} toggle={toggleCheck} markCheck={markCheck} />}
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && (
            <Step5 nextChecks={nextChecks} toggleNext={toggleNext} />
          )}
        </div>

        {/* ---- Bottom navigation ---- */}
        <div className="flex items-center justify-between mt-10 pt-5 border-t border-border">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-sm px-5 py-2.5 rounded-xl bg-surface border border-border2 text-foreground font-medium hover:border-primary/40 transition-colors cursor-pointer"
            >
              &larr; Back
            </button>
          ) : (
            <span />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="text-sm px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              Next &rarr;
            </button>
          ) : (
            <Link
              href="/process"
              className="text-sm px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              Continue to Process &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
