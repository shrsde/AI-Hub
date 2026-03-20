import Link from "next/link";

const navLinks = [
  { href: "/get-started", label: "Get Started" },
  { href: "/terms", label: "Terms" },
  { href: "/setup", label: "Setup" },
  { href: "/process", label: "Process" },
  { href: "/skills", label: "Skills" },
  { href: "/workflow", label: "Workflow" },
  { href: "/flows", label: "Flows" },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.4)] backdrop-blur-2xl bg-[rgba(255,255,255,0.55)] shadow-[0_-1px_12px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.3)]">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Top row — logo + nav */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="nav-logo text-[17px] font-extrabold italic tracking-[0.04em] text-foreground">
              AI<span className="text-secondary/40 mx-[1px]">·</span>HUB
            </span>
            <span className="version-pill text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full">
              v1.0
            </span>
          </Link>

          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-muted/70 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
          <p>&copy; {new Date().getFullYear()} AI Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for non-technical builders</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Powered by Claude</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
