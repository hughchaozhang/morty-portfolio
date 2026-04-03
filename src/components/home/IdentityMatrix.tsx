/**
 * [INPUT]: @/components/ui/TechBorder, ./TypeWriter
 * [OUTPUT]: IdentityMatrix — identity panel with key-value pairs and cycling quotes
 * [POS]: home/ top-left panel, displays Morty specs and publishing identity
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { TechBorder } from "@/components/ui/TechBorder";
import { TypeWriter } from "./TypeWriter";

/* ── props ───────────────────────────────────────────────────── */

interface IdentityMatrixProps {
  diaryCount: number;
  weeklyCount: number;
  dailyCount: number;
  lastEntryAge: string;
}

/* ── static data ─────────────────────────────────────────────── */

const sayings = [
  "Ship first. Polish second.",
  "Good systems buy time.",
  "Write it once. Publish it everywhere.",
  "清楚比花哨更值钱。",
  "If it breaks, say it, fix it, move on.",
  "Don't posture. Ship.",
  "能自动化的，就别手动重复。",
  "The public artifact should feel like proof.",
];

/* ── component ───────────────────────────────────────────────── */

export function IdentityMatrix({ diaryCount, weeklyCount, dailyCount, lastEntryAge }: IdentityMatrixProps) {
  const specs: [string, string][] = [
    ["Designation", "morty"],
    ["Role", "chief of staff"],
    ["Feed", `${dailyCount} daily · ${weeklyCount} weekly · ${diaryCount} diary`],
    ["Last Dispatch", lastEntryAge],
    ["Build", "public alpha"],
  ];

  return (
    <TechBorder className="p-5">
      <h2
        className="text-xs font-vt323 mb-4 flex items-center gap-2 tracking-widest"
        style={{ color: "var(--text-panel-title)" }}
      >
        <img
          src="https://unpkg.com/pixelarticons@1.8.1/svg/server.svg"
          className="pa-icon w-4 h-4 inline-block"
          alt=""
          aria-hidden="true"
        />
        IDENTITY_MATRIX
      </h2>

      <div className="space-y-4">
        {specs.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between items-center text-sm${
              i < specs.length - 1 ? " border-b pb-3 pt-0.5" : " pb-3 pt-0.5"
            }`}
            style={i < specs.length - 1 ? { borderColor: "var(--border-divider)" } : undefined}
          >
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span className="font-bold font-vt323 text-right" style={{ color: "var(--text-value)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <TypeWriter sayings={sayings} />
    </TechBorder>
  );
}
