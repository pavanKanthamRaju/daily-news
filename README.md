# Daily News

An elegant daily news app that shows the **latest 5 stories** the moment you open
it — or whenever you hit the **Latest News** button. Built with React, TypeScript,
Tailwind CSS and Framer Motion, featuring an animated aurora background, glassy
cards, staggered entrance animations and shimmer loading states.

![Built with React, Tailwind & Framer Motion](public/favicon.svg)

## Features

- Fetches the latest 5 headlines automatically on load and on demand.
- Rich, animated dark UI: aurora background, gradient text, hover glows, motion.
- Skeleton shimmer while loading and a friendly error state with retry.
- **Pluggable news sources** — works with zero config, or plug in an API key.

## News sources

The app picks a provider automatically based on the env vars present at build time:

| Provider     | Env var               | Key required | Notes                              |
| ------------ | --------------------- | ------------ | ---------------------------------- |
| Hacker News  | _(none)_              | No           | Default. Free, works everywhere.   |
| NewsAPI.org  | `VITE_NEWS_API_KEY`   | Yes          | General news. **Localhost only** (CORS-blocked on deployed sites on the free plan). |
| GNews        | `VITE_GNEWS_API_KEY`  | Yes          | General news, CORS-friendly.       |

Copy `.env.example` to `.env` and add a key to switch providers:

```bash
cp .env.example .env
# edit .env, then restart the dev server
```

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run lint     # lint
npm run preview  # preview the production build
```

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) build tooling
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) animations
