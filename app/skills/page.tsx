"use client";

import { useState, useEffect } from "react";

function SkillsHero() {
  const items = [
    { text: "Bow hunting skills", check: false },
    { text: "Computer hacking skills", check: false },
    { text: "Claude maxxing skills", check: true },
  ];

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= items.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), 700);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <section className="mb-10">
      <div className="glass-card px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <blockquote className="flex-1">
            <p className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-0.5">
              &ldquo;Girls only like guys with great skills&rdquo;
            </p>
            <cite className="text-[11px] text-muted not-italic">— Napoleon Dynamite</cite>
          </blockquote>
          <div className="flex items-center gap-4 sm:gap-5">
            {items.slice(0, count).map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 animate-in"
                style={{ animationDuration: "0.3s" }}
              >
                {item.check ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-success">
                    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted/40">
                    <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                )}
                <span className={`text-[12px] font-medium ${
                  item.check ? "text-foreground" : "text-muted/50 line-through"
                }`}>
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      {/* ---- Hero ---- */}
      <SkillsHero />

      {/* ---- Header ---- */}
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
        What skills are
      </p>
      <h1 className="mb-1 text-2xl font-extrabold leading-tight">
        Skills — teaching the AI your way
      </h1>
      <p className="mb-4 max-w-[640px] text-sm text-muted">
        A skill is a markdown file that teaches Claude a specific workflow. Drop one in and Claude gains a new capability instantly.
      </p>
      <div className="info-box mb-10 max-w-[640px]">
        <p className="text-sm">
          <span className="font-medium text-foreground">What&apos;s a markdown file?</span> It&apos;s just a plain text file (like a .txt) with a <span className="font-mono text-[12px]">.md</span> extension. You can write one in any text editor &mdash; no special software needed. It uses simple formatting like <span className="font-mono text-[12px]"># headings</span> and <span className="font-mono text-[12px]">- bullet points</span>. If you can write a to-do list, you can write a markdown file.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  1. Two types of skill                                       */}
      {/* ============================================================ */}
      <SectionHeading title="Two types of skill" />

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {/* Global */}
        <div
          className="rounded-2xl border p-6 card-lift gradient-blue"
        >
          <span className="tag tag-secondary mb-3 inline-block font-mono uppercase tracking-wider">
            Global
          </span>
          <p className="mb-3 rounded bg-surface2 px-2 font-mono text-xs text-secondary">
            ~/.claude/skills/
          </p>
          <p className="mb-4 text-sm text-foreground/90">
            Skills that follow you across every project. Think of them as your
            personal toolkit — conventions, style guides, and workflows you
            always want available.
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-xs text-muted">
            <li>Available in every Claude Code session</li>
            <li>Ideal for personal conventions and defaults</li>
            <li>Not committed to any repo</li>
          </ul>
        </div>

        {/* Project */}
        <div
          className="rounded-2xl border p-6 card-lift gradient-peach"
        >
          <span className="tag tag-primary mb-3 inline-block font-mono uppercase tracking-wider">
            Project
          </span>
          <p className="mb-3 rounded bg-surface2 px-2 font-mono text-xs text-primary">
            [project]/.claude/skills/
          </p>
          <p className="mb-4 text-sm text-foreground/90">
            Skills that live inside a specific repo. The whole team shares
            them — they encode project-specific knowledge like your deploy
            pipeline, test strategy, or database migration steps.
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-xs text-muted">
            <li>Committed to version control with the project</li>
            <li>Shared by the entire team automatically</li>
            <li>Scoped to one codebase&apos;s conventions</li>
          </ul>
        </div>
      </div>

      {/* ---- Info callout ---- */}
      <div className="info-box mb-10">
        <p className="text-sm">
          <span className="font-medium text-secondary">The mental model:</span>{" "}
          global skills are tools you bring to every job site — your favourite
          hammer, your go-to measuring tape. Project skills are the
          site-specific blueprints that tell you where the walls go.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  2. Skill anatomy                                            */}
      {/* ============================================================ */}
      <SectionHeading title="What a skill actually looks like" />

      <div className="mb-10 overflow-hidden rounded-2xl border border-border bg-surface">
        {/* Header bar */}
        <div className="flex items-center gap-2 border-b border-border bg-surface2 px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/40" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-muted">
            .claude/skills/testing.md
          </span>
        </div>

        {/* Code body */}
        <div className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9]">
          <Line><Sk c="comment">---</Sk></Line>
          <Line><Sk c="key">name:</Sk> <Sk c="val">Unit testing with Vitest</Sk></Line>
          <Line><Sk c="key">description:</Sk> <Sk c="val">How to write and run tests for this project</Sk></Line>
          <Line><Sk c="comment">---</Sk></Line>
          <Line>&nbsp;</Line>
          <Line><Sk c="heading"># Testing conventions</Sk></Line>
          <Line>&nbsp;</Line>
          <Line><Sk c="body">- Every new function gets a co-located `.test.ts` file</Sk></Line>
          <Line><Sk c="body">- Use `describe` / `it` blocks, not flat `test()` calls</Sk></Line>
          <Line><Sk c="body">- Mock external services with `vi.mock()`</Sk></Line>
          <Line><Sk c="body">- Run the full suite: `pnpm test`</Sk></Line>
          <Line>&nbsp;</Line>
          <Line><Sk c="heading"># Before committing</Sk></Line>
          <Line>&nbsp;</Line>
          <Line><Sk c="body">1. Run `pnpm test` and confirm zero failures</Sk></Line>
          <Line><Sk c="body">2. Check coverage is above 80%</Sk></Line>
          <Line><Sk c="body">3. Add snapshot tests for any new UI components</Sk></Line>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  3. The catalogue                                            */}
      {/* ============================================================ */}
      <SectionHeading title="The catalogue" />

      <div className="info-box mb-6">
        <p className="text-sm">
          These are ready-made skills you can add to your project. Each one comes with a terminal command you can copy and paste &mdash; it creates the skill file in the right folder automatically. Once it&apos;s there, Claude picks it up next time you start a session. No configuration, no setup menus.
        </p>
      </div>

      <div className="mb-10 space-y-6">
        <SkillGroup
          groupName="Document & output"
          skills={[
            { scope: "global", name: "Technical writer", desc: "Produces clean markdown docs, READMEs, and changelogs in your preferred style", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/technical-writer.md" },
            { scope: "global", name: "Blog post drafter", desc: "Turns bullet-point outlines into long-form blog posts with SEO headings", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/blog-drafter.md" },
            { scope: "project", name: "API doc generator", desc: "Reads route handlers and outputs OpenAPI-flavoured markdown", install: "mkdir -p .claude/skills && cat > .claude/skills/api-docs.md" },
            { scope: "project", name: "Changelog builder", desc: "Generates changelogs from commit history following keep-a-changelog format", install: "mkdir -p .claude/skills && cat > .claude/skills/changelog.md" },
          ]}
        />
        <SkillGroup
          groupName="Design & frontend"
          skills={[
            { scope: "global", name: "Tailwind component builder", desc: "Builds accessible, responsive components using your Tailwind config", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/tailwind-builder.md" },
            { scope: "project", name: "Design-system enforcer", desc: "Validates that new UI matches your token palette, spacing scale, and type ramp", install: "mkdir -p .claude/skills && cat > .claude/skills/design-enforcer.md" },
          ]}
        />
        <SkillGroup
          groupName="SEO & marketing"
          skills={[
            { scope: "global", name: "Meta-tag optimizer", desc: "Generates title, description, and OG tags following latest best practices", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/meta-tags.md" },
            { scope: "global", name: "Schema markup writer", desc: "Adds JSON-LD structured data for articles, products, FAQs, and more", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/schema-markup.md" },
          ]}
        />
        <SkillGroup
          groupName="Database & code"
          skills={[
            { scope: "project", name: "Migration author", desc: "Writes reversible SQL migrations following your naming and style conventions", install: "mkdir -p .claude/skills && cat > .claude/skills/migrations.md" },
            { scope: "global", name: "Type-safe query builder", desc: "Generates Drizzle / Prisma queries with full TypeScript types", install: "mkdir -p ~/.claude/skills && cat > ~/.claude/skills/query-builder.md" },
          ]}
        />
        <SkillGroup
          groupName="Project-specific"
          skills={[
            { scope: "project", name: "Deploy checklist", desc: "Runs your pre-deploy checks: tests, lint, build, env validation", install: "mkdir -p .claude/skills && cat > .claude/skills/deploy-checklist.md" },
            { scope: "project", name: "PR reviewer", desc: "Reviews pull requests against your team's code-quality rubric", install: "mkdir -p .claude/skills && cat > .claude/skills/pr-reviewer.md" },
            { scope: "project", name: "Incident responder", desc: "Reads error logs, identifies root cause, and drafts a fix PR", install: "mkdir -p .claude/skills && cat > .claude/skills/incident-responder.md" },
          ]}
        />
      </div>

      {/* ============================================================ */}
      {/*  4. Where to find community skills                           */}
      {/* ============================================================ */}
      <SectionHeading title="Where to find community skills" />

      <div className="mb-10 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        {COMMUNITY_SOURCES.map((s) => (
          <div key={s.name} className="rounded-xl border border-border bg-surface p-5 card-lift gradient-purple">
            <p className="mb-1 text-sm font-medium text-foreground">{s.name}</p>
            <p className="mb-2 break-all font-mono text-[11px] text-secondary">{s.url}</p>
            <p className="mb-3 text-xs text-muted">{s.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span key={t} className="tag text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/*  5. How to vet a community skill                             */}
      {/* ============================================================ */}
      <SectionHeading title="How to vet a community skill" />

      <div className="mb-12 space-y-4">
        {VET_STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 gradient-blue">
            <span
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs text-white"
              style={{ backgroundColor: VET_COLORS[i] }}
            >
              {i + 1}
            </span>
            <div>
              <p className="mb-0.5 text-sm font-medium text-foreground">{step.title}</p>
              <p className="text-xs text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Warning callout ---- */}
      <div className="warn-box mb-10">
        <p className="mb-1 text-sm font-medium">Security warning</p>
        <p className="text-xs">
          A skill is a prompt — and prompts can instruct Claude to run shell
          commands, read files, or call APIs. Never install a skill you
          haven&apos;t read. Treat unknown skills with the same caution you
          would treat an unknown npm package.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  6. How skills compound                                      */}
      {/* ============================================================ */}
      <SectionHeading title="How skills compound" />

      <div className="grid gap-3 sm:grid-cols-2">
        {COMPOUND_CARDS.map((c) => {
          const compoundGradientMap: Record<string, string> = {
            secondary: "gradient-blue",
            primary: "gradient-peach",
            warning: "gradient-amber",
            success: "gradient-green",
          };
          return (
          <div key={c.title} className={`bento-cell card-lift ${compoundGradientMap[c.color] || ""}`}>
            <p className={`mb-2 font-mono text-[10px] uppercase tracking-wider text-${c.color}`}>
              {c.tag}
            </p>
            <p className="mb-1 text-sm font-medium text-foreground">{c.title}</p>
            <p className="text-xs text-muted">{c.desc}</p>
          </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COMMUNITY_SOURCES = [
  {
    name: "Anthropic official",
    url: "github.com/anthropics/claude-skills",
    desc: "First-party skills maintained by the Claude team. Highest trust level.",
    tags: ["official", "verified"],
  },
  {
    name: "SkillsMP",
    url: "skillsmp.com",
    desc: "Community marketplace with ratings, reviews, and one-click install.",
    tags: ["marketplace", "rated"],
  },
  {
    name: "VoltAgent",
    url: "voltagent.dev/skills",
    desc: "Open-source agent framework with a growing skills registry.",
    tags: ["open-source", "framework"],
  },
  {
    name: "agentskill.sh",
    url: "agentskill.sh",
    desc: "Curated directory of production-tested skills with usage stats.",
    tags: ["curated", "stats"],
  },
  {
    name: "Cursor marketplace",
    url: "cursor.com/marketplace",
    desc: "Skills packaged as Cursor extensions for drag-and-drop setup.",
    tags: ["editor", "extensions"],
  },
  {
    name: "Your own toolkit repo",
    url: "github.com/you/claude-skills",
    desc: "Fork a starter template and build a private collection your team shares.",
    tags: ["private", "team"],
  },
];

const VET_STEPS = [
  {
    title: "Read the entire file",
    desc: "Skills are short markdown — there is no excuse not to read every line before installing.",
  },
  {
    title: "Check for shell commands",
    desc: "Search for backtick-wrapped commands. Make sure none are destructive (rm -rf, DROP TABLE, etc.).",
  },
  {
    title: "Look for exfiltration patterns",
    desc: "Watch for instructions that ask Claude to send data to external URLs or unknown APIs.",
  },
  {
    title: "Test in a sandbox first",
    desc: "Run the skill in an isolated project or branch before using it on production code.",
  },
  {
    title: "Pin to a commit hash",
    desc: "If you install from a git repo, pin to a specific commit so upstream changes don't surprise you.",
  },
];

const VET_COLORS = ["#80A1C1", "#E8956B", "#D97706", "#16A34A", "#6B7280"];

const COMPOUND_CARDS = [
  {
    tag: "week 1",
    color: "secondary",
    title: "Day one",
    desc: "You install one testing skill. Claude writes tests the way you like them.",
  },
  {
    tag: "month 1",
    color: "primary",
    title: "After first project",
    desc: "You have five skills — testing, docs, deploy, lint, and PR review. Each session starts smarter.",
  },
  {
    tag: "month 6",
    color: "warning",
    title: "Six months in",
    desc: "Your skills library is a living knowledge base. New team members onboard in minutes, not days.",
  },
  {
    tag: "the rule",
    color: "success",
    title: "The rule",
    desc: "Every hour you spend writing a skill saves ten hours across its lifetime. The ROI only grows.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({ title }: { title: string }) {
  return <h2 className="mb-4 text-lg font-bold text-foreground">{title}</h2>;
}

function SkillGroup({
  groupName,
  skills,
}: {
  groupName: string;
  skills: { scope: "global" | "project"; name: string; desc: string; install: string }[];
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        {groupName}
      </p>
      <div className="space-y-2">
        {skills.map((s) => (
          <div
            key={s.name}
            className="rounded-xl border border-border bg-surface px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 tag text-[10px] font-mono ${
                  s.scope === "global" ? "tag-secondary" : "tag-primary"
                }`}
              >
                {s.scope}
              </span>
              <span className="whitespace-nowrap text-sm font-medium text-foreground">
                {s.name}
              </span>
              <span className="hidden text-xs text-muted sm:inline flex-1">{s.desc}</span>
            </div>
            <button
              onClick={() => copy(s.install)}
              className="mt-2 w-full group flex items-center gap-2 rounded-lg bg-[#1E1E2E] px-3 py-2 font-mono text-[11px] text-[#CDD6F4] text-left cursor-pointer hover:bg-[#252436] transition-colors"
            >
              <span className="text-[#A6E3A1]">$</span>
              <span className="flex-1 truncate">{s.install}</span>
              <span className={`shrink-0 text-[10px] transition-colors ${
                copied === s.install ? "text-[#A6E3A1]" : "text-[#585B70] group-hover:text-[#CDD6F4]"
              }`}>
                {copied === s.install ? "✓ copied" : "copy"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Syntax-colored spans for the skill anatomy block */
function Line({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Sk({ c, children }: { c: string; children: React.ReactNode }) {
  const colorMap: Record<string, string> = {
    comment: "text-muted",
    key: "text-primary",
    val: "text-secondary",
    heading: "text-warning",
    body: "text-foreground",
  };
  return <span className={colorMap[c] || "text-foreground"}>{children}</span>;
}
