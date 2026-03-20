export type ContentEntry = {
  page: string;
  path: string;
  section: string;
  content: string;
  keywords: string;
};

export const contentIndex: ContentEntry[] = [
  // ── Home ──────────────────────────────────────────
  {
    page: "Home",
    path: "/",
    section: "Hero",
    content:
      "AI Hub is a structured learning path for non-technical founders and builders. It covers Claude Code from absolute beginner to running parallel AI agents — explained in plain English with no code required.",
    keywords: "home landing introduction beginner start",
  },
  {
    page: "Home",
    path: "/",
    section: "What is this hub?",
    content:
      "The hub offers plain English explanations with real analogies, step-by-step instructions from opening your terminal to running agents, a scalable process from single prompts to multi-agent orchestration, and a path from one helper to a full parallel agent team.",
    keywords: "about features overview purpose",
  },
  {
    page: "Home",
    path: "/",
    section: "Suggested learning order",
    content:
      "The recommended order is: 1) Get Started (install tools), 2) Terms (24 terms explained), 3) Project Setup (5-layer architecture), 4) 6-Step Process (repeatable workflow), 5) Skills (teach AI your processes), 6) With vs Without (agents comparison), 7) Agent Flows (four automation patterns).",
    keywords: "learning path order sequence navigation sections",
  },

  // ── Get Started ───────────────────────────────────
  {
    page: "Get Started",
    path: "/get-started",
    section: "What to install",
    content:
      "Required: Node.js (JavaScript runtime, install with brew install node), Claude Code (npm install -g @anthropic-ai/claude-code), and Git (version control, brew install git). Recommended: Cursor editor, GitHub account, and Anthropic account.",
    keywords: "install node git requirements prerequisites setup",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "The terminal",
    content:
      "Open Terminal on Mac with Cmd+Space, type Terminal, hit Enter. Five essential commands: cd (change directory), ls (list files), mkdir (create folder), pwd (print working directory), claude (start Claude Code).",
    keywords: "terminal commands cd ls mkdir pwd mac open",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "Install Claude Code",
    content:
      "Install globally with npm install -g @anthropic-ai/claude-code. Verify with claude --version. Optionally install the Cursor extension via Cmd+Shift+X, search Claude Code, click Install.",
    keywords: "install claude code npm global cursor extension",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "Your first session",
    content:
      "Create a folder, init git, and run claude. Essential shortcuts: Escape (cancel), Ctrl+R (retry), /model (switch model), /clear (reset context), /help (show commands), Up arrow (prompt history).",
    keywords: "first session start shortcuts escape model clear help",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "Set up your project",
    content:
      "Create a CLAUDE.md file in your project root. Include project overview, tech stack, conventions, and things to avoid. When Claude starts and shows 'Loaded CLAUDE.md', your project context is active.",
    keywords: "claude.md project setup instructions context configuration",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "Going further",
    content:
      "Next steps: Read the Process page, try a 3-prompt session (plan, build, review), experiment with /model to switch between Sonnet and Opus. Multi-agent work uses git worktrees for parallel sessions.",
    keywords: "next steps further worktree parallel multi-agent",
  },
  {
    page: "Get Started",
    path: "/get-started",
    section: "Troubleshooting",
    content:
      "Common issues: 'npm: command not found' means install Node.js. 'claude: command not found' means reinstall CLI and restart terminal. Permission denied means use sudo. CLAUDE.md not picked up means check file name and location.",
    keywords: "troubleshooting errors fix npm command not found permission",
  },

  // ── Terms ─────────────────────────────────────────
  {
    page: "Terms",
    path: "/terms",
    section: "Plain English glossary",
    content:
      "A searchable and filterable glossary of 24+ AI and Claude Code terms. Categories: Context & instructions, Tools & skills, Agents & roles, Infrastructure, and Process. Each term includes a plain English definition and a real-world analogy.",
    keywords: "glossary terms definitions vocabulary reference dictionary",
  },
  {
    page: "Terms",
    path: "/terms",
    section: "Context & instructions terms",
    content:
      "Claude Code is an AI assistant in your terminal. CLAUDE.md is your project instruction file. Global vs project files control scope. Context window is the AI's working memory size. Vibe coding means building by describing what you want in English.",
    keywords: "claude code claude.md context window vibe coding",
  },
  {
    page: "Terms",
    path: "/terms",
    section: "Tools & skills terms",
    content:
      "Skills are markdown instruction files that teach Claude specific workflows. Community skills are pre-built skills from GitHub. MCP (Model Context Protocol) connects AI to external systems. MCP servers are individual connections to databases, APIs, etc. Prompt injection is a security risk from hidden instructions.",
    keywords: "skill mcp model context protocol server prompt injection",
  },
  {
    page: "Terms",
    path: "/terms",
    section: "Agents & roles terms",
    content:
      "Subagents are separate AI instances for specific jobs. Orchestrator is the main AI that manages the task. Always-on agents run automatically on triggers or schedules. Hooks are rules that fire after every AI action. .cursorrules is the Cursor equivalent of CLAUDE.md.",
    keywords: "subagent orchestrator always-on hook agent role",
  },
  {
    page: "Terms",
    path: "/terms",
    section: "Infrastructure terms",
    content:
      "Database stores app data (Supabase, Postgres). Deployment platform makes code live (Vercel). Version control (GitHub) saves code history. API routes are server URLs your app calls. Environment variables store secrets outside code. Personal toolkit repo stores reusable AI assets.",
    keywords: "database deployment github api route environment variable toolkit",
  },

  // ── Project Setup ─────────────────────────────────
  {
    page: "Project Setup",
    path: "/setup",
    section: "The five layers",
    content:
      "Layer 1: CLAUDE.md instructions (project context). Layer 2: Skills library (reusable workflow bundles). Layer 3: Agent definitions (named agent profiles with personas and permissions). Layer 4: MCP server connections (live access to databases, APIs, files). Layer 5: Community skills and marketplace plugins.",
    keywords: "layers setup architecture claude.md skills agents mcp community",
  },
  {
    page: "Project Setup",
    path: "/setup",
    section: "What your AI can reach",
    content:
      "Claude can reach: your project files (read, create, edit, delete), live data (database via MCP), code history (GitHub commits, branches, PRs), session scratchpad (temporary notes), live internet data (web search), and your live environment (deploys, builds, logs).",
    keywords: "reach access files database github web deploy capabilities",
  },
  {
    page: "Project Setup",
    path: "/setup",
    section: "Where your data lives",
    content:
      "Data lives across: Database (Supabase, Postgres, SQLite), File storage (local, S3, cloud), Deployment (Vercel, Railway, Fly.io), GitHub (repos, issues, PRs, Actions), API services (Stripe, Resend, OpenAI), and Local machine (terminal, file system, env vars).",
    keywords: "data storage database files deployment github api local",
  },

  // ── 6-Step Process ────────────────────────────────
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 1 — Before you open the AI",
    content:
      "Define the problem in one sentence from the user's perspective. Write the user flow step by step. Decide what data you need to store. Set your scope boundary — list what this phase does NOT include.",
    keywords: "planning define problem user flow data scope before start",
  },
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 2 — Set up the layers",
    content:
      "Write your CLAUDE.md with tech stack, file structure, naming rules, and constraints. Copy skills into .claude/skills/. Copy agents into .claude/agents/. Create .mcp.json for external tools. Verify everything loaded with /skills and /tools.",
    keywords: "setup layers claude.md skills agents mcp verify",
  },
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 3 — Start building",
    content:
      "Run the feature-planner agent first for a phased build plan. Review the plan before building. Build in small steps — one prompt per step. Test yourself after each step. Keep your instruction file current.",
    keywords: "building prompts small steps test review planner",
  },
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 4 — Use agents for big tasks",
    content:
      "Use agents when task spans multiple files or needs parallel work. Rule of thumb: more than 3 prompts means consider an agent. Write a clear parallel brief. Review between agent steps — skipping review is the #1 cause of broken code.",
    keywords: "agents parallel big tasks brief review",
  },
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 5 — Before you ship",
    content:
      "Run the code-reviewer agent on your branch. Walk through the user flow from Phase 1. Check three states for every screen: empty, loaded, and error. Confirm no secrets (API keys, passwords, tokens) are committed in code.",
    keywords: "ship review code security secrets testing states",
  },
  {
    page: "6-Step Process",
    path: "/process",
    section: "Phase 6 — After the project",
    content:
      "Update your instruction file with new conventions. Add useful skills or agents to your shared collection. Write a 'what I learned' note. If you kept re-explaining something, extract it into a skill file.",
    keywords: "after project update learn improve skill extract",
  },

  // ── Skills ────────────────────────────────────────
  {
    page: "Skills",
    path: "/skills",
    section: "Two types of skill",
    content:
      "Global skills live in ~/.claude/skills/ and follow you across every project — personal conventions and defaults. Project skills live in [project]/.claude/skills/ and are committed to version control, shared by the whole team.",
    keywords: "global project skill types location scope team",
  },
  {
    page: "Skills",
    path: "/skills",
    section: "Skill anatomy",
    content:
      "A skill is a markdown file with YAML frontmatter (name and description) followed by instructions. Example: a testing skill with conventions, mock strategy, and pre-commit checklist.",
    keywords: "skill file format anatomy markdown frontmatter structure",
  },
  {
    page: "Skills",
    path: "/skills",
    section: "The catalogue",
    content:
      "Skill categories: Document & output (technical writer, blog drafter, API docs, changelog). Design & frontend (Tailwind builder, design-system enforcer). SEO & marketing (meta-tag optimizer, schema markup). Database & code (migration author, type-safe queries). Project-specific (deploy checklist, PR reviewer, incident responder).",
    keywords: "catalogue skills list categories docs design seo database deploy",
  },
  {
    page: "Skills",
    path: "/skills",
    section: "Community skills",
    content:
      "Sources: Anthropic official (github.com/anthropics/claude-skills), SkillsMP marketplace, VoltAgent, agentskill.sh, Cursor marketplace, and your own toolkit repo. Always vet community skills before installing.",
    keywords: "community marketplace sources install download third-party",
  },
  {
    page: "Skills",
    path: "/skills",
    section: "Vetting community skills",
    content:
      "Five steps: Read the entire file. Check for shell commands (no destructive ones). Look for exfiltration patterns (sending data to unknown URLs). Test in a sandbox first. Pin to a commit hash for stability. Never install a skill you haven't read.",
    keywords: "vet security review check safe trust community skill",
  },
  {
    page: "Skills",
    path: "/skills",
    section: "How skills compound",
    content:
      "Week 1: Install one testing skill. Month 1: Five skills (testing, docs, deploy, lint, PR review). Month 6: Living knowledge base, new team members onboard in minutes. The rule: every hour writing a skill saves ten hours across its lifetime.",
    keywords: "compound roi value grow library invest",
  },

  // ── With vs Without ───────────────────────────────
  {
    page: "With vs Without",
    path: "/workflow",
    section: "Side-by-side comparison",
    content:
      "Without agents: prompt, wait, read, copy, wait, fix, repeat — sequential and blocking. With agents: describe outcome, agents fan out in parallel (research, plan, build), you review a finished result.",
    keywords: "comparison without with agents sequential parallel",
  },
  {
    page: "With vs Without",
    path: "/workflow",
    section: "What actually changes",
    content:
      "Without: every task is sequential and blocking, attention consumed by mechanics, bottleneck is always you. With: work is decoupled and parallel, attention shifts to reviewing outcomes and decisions, bottleneck becomes clarity of thought.",
    keywords: "change difference bottleneck attention parallel sequential",
  },
  {
    page: "With vs Without",
    path: "/workflow",
    section: "The role you play",
    content:
      "Without agents you are the dispatcher — routing every message, tracking every thread, doing coordination by hand. With agents you become the director — setting vision, defining quality, making the calls that matter. The shift is from checking to deciding.",
    keywords: "role dispatcher director shift deciding checking",
  },

  // ── Agent Flows ───────────────────────────────────
  {
    page: "Agent Flows",
    path: "/flows",
    section: "Pattern 1 — Parallel specialists",
    content:
      "Divide work into independent sub-tasks, each handled by a specialist agent running in parallel. A coordinator decomposes the task, spawns agents, waits for all to finish, then merges results into one deliverable. You review once at the end.",
    keywords: "parallel specialist coordinator decompose merge fan-out",
  },
  {
    page: "Agent Flows",
    path: "/flows",
    section: "Pattern 2 — Event triggered",
    content:
      "Agent sits dormant until an external event wakes it — a webhook, file change, or new database row. It reads context, runs checks, and either alerts you about a problem or logs an all-clear and goes back to sleep.",
    keywords: "event triggered webhook file change wake dormant",
  },
  {
    page: "Agent Flows",
    path: "/flows",
    section: "Pattern 3 — Scheduled (always-on)",
    content:
      "A cron schedule fires the agent at regular intervals. It reads from live sources (APIs, databases, files), processes data in parallel, and delivers summaries to Slack, email, or dashboards. No human trigger needed.",
    keywords: "scheduled cron always-on automatic interval daily",
  },
  {
    page: "Agent Flows",
    path: "/flows",
    section: "Pattern 4 — Self-correcting loop",
    content:
      "Agent makes a change, runs a quality check (tests, linter, type-checker). If the check fails, the error feeds back as context and the agent retries. It only emits output once quality passes. Configurable retry limit.",
    keywords: "self-correcting loop retry quality check validate fix",
  },
];
