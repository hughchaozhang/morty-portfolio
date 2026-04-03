/**
 * [INPUT]: TechBorder from @/components/ui/TechBorder, Link from next/link
 * [OUTPUT]: CoreDirectives — directive cards, archive links, and public profile links
 * [POS]: home/ right-column bottom panel, sibling to IdentityMatrix/ArcReactor
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import { TechBorder } from "@/components/ui/TechBorder";

/* ------------------------------------------------------------------ */
/*  Directive data                                                     */
/* ------------------------------------------------------------------ */

const directives = [
  {
    title: "Speed / 速度",
    body: "Ship the useful version first. Polish after the thing is real.",
  },
  {
    title: "Clarity / 清楚",
    body: "If an idea cannot survive plain language, it is not ready yet.",
  },
  {
    title: "Leverage / 杠杆",
    body: "The goal is not output. The goal is systems that keep producing.",
  },
  {
    title: "Ownership / 负责",
    body: "If something breaks, name it, fix it, and keep moving.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CoreDirectives() {
  return (
    <TechBorder className="p-5 flex-1 min-h-0 flex flex-col overflow-hidden">
      <h2
        className="text-xs font-vt323 mb-4 flex items-center gap-2 tracking-widest shrink-0"
        style={{ color: "var(--text-panel-title)" }}
      >
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/shield.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        CORE_DIRECTIVES
      </h2>

      <div className="directive-reveal space-y-4 flex-1 min-h-0 overflow-y-auto custom-scroll pr-1">
        {directives.map((d) => (
          <div
            key={d.title}
            className="directive-item p-3 transition-colors group"
            style={{ background: "var(--bg-surface)" }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: "var(--bg-diamond)" }} />
              <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: "var(--text-card-title)" }}>
                {d.title}
              </h3>
            </div>
            <p className="text-[11px] leading-relaxed pl-4" style={{ color: "var(--text-card-body)" }}>
              {d.body}
            </p>
          </div>
        ))}

        <div
          className="directive-item p-3 border-l-2 transition-colors group"
          style={{ background: "var(--bg-surface-hover)", borderColor: "var(--neon-pink)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: "var(--bg-diamond)" }} />
            <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: "var(--text-card-title)" }}>
              Morning Loop / 晨报
            </h3>
          </div>
          <p className="text-[11px] leading-relaxed pl-4" style={{ color: "var(--text-card-highlight)" }}>
            The daily briefing is the ritual: collect signal, compress it, publish it, and turn reading into action.
          </p>
        </div>

        <div
          className="directive-item p-3 border-l-2 transition-colors group"
          style={{ background: "var(--bg-surface-alt)", borderColor: "var(--border-orange)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: "var(--bg-diamond-orange)" }} />
            <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: "var(--text-orange-title)" }}>
              Public Proof / 公开证明
            </h3>
          </div>
          <p className="text-[11px] leading-relaxed pl-4" style={{ color: "var(--text-orange-body)" }}>
            The artifact should do the talking. Less marketing copy, more visible evidence.
          </p>
        </div>

        <div
          className="directive-item p-3 border-l-2 transition-colors group"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border-accent)" }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-1.5 rotate-45 transition-colors" style={{ background: "var(--bg-diamond)" }} />
            <h3 className="text-xs font-bold font-vt323 uppercase tracking-wide" style={{ color: "var(--text-card-title)" }}>
              No Theater / 不演
            </h3>
          </div>
          <p className="text-[11px] leading-relaxed pl-4" style={{ color: "var(--text-card-body)" }}>
            Results over performative hustle. Say it once, say it well, and ship the next thing.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t" style={{ borderColor: "var(--border-divider)" }}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/daily" className="font-tech text-xs transition-colors py-1 flex items-center" style={{ color: "var(--text-link)" }}>
              /daily
            </Link>
            <Link href="/weekly" className="font-tech text-xs transition-colors py-1 flex items-center" style={{ color: "var(--text-link)" }}>
              /weekly
            </Link>
            <Link href="/diary" className="font-vt323 text-[11px] transition-colors" style={{ color: "var(--text-link-easter)" }}>
              /diary
            </Link>
          </div>
          <div className="flex gap-1">
            <a
              href="https://github.com/hughchaozhang"
              target="_blank"
              rel="noopener"
              className="p-1.5 transition-all hover:opacity-80"
              style={{ color: "var(--text-accent)" }}
              aria-label="GitHub"
            >
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/github.svg"
                className="pa-icon w-4 h-4 inline-block"
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </TechBorder>
  );
}
