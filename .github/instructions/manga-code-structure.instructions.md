---
name: "MangaHub Source Structure"
description: "Use when adding or refactoring MangaHub pages, features, components, hooks, services, types, or styles."
applyTo: ["app/**/*.ts", "app/**/*.tsx", "src/**/*.ts", "src/**/*.tsx", "src/**/*.css"]
---

# MangaHub frontend structure

Use `src/` as the application source root:

| Folder | Responsibility |
| --- | --- |
| `public/images`, `public/icons` | Static images and icons |
| `src/app` | App composition, router, providers, and route adapter only |
| `src/layouts` | Shared `MainLayout` and `AuthLayout` shells |
| `src/pages/<PageName>` | Page composition such as `OverviewPage.tsx`, `DiscoverPage.tsx`, and `MyLibraryPage.tsx` |
| `src/features/<feature>` | Feature-specific components, hooks, types, data, and behavior |
| `src/components/ui` | Generic Button, Input, Modal, Badge, Skeleton, and other primitives |
| `src/components/navigation` | Sidebar, Topbar, and NavItem |
| `src/components/manga` | MangaCard, MangaCover, MangaRating, and manga-domain components |
| `src/hooks` | Cross-feature reusable hooks |
| `src/services` | API clients and external integrations |
| `src/types` | Shared application and API types |
| `src/styles` | Global CSS, design tokens, and shared component styles |
| `src/assets` | Imported application assets |

## Rules

- Keep root `app/` files thin. `app/page.tsx` only renders `src/app/App.tsx`.
- Put page composition in `src/pages`, not in route adapters.
- Put feature logic and feature components in `src/features/<feature>`.
- Put reusable UI in `src/components/ui`; put manga-domain UI in `src/components/manga`.
- Keep navigation chrome in `src/components/navigation` and shared shells in `src/layouts`.
- Put API calls in `src/services`, shared hooks in `src/hooks`, and shared types in `src/types`.
- Keep static data outside JSX and use typed props. Do not use `any` to bypass errors.
- Preserve responsive behavior, keyboard-accessible controls, and existing design tokens.
- Run `npm run typecheck` and `npm run build` after structural changes.