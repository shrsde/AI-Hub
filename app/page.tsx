import Link from "next/link";

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
  { num: 1, title: "Plan", glyph: "◎", href: "/process" },
  { num: 2, title: "Set up", glyph: "◧", href: "/setup" },
  { num: 3, title: "Build", glyph: "▸", href: "/process" },
  { num: 4, title: "Agents", glyph: "⬡", href: "/flows" },
  { num: 5, title: "Ship", glyph: "△", href: "/process" },
  { num: 6, title: "Learn", glyph: "↻", href: "/skills" },
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

export default function Home() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-12 sm:py-16">
      {/* ── Hero ──────────────────────────────── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main hero */}
          <div className="md:col-span-2 bento-featured bento-cell flex flex-col justify-center" style={{ padding: "36px 32px" }}>
            <span className="tag tag-primary mb-4 self-start text-[11px]">
              For non-technical founders &amp; builders
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Claude for{" "}
              <span className="text-primary font-extrabold">absolute beginners</span>
            </h1>
            <p className="mt-3 text-muted text-[15px] leading-relaxed max-w-md">
              From &ldquo;what is Claude Code?&rdquo; to running parallel AI agents — explained in plain English.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="glass-btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium"
              >
                Get Started &rarr;
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
                  className="glass-cell group rounded-xl px-2 py-3 text-center transition-all duration-300 ease-out hover:shadow-md hover:border-border2"
                >
                  <span className="block text-base text-muted/50 group-hover:text-primary transition-colors duration-300">
                    {step.glyph}
                  </span>
                  <p className="text-[10px] font-semibold text-foreground/70 group-hover:text-foreground mt-1 transition-colors duration-300">
                    {step.title}
                  </p>
                  <span className="block h-0.5 w-0 mx-auto mt-1.5 rounded-full bg-primary/40 group-hover:w-4 transition-all duration-300" />
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
