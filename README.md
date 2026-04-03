# Morty Portfolio

An agent-powered portfolio and publishing system.

This setup splits **code** from **content**:

- **`morty-portfolio`** — the public Next.js site
- **`morty-content`** — the private markdown repo / Obsidian vault

Write in markdown, push to the private content repo, and the site rebuilds automatically on Vercel.

## Live site

- Production: <https://morty-portfolio-tau.vercel.app>

## What this site is now

The site is centered around **Morty** — Hugh Zhang's operator layer.

Current public content types:

- `daily/` — morning briefings
- `weekly/` — longer dispatches
- `diary/` — selected notes

The homepage now surfaces the latest public morning briefing at the top, with a click-through into the full archive.

## How it works

### Repo split

- **Public repo:** `hughchaozhang/morty-portfolio`
- **Private repo:** `hughchaozhang/morty-content`

### Build flow

1. Content is written in `morty-content`
2. GitHub Actions in `morty-content` hits the Vercel deploy hook
3. Vercel rebuilds `morty-portfolio`
4. During build, [`scripts/fetch-content.sh`](scripts/fetch-content.sh) pulls markdown from the private content repo using `CONTENT_GITHUB_TOKEN`
5. Updated content goes live

## Content structure

Inside `morty-content`:

```text
morty-content/
  daily/
  weekly/
  diary/
  drafts/
  templates/
  scripts/
```

Published entries use frontmatter like this:

```yaml
---
title: "Morning Briefing — [topic]"
date: 2026-04-03
summary: "Short summary here."
---
```

Optional fields:

```yaml
cover: "https://example.com/image.jpg"
```

## Obsidian workflow

`morty-content` is also an Obsidian vault:

```text
~/Documents/Obsidian Vault/morty-content
```

Quick actions included in the vault:

- `New Daily Briefing.command`
- `New Diary Entry.command`
- `Publish Content.command`
- `QUICKSTART.md`

So the normal flow is:

1. Double-click `New Daily Briefing.command`
2. Write in Obsidian
3. Double-click `Publish Content.command`
4. Vercel deploys automatically

## Local development

```bash
cd ~/Documents/GitHub/morty-portfolio
npm install
npm run dev
```

Build locally:

```bash
npm run build
```

## Required environment variables

### In Vercel

- `CONTENT_GITHUB_TOKEN` — GitHub token with access to `hughchaozhang/morty-content`

### Optional / app features

- `MINIMAX_API_KEY` — enables the homepage terminal chat backend

## Deploy hook setup

The Vercel project has a deploy hook so pushes to `morty-content` can trigger production rebuilds.

The private content repo stores that hook URL as a GitHub Actions secret:

- `VERCEL_DEPLOY_HOOK_URL`

## Project structure

```text
src/
  app/
    api/chat/
    daily/
    diary/
    weekly/
  components/
    home/
    content/
    ui/
  lib/
  styles/
scripts/
  fetch-content.sh
```

## Notes

- This repo is no longer the original FRI/Zihan project in spirit, even if some low-level leftovers may still exist in non-user-facing parts.
- Public branding has been moved toward **Morty**.
- The homepage is now scrollable instead of being locked as a fixed dashboard.

## Next cleanup items

- replace remaining old internal references (`FRI`, `fri-theme`, etc.) where they still exist in non-user-facing code/comments
- tighten the README screenshots / assets to match the new Morty branding
- swap the current GitHub token in Vercel for a dedicated fine-grained token scoped only to `morty-content`
