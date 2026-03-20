export default function FlowsPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-12">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
        How agents work
      </p>
      <h1 className="mb-1 text-2xl font-extrabold leading-tight">
        Four automation patterns
      </h1>
      <p className="mb-10 max-w-[640px] text-sm text-muted">
        Every agent workflow fits one of these four patterns. Learn them once
        and you can design any automation.
      </p>

      <div className="space-y-14">
        {/* ════ Pattern 1: Parallel specialists ════ */}
        <section>
          <PatternCard
            color="primary"
            number="01"
            name="Parallel specialists"
            tagline="Divide the work, multiply the speed"
            description="Break a task into independent sub-tasks and hand each one to a specialist agent running in parallel. When they all finish, a coordinator merges results into a single deliverable."
            howItWorks="You define a coordinator prompt that decomposes the task, spawns N agents (each with its own skill), waits for all to resolve, then stitches outputs together."
          />
          <FlowDiagram color="primary">
            <FNode label="You give one instruction" color="primary" icon="▶" />
            <Arrow />
            <FNode label="Coordinator decomposes task" color="muted" />
            <FanOut />
            <div className="grid grid-cols-3 gap-3">
              <FNode label="Specialist A" color="primary" sub="researches topic" size="sm" />
              <FNode label="Specialist B" color="primary" sub="reads existing work" size="sm" />
              <FNode label="Specialist C" color="primary" sub="checks for problems" size="sm" />
            </div>
            <FanIn />
            <FNode label="Combined report" color="muted" icon="◆" />
            <Arrow />
            <FNode label="You review once" color="primary" icon="✓" highlight />
          </FlowDiagram>
        </section>

        {/* ════ Pattern 2: Event triggered ════ */}
        <section>
          <PatternCard
            color="secondary"
            number="02"
            name="Event triggered"
            tagline="Sleep until the world changes"
            description="The agent sits dormant until an external event — a webhook, a file change, a new database row — wakes it up. It runs its checks and takes action only when needed."
            howItWorks="An event source (GitHub webhook, file watcher, cron-triggered poll) fires a signal. The agent wakes, reads context, runs its skill chain, and branches based on findings."
          />
          <FlowDiagram color="secondary">
            <FNode label="You are elsewhere" color="muted" icon="···" dashed />
            <Arrow />
            <FNode label="Event fires" color="secondary" sub="webhook · file change · new row" icon="⚡" />
            <Arrow />
            <FNode label="Agent wakes up" color="secondary" icon="↑" />
            <Arrow />
            <FNode label="Runs checks" color="secondary" />
            <Arrow />
            <FLabel text="decision point" />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <BranchNode variant="danger" title="Problem found" sub="Alerts you + attempts fix" />
              <BranchNode variant="success" title="All clear" sub="Logs result, goes back to sleep" />
            </div>
          </FlowDiagram>
        </section>

        {/* ════ Pattern 3: Scheduled ════ */}
        <section>
          <PatternCard
            color="warning"
            number="03"
            name="Scheduled (always-on)"
            tagline="Set the clock, forget the rest"
            description="A cron schedule fires the agent at regular intervals. It reads from live sources, processes data, and pushes outputs to multiple destinations — no human trigger needed."
            howItWorks="A cron expression (or platform scheduler) triggers the agent. It reads from APIs, databases, or files, processes in parallel, and delivers outputs to Slack, email, dashboards, etc."
          />
          <FlowDiagram color="warning">
            <FNode label="Clock fires" color="warning" sub="every day at 8am" icon="⏱" />
            <Arrow />
            <FNode label="Agent reads live sources" color="warning" />
            <FanOut />
            <div className="grid grid-cols-3 gap-3">
              <FNode label="What changed" color="warning" sub="plain English" size="sm" />
              <FNode label="Anything risky" color="warning" sub="flagged areas" size="sm" />
              <FNode label="Needs attention" color="warning" sub="open items" size="sm" />
            </div>
            <FanIn />
            <FNode label="Summary delivered" color="warning" sub="Slack · email · dashboard" icon="📬" highlight />
          </FlowDiagram>
        </section>

        {/* ════ Pattern 4: Self-correcting loop ════ */}
        <section>
          <PatternCard
            color="success"
            number="04"
            name="Self-correcting loop"
            tagline="Make, check, fix, repeat"
            description="The agent makes a change, runs a quality check against it, and if the check fails, loops back to fix the issue. It only emits output once quality passes."
            howItWorks="The agent generates output, pipes it through a validator (tests, linter, type-checker, LLM-as-judge). If validation fails, the error is fed back as context and the agent retries — up to a configurable limit."
          />
          <FlowDiagram color="success">
            <FNode label="Agent makes change" color="success" icon="✎" />
            <Arrow />
            <FNode label="Quality check runs" color="success" icon="⊘" />
            <Arrow />
            <FLabel text="result" />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <BranchNode variant="success" title="Passes" sub="Proceed to output" />
              <BranchNode variant="danger" title="Fails" sub="Feed error back → retry" loop />
            </div>
            <div className="flex justify-end pr-[25%] -mt-1">
              <LoopArrow />
            </div>
            <Arrow />
            <FNode label="Clean output delivered" color="success" icon="✓" highlight />
          </FlowDiagram>
        </section>
      </div>
    </div>
  );
}

