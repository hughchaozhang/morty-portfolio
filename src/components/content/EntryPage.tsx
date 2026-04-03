/**
 * [INPUT]: @/lib/content (Entry type), next/link
 * [OUTPUT]: EntryPage — full single-entry view with rendered markdown body
 * [POS]: components/content/ shared renderer, consumed by diary/[slug] and weekly/[slug]
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { CoverImage } from "./CoverImage";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface EntryPageProps {
  entry: Entry;
  type: "diary" | "weekly" | "daily";
  backHref: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TYPE_LABELS = {
  diary: { back: "DIARY", overline: "Selected Note" },
  weekly: { back: "WEEKLY", overline: "Weekly Dispatch" },
  daily: { back: "BRIEFINGS", overline: "Morning Briefing" },
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EntryPage({ entry, type, backHref }: EntryPageProps) {
  const meta = TYPE_LABELS[type];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-body)" }}>
      <article className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href={backHref}
          className="mb-8 inline-block font-vt323 text-sm tracking-widest text-neon-pink opacity-60 hover:opacity-100 transition-opacity"
        >
          &larr; BACK TO {meta.back}
        </Link>

        {entry.cover && (
          <div className="mb-8 overflow-hidden border max-h-72" style={{ borderColor: "var(--border-cover)" }}>
            <CoverImage src={entry.cover} className="w-full" />
          </div>
        )}

        <header className="mb-8">
          <div className="font-tech text-[10px] tracking-[0.2em] uppercase text-neon-pink/60">{meta.overline}</div>
          <time className="mt-2 block font-vt323 text-xs tracking-widest text-neon-coral opacity-70">{entry.date}</time>
          <h1 className="mt-2 font-vt323 text-2xl tracking-widest" style={{ color: "var(--text-primary)" }}>
            {entry.title}
          </h1>
          {entry.summary && (
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {entry.summary}
            </p>
          )}
        </header>

        <div className="diary-content" dangerouslySetInnerHTML={{ __html: entry.content }} />
      </article>
    </div>
  );
}
