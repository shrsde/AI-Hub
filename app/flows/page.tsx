export default function FlowsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-12">
      {/* ── Hero ── */}
      <section className="mb-10">
        <div className="glass-card px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-1.5">
              What the **** are Agents?
            </h1>
            <p className="text-muted text-[13px] leading-relaxed max-w-lg">
              Agents are AI workers that do things on their own. You give them a job, they figure out the steps, and come back with the finished work. Less &ldquo;chatbot,&rdquo; more &ldquo;intern who actually gets stuff done.&rdquo;
            </p>
          </div>
          <span className="text-4xl opacity-20 hidden sm:block">⬡</span>
        </div>
      </section>

      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
        How agents work
      </p>
      <h2 className="mb-1 text-2xl font-extrabold leading-tight">
        Four automation patterns
      </h2>
      <p className="mb-10 max-w-[640px] text-sm text-muted">
        Every agent workflow fits one of these four patterns. Learn them once
        and you can design any automation.
      </p>

      <div className="space-y-8">
        {/* ════ Pattern 1: Parallel specialists ════ */}
        <section className="grid md:grid-cols-2 gap-4 items-start">
          <PatternCard
            color="primary"
            number="01"
            name="Parallel specialists"
            tagline="Divide the work, multiply the speed"
            description="Break a task into independent sub-tasks and hand each one to a specialist agent running in parallel. When they all finish, a coordinator merges results into a single deliverable."
            howItWorks="You define a coordinator prompt that decomposes the task, spawns N agents (each with its own skill), waits for all to resolve, then stitches outputs together."
            howToUse="Tell Claude to split your task into independent pieces. Each piece gets its own agent working at the same time. You review one combined result at the end instead of managing each piece yourself."
            example='You say: "Build the settings page." Claude splits it into three parallel agents — one builds the form UI, one writes the API route, one handles the database schema. All three work simultaneously, then Claude merges them into a single working feature.'
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
        <section className="grid md:grid-cols-2 gap-4 items-start">
          <PatternCard
            color="secondary"
            number="02"
            name="Event triggered"
            tagline="Sleep until the world changes"
            description="The agent sits dormant until an external event — a webhook, a file change, a new database row — wakes it up. It runs its checks and takes action only when needed."
            howItWorks="An event source (GitHub webhook, file watcher, cron-triggered poll) fires a signal. The agent wakes, reads context, runs its skill chain, and branches based on findings."
            howToUse="Set up a trigger — like a GitHub notification or a file change — and attach an agent to it. The agent sleeps until that trigger fires, then handles it automatically. You only get involved if something goes wrong."
            example='A teammate opens a pull request on GitHub. The agent automatically wakes up, reads the code changes, runs your quality checklist, and posts a review comment — all before you even see the notification.'
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
        <section className="grid md:grid-cols-2 gap-4 items-start">
          <PatternCard
            color="warning"
            number="03"
            name="Scheduled (always-on)"
            tagline="Set the clock, forget the rest"
            description="A cron schedule fires the agent at regular intervals. It reads from live sources, processes data, and pushes outputs to multiple destinations — no human trigger needed."
            howItWorks="A cron expression (or platform scheduler) triggers the agent. It reads from APIs, databases, or files, processes in parallel, and delivers outputs to Slack, email, dashboards, etc."
            howToUse="Pick a schedule — daily, hourly, whatever fits. The agent runs on that clock automatically, checks your systems, and sends you a summary. Like having an assistant who checks in every morning without being asked."
            example='Every morning at 8am, the agent scans your project — checks for open issues, reviews overnight commits, flags anything that looks risky, and drops a plain English summary in your Slack channel before you start work.'
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
        <section className="grid md:grid-cols-2 gap-4 items-start">
          <PatternCard
            color="success"
            number="04"
            name="Self-correcting loop"
            tagline="Make, check, fix, repeat"
            description="The agent makes a change, runs a quality check against it, and if the check fails, loops back to fix the issue. It only emits output once quality passes."
            howItWorks="The agent generates output, pipes it through a validator (tests, linter, type-checker, LLM-as-judge). If validation fails, the error is fed back as context and the agent retries — up to a configurable limit."
            howToUse="Let the agent write code, then automatically test it. If the tests fail, the agent reads the error, fixes the problem, and tries again — repeating until everything passes. You get clean, working output without babysitting."
            example='You ask Claude to add a new API endpoint. It writes the code, runs the tests, sees two failures, reads the error messages, fixes both issues, runs the tests again — they pass — and hands you a working endpoint. You never saw the intermediate mistakes.'
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
  howToUse,
  example,
}: {
  color: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  howItWorks: string;
  howToUse: string;
  example: string;
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
      className={`overflow-hidden rounded-2xl border border-border card-lift h-full ${borderMap[color] || ""} ${gradientMap[color] || ""}`}
    >
      <div className="p-5">
        <div className="mb-2 flex items-center gap-3">
          <span className={`font-mono text-xs text-${color} opacity-50`}>{number}</span>
          <h2 className={`text-[15px] font-semibold text-${color}`}>{name}</h2>
        </div>
        <p className="mb-3 font-mono text-[11px] text-muted/60">{tagline}</p>
        <p className="mb-4 text-sm text-foreground/90 leading-relaxed">{description}</p>
        <div className="rounded-xl bg-white/60 backdrop-blur-sm border border-border p-4 mb-3">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            How it works
          </p>
          <p className="text-[13px] text-muted leading-relaxed">{howItWorks}</p>
        </div>

        <div className="rounded-xl bg-white/40 backdrop-blur-sm border border-border p-4 mb-3">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            How to use it
          </p>
          <p className="text-[13px] text-foreground/80 leading-relaxed">{howToUse}</p>
        </div>

        <div className="rounded-xl bg-white/30 backdrop-blur-sm border border-border p-4">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Real example
          </p>
          <p className="text-[13px] text-foreground/80 leading-relaxed italic">{example}</p>
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
      className={`rounded-2xl border ${borderMap[color] || "border-border"} bg-gradient-to-b ${bgMap[color] || ""} p-5 sm:p-6 h-full flex flex-col justify-center`}
    >
      <div className="mx-auto max-w-[340px] w-full flex flex-col items-stretch">
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
    primary: "bg-white shadow-[0_2px_8px_rgba(26,26,46,0.12)]",
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
  const pad = size === "sm" ? "px-2.5 py-2" : "px-3 py-2.5";
  const textSize = size === "sm" ? "text-[11px]" : "text-[12px]";

  return (
    <div
      className={`rounded-xl border ${dashedBorder} ${colorMap[color]} ${bgMap[color]} ${highlightRing} ${pad} text-center`}
    >
      <div className="flex items-center justify-center gap-1.5">
        {icon && <span className="text-[13px] opacity-70">{icon}</span>}
        <p className={`${textSize} font-medium`}>{label}</p>
      </div>
      {sub && <p className="text-[10px] text-muted mt-0.5">{sub}</p>}
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
    <div className={`rounded-xl border ${s.border} ${s.bg} ${s.shadow} p-3 text-center relative`}>
      <p className={`text-[12px] font-semibold ${s.text}`}>{title}</p>
      <p className="text-[10px] text-muted mt-0.5">{sub}</p>
      {loop && (
        <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-[10px] text-danger">↺</span>
      )}
    </div>
  );
}