/* ── Pattern description card ─────────────────────────── */

function PatternCard({
  color,
  number,
  name,
  tagline,
  description,
  howItWorks,
}: {
  color: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  howItWorks: string;
}) {
  const borderMap: Record<string, string> = {
    primary: "border-t-[3px] border-t-primary",
    secondary: "border-t-[3px] border-t-secondary",
    warning: "border-t-[3px] border-t-warning",
    success: "border-t-[3px] border-t-success",
  };
  const gradientMap: Record<string, string> = {
    primary: "gradient-peach",
    secondary: "gradient-blue",
    warning: "gradient-amber",
    success: "gradient-green",
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border card-lift ${borderMap[color] || ""} ${gradientMap[color] || ""}`}
    >
      <div className="p-5">
        <div className="mb-2 flex items-center gap-3">
          <span className={`font-mono text-xs text-${color} opacity-50`}>{number}</span>
          <h2 className={`text-[15px] font-semibold text-${color}`}>{name}</h2>
        </div>
        <p className="mb-3 font-mono text-[11px] text-muted/60">{tagline}</p>
        <p className="mb-4 text-sm text-foreground/90 leading-relaxed">{description}</p>
        <div className="rounded-xl bg-white/60 backdrop-blur-sm border border-border p-4">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            How it works
          </p>
          <p className="text-[13px] text-muted leading-relaxed">{howItWorks}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Flow diagram wrapper ─────────────────────────────── */

function FlowDiagram({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  const bgMap: Record<string, string> = {
    primary: "from-primary/[0.03] to-primary/[0.01]",
    secondary: "from-secondary/[0.03] to-secondary/[0.01]",
    warning: "from-warning/[0.03] to-warning/[0.01]",
    success: "from-success/[0.03] to-success/[0.01]",
  };
  const borderMap: Record<string, string> = {
    primary: "border-primary/10",
    secondary: "border-secondary/10",
    warning: "border-warning/10",
    success: "border-success/10",
  };

  return (
    <div
      className={`mt-4 rounded-2xl border ${borderMap[color] || "border-border"} bg-gradient-to-b ${bgMap[color] || ""} p-6 sm:p-8`}
    >
      <div className="mx-auto max-w-[420px] flex flex-col items-stretch">
        {children}
      </div>
    </div>
  );
}

/* ── Flow node ────────────────────────────────────────── */

function FNode({
  label,
  color = "muted",
  sub,
  icon,
  size = "md",
  highlight = false,
  dashed = false,
}: {
  label: string;
  color?: string;
  sub?: string;
  icon?: string;
  size?: "sm" | "md";
  highlight?: boolean;
  dashed?: boolean;
}) {
  const colorMap: Record<string, string> = {
    primary: "border-primary/25 text-primary",
    secondary: "border-secondary/25 text-secondary",
    warning: "border-warning/25 text-warning",
    success: "border-success/25 text-success",
    danger: "border-danger/25 text-danger",
    muted: "border-border2 text-foreground",
  };
  const bgMap: Record<string, string> = {
    primary: "bg-white shadow-[0_2px_8px_rgba(232,149,107,0.12)]",
    secondary: "bg-white shadow-[0_2px_8px_rgba(107,141,181,0.12)]",
    warning: "bg-white shadow-[0_2px_8px_rgba(217,119,6,0.10)]",
    success: "bg-white shadow-[0_2px_8px_rgba(22,163,74,0.10)]",
    danger: "bg-white shadow-[0_2px_8px_rgba(220,38,38,0.10)]",
    muted: "bg-white/80 shadow-sm",
  };
  const highlightRing = highlight
    ? "ring-2 ring-offset-2 ring-offset-transparent ring-current"
    : "";
  const dashedBorder = dashed ? "border-dashed" : "";
  const pad = size === "sm" ? "px-3 py-2.5" : "px-4 py-3";
  const textSize = size === "sm" ? "text-[12px]" : "text-[13px]";

  return (
    <div
      className={`rounded-xl border ${dashedBorder} ${colorMap[color]} ${bgMap[color]} ${highlightRing} ${pad} text-center`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="text-[14px] opacity-70">{icon}</span>}
        <p className={`${textSize} font-medium`}>{label}</p>
      </div>
      {sub && <p className="text-[11px] text-muted mt-0.5">{sub}</p>}
    </div>
  );
}

/* ── Branch node (pass/fail) ──────────────────────────── */

function BranchNode({
  variant,
  title,
  sub,
  loop = false,
}: {
  variant: "success" | "danger";
  title: string;
  sub: string;
  loop?: boolean;
}) {
  const styles = {
    success: {
      bg: "bg-gradient-to-br from-success/[0.08] to-success/[0.03]",
      border: "border-success/20",
      text: "text-success",
      shadow: "shadow-[0_2px_8px_rgba(22,163,74,0.08)]",
    },
    danger: {
      bg: "bg-gradient-to-br from-danger/[0.08] to-danger/[0.03]",
      border: "border-danger/20",
      text: "text-danger",
      shadow: "shadow-[0_2px_8px_rgba(220,38,38,0.08)]",
    },
  };
  const s = styles[variant];

  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} ${s.shadow} p-3.5 text-center relative`}>
      <p className={`text-[13px] font-semibold ${s.text}`}>{title}</p>
      <p className="text-[11px] text-muted mt-0.5">{sub}</p>
      {loop && (
        <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-[10px] text-danger">↺</span>
      )}
    </div>
  );
}

