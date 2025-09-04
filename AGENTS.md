# Agents

This document provides a high-level breakdown of the codebase by functional “agents” (Product, UX, Tech, Flow, Marketing), summarizing relevant modules and responsibilities.

## Product

- **Frontends**:
  - `yb100/` – YourBest100 platform for creating and exploring top-100 lists.
  - `xmas/` – Festive product showcase experience powered by the same core.
- **Backoffice**:
  - `backoffice/` – Admin interface for managing lists and items via HTTP Basic Auth.
- **Domain Models**:
  - `backend/src/models/list` – Domain logic for lists.
  - `backend/src/models/item` – Domain logic for items.

## UX

- **Global Layout**:
  - `fs/src/components/Layout/` & `yb100/src/components/Layout/` – shared responsive headers, sidebars, footers, and bottom nav.
- **Interactive Views**:
  - Scroller: `fs/src/pages/Scroller.tsx`, `yb100/src/pages/Scroller.tsx` – full-screen, mobile-first scroller.
  - Tiles: `fs/src/pages/Tiles.tsx`, `yb100/src/pages/Tiles.tsx` – grid-based list overview.
  - About pages: `fs/src/pages/About.tsx`, `yb100/src/pages/About.tsx`.
- **Content Components**:
  - `fs/src/components/FeaturedBooks.tsx` – curated book module with category filters and animations.
  - `xmas/src/components/ProductGrid.tsx` – featured products grid with mock data.

## Tech

- **API Backend**:
  - `backend/` – FastAPI application exposing `/list`, `/items`, `/images`, and OpenAPI docs.
  - `docker-compose.yml`, `start.sh` – service orchestration, Docker build and deploy scripts.
- **Database**:
  - MongoDB integration via `MONGODB_URI` and collections configured in environment variables.
- **Styling & Tooling**:
  - Tailwind CSS config (`yb100/tailwind.config.ts`, `fs/tailwind.config.ts`), shadcn-ui components, and TypeScript/React in all frontends.

## Flow

- **Dev Workflow**:
  - `start.sh` automates `docker-compose down`, `build`, and `up`.
  - `.env.example` drives environment setup; services share `.env` for credentials and DB settings.
- **Service Dependencies**:
  - Compose services: `backend → backoffice → yb100/fs/sp/xmas` in dependency graph.
- **CI/CD Placeholder**:
  - No CI configured; could add GitHub Actions based on the current structure.

## Marketing

- **Sample Product Copy**:
  - `xmas/src/components/ProductGrid.tsx` – mock products with AI-powered descriptions.
  - `sp/index.html` & `sp/src/components/Navigation.tsx` – marketing site with OG tags.
- **Branding & Meta**:
  - Meta tags in `sp/index.html` for social sharing and SEO.
  - Theming and gradient text styles across frontends for visual impact.
