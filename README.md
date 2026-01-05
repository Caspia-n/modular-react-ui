# modular-react-ui

modular-react-ui is a modular, grid-based editor UI scaffold intended for building customizable layouts with a clean separation between layout/state, rendering, persistence, and AI-assisted suggestions.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Folder structure

- `app/` — Next.js App Router routes, root layout, global styles
- `components/` — UI components (Grid, Blocks, Editor, Modals, Shared)
- `lib/` — Domain modules (grid, AI, persistence, media) + utilities
- `context/` — React context providers (added in later tasks)
- `hooks/` — Shared hooks (added in later tasks)
- `types/` — Public re-exports of core TypeScript types
- `__tests__/` — Test suite (added in later tasks)

## Architecture overview (high-level)

The project is organized around a few core domains:

- **Grid**: data model + layout primitives (no implementation yet)
- **Editor**: composition of the grid canvas, block rendering, and selection UX (later tasks)
- **AI**: typed command suggestions that can be approved before applying changes (later tasks)
- **Persistence**: export/import plus local and server-backed syncing (later tasks)

Future documentation will detail state management, command application, and rendering boundaries.

## Tech stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables (design tokens) |
| Animation | Framer Motion |
| Layout | react-grid-layout |
| UI primitives | HeroUI |

## Task roadmap

- **TASK 1** — Project initialization & tooling (**IN PROGRESS**)
- **TASK 2** — Grid canvas shell (rendering scaffolding, no advanced logic)
- **TASK 3** — Block library + editor UI composition
- **TASK 4** — Persistence (export/import, local storage, optional server sync)
- **TASK 5** — AI suggestions (command generation + approval flow)

## Future phases

- Collaboration/multi-user editing
- Component marketplace / block registry
- Plugin system for custom renderers and tools
