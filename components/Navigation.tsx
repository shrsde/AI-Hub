"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/get-started", label: "Get Started" },
  { href: "/terms", label: "Terms" },
  { href: "/setup", label: "Project Setup" },
  { href: "/process", label: "6-Step Process" },
  { href: "/skills", label: "Skills" },
  { href: "/workflow", label: "With vs Without" },
  { href: "/flows", label: "Agent Flows" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-xl bg-[rgba(255,255,255,0.85)]">
      <div className="flex items-center gap-0 overflow-x-auto px-6 scrollbar-none max-w-[1100px] mx-auto">
        <Link
          href="/"
          className="text-[16px] font-bold italic text-foreground whitespace-nowrap pr-5 py-4 border-r border-border mr-2 tracking-tight"
        >
          AI Hub
        </Link>
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link px-3.5 py-4 text-[12px] font-medium whitespace-nowrap tracking-wide uppercase ${
                isActive
                  ? "active text-primary"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
