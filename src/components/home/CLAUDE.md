# components/home/
> L2 | Parent: src/components/CLAUDE.md

Homepage client components — stateful UI with timers, animations, and live data.

## Members

SystemHeader.tsx: Top bar — Morty branding, status dot, POSTS/WORDS gauges (real stats via props), Irvine/PT clock (1s tick)
MorningBriefing.tsx: Full-width top-of-home strip — surfaces the latest public daily briefing with summary, extracted highlights, and links into `/daily`
IdentityMatrix.tsx: Top-left identity panel with Morty specs (designation, role, feed counts, last dispatch, build). Props: `diaryCount`, `weeklyCount`, `dailyCount`, `lastEntryAge` — fed from `getSiteStats()`
TypeWriter.tsx: Type/delete animation for quote strings, consumed exclusively by IdentityMatrix
ArcReactor.tsx: Center-column core — circular video with rotating CSS rings, crosshair grid, random status label, 1s uptime counter since 2026-01-30
Diagnostics.tsx: Right-column panel — real stat boxes (thisWeek/thisMonth counts), static publishing frequency bars from `dailyActivity[]`, service status list (diary/weekly/link_preview/deploy). Props from `getSiteStats()`
NetworkTraffic.tsx: DEPRECATED — no longer imported by Diagnostics. Animated bar chart replaced by static `dailyActivity` bars
ActiveModules.tsx: DEPRECATED — replaced on the homepage by WidgetPanel
WidgetPanel.tsx: Left-column bottom panel — switchable preview tabs for DAILY, WEEKLY, and STACK/module status
Terminal.tsx: Center-column bottom panel — expandable Morty session terminal with real stats, navigation commands (/latest, /daily, /weekly, /diary, /stats, /random, /about, /status), and live AI chat. Props: `stats: SiteStats` from `getSiteStats()`
CoreDirectives.tsx: Right-column bottom panel — Morty directive cards, archive shortcuts (`/daily`, `/weekly`, `/diary`), and GitHub profile link. Server component (no `"use client"`)

[PROTOCOL]: Update this file on any member change, then check parent CLAUDE.md
