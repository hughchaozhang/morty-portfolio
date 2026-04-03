/**
 * [INPUT]:  @/components/ui/TechBorder, @/lib/content (Entry type), next/link
 * [OUTPUT]: MorningBriefing — full-width homepage strip featuring the latest public daily briefing
 * [POS]:    home/ top-of-main module, renders above the 3-column dashboard grid
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { TechBorder } from "@/components/ui/TechBorder";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface MorningBriefingProps {
  entry: Entry | null;
  totalBriefings: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHighlights(html: string): string[] {
  const listItems = Array.from(html.matchAll(/<li>([\s\S]*?)<\/li>/g))
    .map((match) => stripHtml(match[1]))
    .filter((item) => item.length > 18)
    .slice(0, 3);

  if (listItems.length > 0) return listItems;

  return Array.from(html.matchAll(/<p>([\s\S]*?)<\/p>/g))
    .map((match) => stripHtml(match[1]))
    .filter((paragraph) => paragraph.length > 30)
    .slice(0, 2);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MorningBriefing({ entry, totalBriefings }: MorningBriefingProps) {
  if (!entry) {
    return (
      <TechBorder className="p-5 md:p-6 shrink-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div
              className="text-[10px] font-tech tracking-[0.25em] uppercase"
              style={{ color: "var(--text-accent-soft)" }}
            >
              Morning Briefing / Public Feed
            </div>
            <h2
              className="font-vt323 text-xl md:text-2xl tracking-widest"
              style={{ color: "var(--text-card-title)" }}
            >
              No public briefing live yet.
            </h2>
            <p
              className="max-w-2xl text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              This strip is wired and ready. As soon as the first daily briefing lands, it will surface here automatically.
            </p>
          </div>

          <Link
            href="/daily"
            className="inline-flex items-center gap-2 font-vt323 text-sm tracking-widest transition-opacity opacity-80 hover:opacity-100"
            style={{ color: "var(--text-panel-title)" }}
          >
            OPEN BRIEFING ARCHIVE →
          </Link>
        </div>
      </TechBorder>
    );
  }

  const highlights = extractHighlights(entry.content);
  const preview = truncate(entry.summary || stripHtml(entry.content), 220);

  return (
    <TechBorder className="p-5 md:p-6 shrink-0 overflow-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="status-dot w-2 h-2 animate-pulse shrink-0"
              style={{ background: "var(--text-status)" }}
            />
            <span
              className="text-[10px] font-tech tracking-[0.25em] uppercase"
              style={{ color: "var(--text-accent-soft)" }}
            >
              Morning Briefing
            </span>
          </div>

          <span
            className="text-[10px] font-tech tracking-[0.22em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            Latest Public Dispatch
          </span>

          <span
            className="text-[10px] font-tech tracking-[0.22em] uppercase md:ml-auto"
            style={{ color: "var(--text-orange-body)" }}
          >
            {entry.date}
          </span>
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <h2
              className="font-vt323 text-2xl md:text-3xl tracking-widest leading-none"
              style={{ color: "var(--text-card-title)" }}
            >
              {entry.title}
            </h2>

            <p
              className="mt-3 max-w-3xl text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {preview}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 xl:pl-4">
            <div
              className="border px-3 py-2 min-w-[120px]"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--bg-surface)",
              }}
            >
              <div
                className="text-[10px] font-tech tracking-[0.22em] uppercase mb-1"
                style={{ color: "var(--text-dim)" }}
              >
                Briefings
              </div>
              <div
                className="font-vt323 text-2xl tracking-widest leading-none"
                style={{ color: "var(--text-value)" }}
              >
                {totalBriefings}
              </div>
            </div>

            <Link
              href={`/daily/${entry.slug}`}
              className="inline-flex items-center justify-center gap-2 border px-4 py-3 font-vt323 text-sm tracking-[0.22em] uppercase transition-colors"
              style={{
                color: "var(--text-panel-title)",
                borderColor: "var(--border-tab-active)",
                background: "var(--bg-surface)",
              }}
            >
              View Full Briefing
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/arrow-right.svg"
                className="pa-icon w-3 h-3"
                alt=""
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/daily"
              className="text-[10px] font-tech tracking-[0.22em] uppercase transition-opacity opacity-70 hover:opacity-100"
              style={{ color: "var(--text-accent-soft)" }}
            >
              Browse all briefings →
            </Link>
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-2.5">
            {highlights.map((item, index) => (
              <div
                key={`${entry.slug}-${index}`}
                className="border px-3 py-2.5"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "var(--bg-surface)",
                }}
              >
                <div
                  className="mb-1 font-tech text-[10px] tracking-[0.24em] uppercase"
                  style={{ color: "var(--text-accent-soft)" }}
                >
                  Signal 0{index + 1}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {truncate(item, 110)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </TechBorder>
  );
}
