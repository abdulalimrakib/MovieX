# MovieX

A movie and TV show browser built with React and the [TMDB API](https://developer.themoviedb.org/).

- Home page with trending, popular and top rated carousels
- Explore page with genre filters, sorting and infinite scroll
- Search across movies and TV shows
- Details page with cast, crew, trailer, similar titles and recommendations

## Tech stack

React 19, React Router 7, Vite 8, Tailwind CSS 4, axios, react-slick, react-select, Vitest.

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
cp .env.example .env   # then paste your TMDB API Read Access Token
npm run dev
```

Get a token from [TMDB → Settings → API](https://www.themoviedb.org/settings/api) (the **API Read Access Token**, not the v3 API key).

> Every `VITE_*` variable is bundled into the client, so the token is visible to anyone using the site. That's acceptable for TMDB's read-only token; don't put write-capable secrets here.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint (fails on any warning) |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Project structure

```
src/
  components/   UI components (MediaCarousel, PosterGrid, Poster, ...)
  hooks/        useFetch, usePaginatedFetch, useDocumentTitle
  layout/       Header and Footer
  pages/        Route components (lazy loaded)
  routes/       Router setup
  utils/        TMDB API client and media helpers
```

## Deployment

This is a single-page app, so the host must serve `index.html` for every route. `vercel.json` (Vercel) and `public/_redirects` (Netlify) already do this. Remember to set `VITE_APP_TMDB_TOKEN` in the host's environment variables.

---

This product uses the TMDB API but is not endorsed or certified by TMDB.