/* ── Connectors ───────────────────────────────────────── */

function Arrow() {
  return (
    <div className="flex flex-col items-center py-0.5">
      <div className="w-px h-4 bg-border2" />
      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-border2" />
    </div>
  );
}

function FanOut() {
  return (
    <div className="py-0.5">
      <div className="mx-auto w-px h-2 bg-border2" />
      <div className="mx-auto flex items-center" style={{ width: "80%" }}>
        <div className="flex-1 h-px bg-border2" />
        <div className="w-px h-2 bg-border2" />
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
    <div className="py-0.5">
      <div className="flex justify-between px-[10%]">
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-border2" />
      </div>
      <div className="mx-auto flex items-center" style={{ width: "80%" }}>
        <div className="flex-1 h-px bg-border2" />
        <div className="w-px h-2 bg-border2" />
        <div className="flex-1 h-px bg-border2" />
      </div>
      <div className="mx-auto w-px h-2 bg-border2" />
      <div className="flex justify-center">
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-border2" />
      </div>
    </div>
  );
}

function LoopArrow() {
  return (
    <div className="flex items-center gap-1 text-danger/50">
      <svg width="50" height="22" viewBox="0 0 60 28" fill="none" className="text-danger/40">
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
    <p className="text-center text-[10px] italic text-muted/70 py-0.5">{text}</p>
  );
}
