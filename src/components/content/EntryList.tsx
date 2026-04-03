/**
 * [INPUT]: @/lib/content (Entry type), next/link, ./CoverImage
 * [OUTPUT]: EntryList — card-based list with type-aware archive presentation
 * [POS]: components/content/ shared renderer, consumed by diary/page.tsx and weekly/page.tsx
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { CoverImage } from "./CoverImage";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface EntryListProps {
  entries: Entry[];
  type: "diary" | "weekly" | "daily";
  title: string;
  subtitle: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TYPE_META = {
  daily: {
    homeLabel: "BACK TO MORTY",
    latestLabel: "LATEST BRIEFING",
    archiveLabel: "BRIEFING ARCHIVE",
    footerLabel: "public briefings · published by Morty",
    latestCta: "Read full briefing",
  },
  weekly: {
    homeLabel: "BACK TO MORTY",
    latestLabel: "LATEST DISPATCHES",
    archiveLabel: "ARCHIVE",
    footerLabel: "weekly dispatches · published by Morty",
    latestCta: "Read dispatch",
  },
  diary: {
    homeLabel: "BACK TO MORTY",
    latestLabel: "LATEST NOTES",
    archiveLabel: "ARCHIVE",
    footerLabel: "selected notes · published by Morty",
    latestCta: "Read entry",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EntryList({ entries, type, title, subtitle }: EntryListProps) {
  const meta = TYPE_META[type];
  const featured = entries[0];
  const latest = entries.slice(1, 3);
  const rest = entries.slice(3);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-body)" }}>
      <div className="scanline-overlay" />

      <div className="mx-auto max-w-5xl px-5 py-12">
        <header className="mb-10">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 font-vt323 text-xs tracking-widest text-neon-coral/70 hover:text-neon-coral transition-colors"
          >
            <img
              src="https://unpkg.com/pixelarticons@1.8.1/svg/arrow-left.svg"
              className="pa-icon w-3 h-3"
              alt=""
              aria-hidden="true"
            />
            {meta.homeLabel}
          </Link>
          <h1 className="font-vt323 text-3xl sm:text-4xl tracking-wider" style={{ color: "var(--text-heading)" }}>
            {title}
          </h1>
          <p className="mt-2 text-sm max-w-prose leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {subtitle}
          </p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel px-4 py-3">
              <div className="font-tech text-[10px] tracking-[0.18em] uppercase text-neon-pink/50">Entries</div>
              <div className="mt-1 font-vt323 text-2xl" style={{ color: "var(--text-value)" }}>
                {entries.length}
              </div>
            </div>
            <div className="glass-panel px-4 py-3">
              <div className="font-tech text-[10px] tracking-[0.18em] uppercase text-neon-pink/50">Latest</div>
              <div className="mt-1 font-vt323 text-lg truncate" style={{ color: "var(--text-value)" }}>
                {featured?.date || "—"}
              </div>
            </div>
            <div className="glass-panel px-4 py-3">
              <div className="font-tech text-[10px] tracking-[0.18em] uppercase text-neon-pink/50">Mode</div>
              <div className="mt-1 font-vt323 text-lg uppercase" style={{ color: "var(--text-value)" }}>
                {type}
              </div>
            </div>
          </div>
          <div className="mt-4 h-px bg-neon-pink/25" />
        </header>

        {featured && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-vt323 text-xs tracking-widest text-neon-pink/60">{meta.latestLabel}</span>
              <div className="flex-1 h-px bg-neon-pink/15" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <Link
                href={`/${type}/${featured.slug}`}
                className="group glass-panel overflow-hidden lg:col-span-3 hover:border-neon-pink/50 transition-all"
              >
                {featured.cover && (
                  <div className="h-48 overflow-hidden border-b" style={{ borderColor: "var(--border-cover)" }}>
                    <CoverImage src={featured.cover} className="group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <time className="font-vt323 text-[11px] tracking-widest text-neon-coral/80">{featured.date}</time>
                  <h2 className="mt-2 font-vt323 text-2xl tracking-wide leading-tight" style={{ color: "var(--text-card-title)" }}>
                    {featured.title}
                  </h2>
                  {featured.summary && (
                    <p className="mt-3 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-muted)" }}>
                      {featured.summary}
                    </p>
                  )}
                  <div className="mt-4 inline-flex items-center gap-2 font-vt323 text-sm tracking-widest text-neon-pink/70 group-hover:text-neon-pink transition-colors">
                    {meta.latestCta}
                    <img
                      src="https://unpkg.com/pixelarticons@1.8.1/svg/arrow-right.svg"
                      className="pa-icon w-3 h-3"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>

              <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                {latest.length > 0 ? (
                  latest.map((entry, i) => (
                    <Link
                      key={entry.slug}
                      href={`/${type}/${entry.slug}`}
                      className="group glass-panel flex flex-col overflow-hidden hover:border-neon-pink/50 transition-all"
                    >
                      {entry.cover && (
                        <div className="h-28 overflow-hidden border-b" style={{ borderColor: "var(--border-cover)" }}>
                          <CoverImage src={entry.cover} className="group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-4 flex-1">
                        <time className="font-vt323 text-[11px] tracking-widest text-neon-coral/80">{entry.date}</time>
                        <h3 className="mt-1.5 font-vt323 text-lg tracking-wide leading-tight" style={{ color: "var(--text-card-title)" }}>
                          {entry.title}
                        </h3>
                        {entry.summary && (
                          <p className="mt-1.5 text-xs line-clamp-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {entry.summary}
                          </p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[10px] font-tech text-neon-pink/40 group-hover:text-neon-pink/70 transition-colors">
                            {type === "daily" ? `Signal 0${i + 2}` : `#${entries.length - i - 1}`}
                          </span>
                          <img
                            src="https://unpkg.com/pixelarticons@1.8.1/svg/arrow-right.svg"
                            className="pa-icon w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="glass-panel p-5 flex items-center justify-center text-center">
                    <p className="text-[11px] font-tech tracking-widest" style={{ color: "var(--text-dim)" }}>
                      BUILDING THE ARCHIVE.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-vt323 text-xs tracking-widest text-neon-pink/60">{meta.archiveLabel}</span>
              <div className="flex-1 h-px bg-neon-pink/15" />
              <span className="font-tech text-[10px]" style={{ color: "var(--text-dim)" }}>
                {entries.length} entries
              </span>
            </div>

            <div className="space-y-1">
              {rest.map((entry, i) => (
                <Link
                  key={entry.slug}
                  href={`/${type}/${entry.slug}`}
                  className="group flex items-center gap-4 py-2.5 px-3 border border-transparent transition-all hover:border-neon-pink/20 hover:bg-white/[0.01]"
                >
                  {entry.cover ? (
                    <div className="w-14 h-10 shrink-0 overflow-hidden border" style={{ borderColor: "var(--border-cover)" }}>
                      <CoverImage src={entry.cover} />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-10 shrink-0 border"
                      style={{ background: "var(--bg-placeholder)", borderColor: "var(--border-subtle)" }}
                    />
                  )}
                  <time className="font-vt323 text-[11px] tracking-widest text-neon-coral/50 shrink-0 w-20">{entry.date}</time>
                  <h3 className="font-vt323 text-sm tracking-wide transition-colors flex-1 truncate" style={{ color: "var(--text-card-title)" }}>
                    {entry.title}
                  </h3>
                  <span className="font-tech text-[9px] shrink-0" style={{ color: "var(--text-dim)" }}>
                    #{entries.length - 3 - i}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {entries.length === 0 && (
          <div className="glass-panel p-10 text-center">
            <p className="font-vt323 text-sm tracking-widest" style={{ color: "var(--text-dim)" }}>
              NO ENTRIES YET — AWAITING FIRST DISPATCH.
            </p>
          </div>
        )}

        <footer className="mt-12 pt-6 border-t border-neon-pink/10">
          <p className="text-[10px] font-tech" style={{ color: "var(--text-dim)" }}>
            {entries.length} {meta.footerLabel}
          </p>
        </footer>
      </div>
    </div>
  );
}