/* ── Connectors ───────────────────────────────────────── */

function Arrow() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-5 bg-border2" />
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-border2" />
    </div>
  );
}

function FanOut() {
  return (
    <div className="py-1">
      <div className="mx-auto w-px h-3 bg-border2" />
      <div className="mx-auto flex items-center" style={{ width: "80%" }}>
        <div className="flex-1 h-px bg-border2" />
        <div className="w-px h-3 bg-border2" />
        <div className="flex-1 h-px bg-border2" />
      </div>
      <div className="flex justify-between px-[10%]">
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-border2" />
      </div>
    </div>
  );
}

function FanIn() {
  return (
    <div className="py-1">
      <div className="flex justify-between px-[10%]">
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
      </div>
      <div className="mx-auto flex items-center" style={{ width: "80%" }}>
        <div className="flex-1 h-px bg-border2" />
        <div className="w-px h-3 bg-border2" />
        <div className="flex-1 h-px bg-border2" />
      </div>
      <div className="mx-auto w-px h-3 bg-border2" />
      <div className="flex justify-center">
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-border2" />
      </div>
    </div>
  );
}

function LoopArrow() {
  return (
    <div className="flex items-center gap-1 text-danger/50">
      <svg width="60" height="28" viewBox="0 0 60 28" fill="none" className="text-danger/40">
        <path
          d="M5 4 C5 4, 5 24, 30 24 C55 24, 55 4, 55 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
        />
        <path d="M2 6 L5 2 L8 6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
      <span className="text-[10px] font-mono text-danger/50">retry</span>
    </div>
  );
}

function FLabel({ text }: { text: string }) {
  return (
    <p className="text-center text-[11px] italic text-muted/70 py-0.5">{text}</p>
  );
}
