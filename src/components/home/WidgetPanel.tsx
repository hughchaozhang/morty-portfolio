/**
 * [INPUT]: TechBorder, Entry type, next/link
 * [OUTPUT]: WidgetPanel — switchable widget: WEEKLY preview (default) or ACTIVE_MODULES
 * [POS]: home/ left-column bottom panel, replaces ActiveModules
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { TechBorder } from "@/components/ui/TechBorder";
import { CoverImage } from "@/components/content/CoverImage";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WeeklyEntry {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  cover?: string;
}

interface WidgetPanelProps {
  weeklyEntries: WeeklyEntry[];
}

type Tab = "weekly" | "stack";

/* ------------------------------------------------------------------ */
/*  Stack data                                                         */
/* ------------------------------------------------------------------ */

const modules = [
  { name: "Next.js 16", status: "SSG", statusVar: "var(--text-status)", base: 100 },
  { name: "Tailwind v4", status: "LOADED", statusVar: "var(--text-status)", base: 100 },
  { name: "Markdown Pipeline", status: "ACTIVE", statusVar: "var(--text-status)", base: 100 },
  { name: "Link Preview (OG)", status: "CACHED", statusVar: "var(--text-status)", base: 92 },
  { name: "Geist Pixel", status: "LOADED", statusVar: "var(--text-status)", base: 100 },
  { name: "Pretext", status: "READY", statusVar: "var(--text-status-ready)", base: 65 },
  { name: "Vercel Deploy", status: "CONNECTED", statusVar: "var(--text-status)", base: 100 },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WidgetPanel({ weeklyEntries }: WidgetPanelProps) {
  const [tab, setTab] = useState<Tab>("weekly");
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* jitter effect for stack bars */
  useEffect(() => {
    if (tab !== "stack") return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    barsRef.current.forEach((el, i) => {
      if (!el) return;
      const base = modules[i].base;
      const interval = Math.random() * 1200 + 1600;

      function update() {
        const delta = (Math.random() - 0.5) * 30;
        const w = Math.min(100, Math.max(0, base + delta));
        el!.style.width = w + "%";
      }

      function schedule() {
        update();
        const id = setTimeout(schedule, interval);
        timers.push(id);
      }

      const delayId = setTimeout(schedule, Math.random() * 1800 + 400);
      timers.push(delayId);
    });

    return () => timers.forEach(clearTimeout);
  }, [tab]);

  const recent = weeklyEntries.slice(0, 5);

  return (
    <TechBorder className="p-5 flex-1 overflow-hidden flex flex-col">
      {/* ---- Tab switcher ---- */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setTab("weekly")}
            className="px-2 py-1 text-[10px] font-vt323 tracking-widest transition-colors border border-transparent"
            style={
              tab === "weekly"
                ? { color: 'var(--text-tab-active)', background: 'var(--bg-tab-active)', border: '1px solid var(--border-tab-active)' }
                : { color: 'var(--text-tab-inactive)' }
            }
          >
            WEEKLY
          </button>
          <button
            onClick={() => setTab("stack")}
            className="px-2 py-1 text-[10px] font-vt323 tracking-widest transition-colors border border-transparent"
            style={
              tab === "stack"
                ? { color: 'var(--text-tab-active)', background: 'var(--bg-tab-active)', border: '1px solid var(--border-tab-active)' }
                : { color: 'var(--text-tab-inactive)' }
            }
          >
            STACK
          </button>
        </div>
        {tab === "weekly" && (
          <Link
            href="/weekly"
            className="text-[9px] font-vt323 text-neon-coral/60 hover:text-neon-coral tracking-widest transition-colors"
          >
            VIEW ALL →
          </Link>
        )}
      </div>

      {/* ---- Weekly preview ---- */}
      {tab === "weekly" && (
        <div className="custom-scroll overflow-y-auto pr-1 space-y-2 flex-1">
          {recent.map((entry) => (
            <Link
              key={entry.slug}
              href={`/weekly/${entry.slug}`}
              className="group flex gap-3 p-2 transition-all border border-transparent"
            >
              {entry.cover ? (
                <div
                  className="w-16 h-12 shrink-0 overflow-hidden border"
                  style={{ borderColor: 'var(--border-cover)' }}
                >
                  <CoverImage src={entry.cover} />
                </div>
              ) : (
                <div
                  className="w-16 h-12 shrink-0 border"
                  style={{ background: 'var(--bg-placeholder)', borderColor: 'var(--border-subtle)' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-xs font-vt323 transition-colors truncate"
                  style={{ color: 'var(--text-card-title)' }}
                >
                  {entry.title}
                </h3>
                <time
                  className="text-[9px] font-vt323 tracking-wider"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {entry.date}
                </time>
                {entry.summary && (
                  <p
                    className="text-[9px] line-clamp-1 mt-0.5"
                    style={{ color: 'var(--text-dim)' }}
                  >
                    {entry.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ---- Stack / modules ---- */}
      {tab === "stack" && (
        <div className="custom-scroll overflow-y-auto pr-2 space-y-3 flex-1">
          {modules.map((mod, i) => (
            <div key={mod.name} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-vt323 transition-colors">
                  {mod.name}
                </span>
                <span
                  className="text-[10px] font-tech"
                  style={{ color: mod.statusVar }}
                >
                  {mod.status}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  ref={(el) => { barsRef.current[i] = el; }}
                  className="progress-bar-fill module-bar"
                  style={{ width: `${mod.base}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </TechBorder>
  );
}
