"use client";

import { useState, useEffect } from "react";
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

function Logo() {
  return (
    <span className="nav-logo text-[17px] font-extrabold italic tracking-[0.04em] text-foreground select-none">
      AI<span className="text-secondary/40 mx-[1px]">·</span>HUB
    </span>
  );
}

function SearchButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className={`flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-[rgba(255,255,255,0.5)] transition-all duration-200 cursor-pointer ${className || ""}`}
      title="Search (⌘K)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.4)] backdrop-blur-2xl bg-[rgba(255,255,255,0.55)] shadow-[0_1px_12px_rgba(0,0,0,0.03),inset_0_-1px_0_rgba(255,255,255,0.3)]">
      <div className="flex items-center gap-0 px-6 max-w-[1100px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 whitespace-nowrap pr-5 py-3 border-r border-border mr-2 group"
        >
          <Logo />
          <span className="version-pill text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full">
            v1.0
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center flex-1 overflow-x-auto scrollbar-none">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-3.5 py-4 text-[11.5px] font-medium whitespace-nowrap tracking-[0.06em] uppercase transition-colors duration-200 ${
                  isActive
                    ? "active text-foreground"
                    : "text-muted/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop search */}
        <SearchButton className="hidden sm:flex ml-auto" />

        {/* Mobile: search + hamburger */}
        <div className="flex sm:hidden items-center gap-1 ml-auto">
          <SearchButton />
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-[rgba(255,255,255,0.5)] transition-all duration-200 cursor-pointer"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background sm:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <Logo />
              <span className="version-pill text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full">
                v1.0
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-surface2 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-6 py-4">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-4 text-[15px] font-medium border-b border-border transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
