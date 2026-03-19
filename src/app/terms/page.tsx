"use client";

import { useState } from "react";
import { terms, categories } from "@/data/terms";

const borderByNum: Record<number, string> = {
  1: "border-l-primary",
  2: "border-l-secondary",
  3: "border-l-warning",
  4: "border-l-success",
};

const gradientByNum: Record<number, string> = {
  1: "gradient-peach",
  2: "gradient-blue",
  3: "gradient-amber",
  4: "gradient-green",
};

export default function TermsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = terms.filter((t) => {
    const matchesCategory =
      activeCategory === "all" || t.category === activeCategory;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      t.search.toLowerCase().includes(q) ||
      t.word.toLowerCase().includes(q) ||
      t.plain.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mx-auto max-w-[960px] px-6 py-12 font-sans">
      {/* Header */}
      <header className="mb-6">
        <p className="font-mono uppercase tracking-widest text-[11px] text-primary mb-2">
          Reference guide
        </p>
        <h1 className="font-extrabold text-2xl text-foreground mb-1">
          Plain English glossary
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-[600px]">
          Every term you&apos;ll encounter while building with AI — explained without jargon.
        </p>
      </header>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any term..."
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted text-sm font-sans outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-sans border transition-colors ${
              activeCategory === cat.id
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-surface text-muted border-border hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Term grid — bento */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {filtered.map((term) => (
          <div
            key={term.word}
            className={`card-lift bento-cell ${gradientByNum[term.categoryNum] ?? "gradient-peach"} rounded-2xl p-5 border border-border border-l-[3px] ${
              borderByNum[term.categoryNum] ?? "border-l-primary"
            }`}
          >
            <p className="font-mono text-[12px] font-medium text-foreground mb-2">
              {term.word}
            </p>
            <p className="text-[13px] text-muted leading-relaxed">
              {term.plain}
            </p>
            {term.analogy && (
              <p className="text-[12px] text-muted/60 italic leading-relaxed border-t border-border pt-3 mt-3">
                {term.analogy}
              </p>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-center py-16 text-sm">
          No terms match your search.
        </p>
      )}
    </section>
  );
}
