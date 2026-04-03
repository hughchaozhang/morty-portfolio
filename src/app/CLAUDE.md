# app/
> L2 | Parent: /CLAUDE.md

## Members

layout.tsx: Root shell — `<html>` + `<body>`, global CSS import, metadata (Morty title/description, favicon), theme boot script with `morty-theme` + `fri-theme` fallback
page.tsx: Homepage — scrollable 3-column dashboard with a top MorningBriefing strip assembling all `@/components/home/*` components
_diary/page.tsx_: Diary list page — SSG, renders all diary entries via `EntryList`
diary/[slug]/page.tsx: Single diary entry page — SSG with `generateStaticParams`, renders one entry via `EntryPage`
weekly/page.tsx: Weekly list page — SSG, renders all weekly entries via `EntryList`
weekly/[slug]/page.tsx: Single weekly entry page — SSG with `generateStaticParams`, renders one entry via `EntryPage`
daily/page.tsx: Daily briefing archive — SSG, renders all public morning briefings via `EntryList`
daily/[slug]/page.tsx: Single daily briefing page — SSG with `generateStaticParams`, renders one entry via `EntryPage`
api/chat/route.ts: POST handler — proxies chat messages to Minimax M2.7 with streaming SSE, Morty public-site system prompt

## Architecture Notes

- Homepage scrolling now lives on the normal document flow instead of a viewport-locked wrapper
- `layout.tsx` remains free of page-specific height/overflow constraints so content routes can grow naturally
- `favicon.ico` was deleted — we use `/public/favicon.png` via metadata.icons

[PROTOCOL]: Update this file when routes are added/removed, then check parent CLAUDE.md
