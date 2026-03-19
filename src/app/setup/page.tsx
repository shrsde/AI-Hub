/* ------------------------------------------------------------------ */
/*  Project Setup — /setup  (light bento design)                      */
/* ------------------------------------------------------------------ */

const LAYERS = [
  {
    num: 1,
    tag: "context",
    name: "CLAUDE.md instructions",
    desc: "A markdown file that tells Claude about your stack, conventions, and constraints. It is loaded automatically at the start of every session.",
    paths: ["~/.claude/CLAUDE.md", "/project/CLAUDE.md"],
    borderColor: "border-primary",
    tagClass: "tag tag-primary",
    gradient: "gradient-peach",
  },
  {
    num: 2,
    tag: "capability",
    name: "Skills library",
    desc: "Reusable prompt-and-tool bundles that teach Claude specific workflows — testing, deployment, database migrations, and more.",
    paths: [".claude/skills/", "~/.claude/skills/"],
    borderColor: "border-secondary",
    tagClass: "tag tag-secondary",
    gradient: "gradient-blue",
  },
  {
    num: 3,
    tag: "roles",
    name: "Agent definitions",
    desc: "Named agent profiles that combine a persona, a set of skills, and permission boundaries. Each agent focuses on one job.",
    paths: [".claude/agents/", "~/.claude/agents/"],
    borderColor: "border-warning",
    tagClass: "tag tag-warning",
    gradient: "gradient-amber",
  },
  {
    num: 4,
    tag: "access",
    name: "MCP server connections",
    desc: "Model Context Protocol servers that give Claude live access to databases, APIs, file systems, and other external services.",
    paths: ["/project/.mcp.json"],
    borderColor: "border-success",
    tagClass: "tag tag-success",
    gradient: "gradient-green",
  },
  {
    num: 5,
    tag: "extend",
    name: "Community skills + marketplace plugins",
    desc: "Third-party skills and plugins from the community marketplace. Drop them in and Claude gains new capabilities instantly.",
    paths: ["github.com / marketplace"],
    borderColor: "border-primary",
    tagClass: "tag tag-primary",
    gradient: "gradient-peach",
  },
];

const REACH_CARDS = [
  {
    tag: "filesystem",
    tagClass: "tag tag-secondary",
    title: "Your project files",
    desc: "Read, create, edit, and delete files anywhere in your project tree. Claude sees the same directory you do.",
    gradient: "gradient-blue",
  },
  {
    tag: "database",
    tagClass: "tag tag-primary",
    title: "Your live data",
    desc: "Query and modify your database through MCP connections — Postgres, SQLite, Supabase, and more.",
    gradient: "gradient-peach",
  },
  {
    tag: "github",
    tagClass: "tag tag-success",
    title: "Your code history",
    desc: "Browse commits, create branches, open pull requests, and review diffs without leaving the terminal.",
    gradient: "gradient-green",
  },
  {
    tag: "memory",
    tagClass: "tag tag-warning",
    title: "Session scratchpad",
    desc: "Claude can write and read temporary notes during a session to track decisions, plans, and intermediate results.",
    gradient: "gradient-amber",
  },
  {
    tag: "web search",
    tagClass: "tag tag-secondary",
    title: "Live internet data",
    desc: "Search the web for documentation, Stack Overflow answers, and package information in real time.",
    gradient: "gradient-blue",
  },
  {
    tag: "deployment",
    tagClass: "tag tag-danger",
    title: "Your live environment",
    desc: "Trigger deploys, check build status, and tail logs from Vercel, Railway, or your own CI pipeline.",
    gradient: "gradient-red",
  },
];

const DATA_CARDS = [
  {
    title: "Database",
    desc: "Supabase, Postgres, SQLite, or any database reachable through an MCP server or CLI.",
  },
  {
    title: "File storage",
    desc: "Local disk, S3 buckets, or cloud storage accessed via signed URLs and CLI tools.",
  },
  {
    title: "Deployment",
    desc: "Vercel, Railway, Fly.io — wherever your app is hosted and your builds run.",
  },
  {
    title: "GitHub",
    desc: "Repositories, issues, pull requests, Actions workflows, and the GitHub API.",
  },
  {
    title: "API services",
    desc: "Stripe, Resend, OpenAI, and any third-party service your project depends on.",
  },
  {
    title: "Local machine",
    desc: "Your terminal, file system, running processes, and environment variables.",
  },
];

export default function SetupPage() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-[960px] mx-auto">
        <p className="font-mono text-primary text-xs uppercase tracking-widest mb-2">
          Project configuration
        </p>
        <h1 className="font-sans font-extrabold text-2xl text-foreground leading-tight mb-1">
          Complete project setup layers
        </h1>
        <p className="text-muted text-sm max-w-xl mb-8 leading-relaxed">
          Five layers that turn Claude from a generic assistant into a project-aware team member.
        </p>

        {/* ------------------------------------------------------------ */}
        {/*  The five layers                                              */}
        {/* ------------------------------------------------------------ */}
        <h2 className="text-lg font-bold text-foreground mb-4">
          The five layers
        </h2>

        <div className="flex flex-col gap-3 mb-12">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.num}
              className={`bento-cell ${layer.gradient} animate-in border-l-[3px] ${layer.borderColor} flex flex-col gap-2`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`${layer.tagClass} self-start font-mono text-[10px] uppercase tracking-widest`}>
                Layer {layer.num} — {layer.tag}
              </span>
              <p className="font-semibold text-foreground text-[15px]">
                {layer.name}
              </p>
              <p className="text-muted text-[13px] leading-relaxed">
                {layer.desc}
              </p>
              {layer.paths.map((p) => (
                <p key={p} className="font-mono text-muted/50 text-[11px]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  What your AI can reach                                       */}
        {/* ------------------------------------------------------------ */}
        <h2 className="text-lg font-bold text-foreground mb-4">
          What your AI can reach
        </h2>

        <div className="bento-grid bento-grid-2 mb-12">
          {REACH_CARDS.map((card) => (
            <div
              key={card.title}
              className={`bento-cell ${card.gradient} card-lift flex flex-col gap-2`}
            >
              <span className={`${card.tagClass} self-start font-mono text-[10px] uppercase tracking-widest`}>
                {card.tag}
              </span>
              <p className="font-semibold text-foreground text-[15px]">
                {card.title}
              </p>
              <p className="text-muted text-[13px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Where your data lives                                        */}
        {/* ------------------------------------------------------------ */}
        <h2 className="text-lg font-bold text-foreground mb-4">
          Where your data lives
        </h2>

        <div className="bento-grid bento-grid-3">
          {DATA_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={`bento-cell ${i % 2 === 0 ? "gradient-blue" : "gradient-purple"} card-lift flex flex-col gap-2`}
            >
              <p className="font-semibold text-foreground text-[15px]">
                {card.title}
              </p>
              <p className="text-muted text-[13px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
