"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainLinks = [
  { href: "/", label: "Home" },
  {
    href: "/get-started",
    label: "Get Started",
    children: [
      { href: "/terms", label: "Learn the Terms" },
      { href: "/setup", label: "Project Setup" },
      { href: "/workflow", label: "With vs Without" },
    ],
  },
  { href: "/process", label: "6-Step Process" },
  { href: "/flows", label: "Agents" },
  { href: "/skills", label: "Skills" },
];

// Flat list for mobile
const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/get-started", label: "Get Started" },
  { href: "/terms", label: "Learn the Terms", indent: true },
  { href: "/setup", label: "Project Setup", indent: true },
  { href: "/workflow", label: "With vs Without", indent: true },
  { href: "/process", label: "6-Step Process" },
  { href: "/flows", label: "Agents" },
  { href: "/skills", label: "Skills" },
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

function CheatSheetButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-cheatsheet"))}
      className={`flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-[rgba(255,255,255,0.5)] transition-all duration-200 cursor-pointer ${className || ""}`}
      title="Command cheat sheet"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4.5 7L6.5 8.5L4.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function NavDropdown({
  href,
  label,
  items,
  pathname,
  className,
}: {
  href: string;
  label: string;
  items: { href: string; label: string }[];
  pathname: string;
  className: string;
}) {
  return (
    <div className="nav-dropdown relative flex items-center">
      <Link href={href} className={className}>
        {label}
      </Link>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className="text-muted/50 -ml-1 mt-px nav-dropdown-chevron"
      >
        <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="nav-dropdown-menu absolute top-full left-0 mt-0 py-2 min-w-[180px] rounded-xl bg-white border border-border2 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] z-50">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 text-[12px] font-medium transition-colors duration-150 hover:bg-surface2 mx-1 rounded-lg ${
                isActive ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
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

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center flex-1 overflow-visible">
          {mainLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            // Check if any child is active
            const childActive = link.children?.some((c) => pathname.startsWith(c.href));

            const linkClasses = `nav-link px-3.5 py-4 text-[11.5px] font-medium whitespace-nowrap tracking-[0.06em] uppercase transition-colors duration-200 ${
              isActive || childActive
                ? "active text-foreground"
                : "text-muted/70 hover:text-foreground"
            }`;

            if (link.children) {
              return (
                <NavDropdown
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  items={link.children}
                  pathname={pathname}
                  className={linkClasses}
                />
              );
            }

            return (
              <Link key={link.href} href={link.href} className={linkClasses}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop utility buttons */}
        <div className="hidden sm:flex items-center gap-1 ml-auto">
          <CheatSheetButton />
          <SearchButton />
        </div>

        {/* Mobile: cheatsheet + search + hamburger */}
        <div className="flex sm:hidden items-center gap-1 ml-auto">
          <CheatSheetButton />
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

      {/* Mobile slide-out menu */}
      <div
        className={`fixed inset-0 z-[60] sm:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] max-w-[85vw] border-l border-border flex flex-col transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "#FFFFFF", boxShadow: "-8px 0 30px rgba(0,0,0,0.12)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Logo />
              <span className="version-pill text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded-full">
                v1.0
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-foreground hover:bg-surface2 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-5 py-3">
            {mobileLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 text-[14px] font-medium border-b border-border transition-colors duration-200 ${
                    link.indent ? "pl-5 text-[13px]" : ""
                  } ${
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.indent && <span className="text-muted/30 mr-2">—</span>}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="px-5 py-4 border-t border-border space-y-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => window.dispatchEvent(new CustomEvent("open-cheatsheet")), 100);
              }}
              className="glass-btn w-full rounded-xl px-4 py-2.5 text-[13px] font-medium text-center cursor-pointer"
            >
              Command Cheat Sheet
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => window.dispatchEvent(new CustomEvent("open-search")), 100);
              }}
              className="glass-btn w-full rounded-xl px-4 py-2.5 text-[13px] font-medium text-center cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
