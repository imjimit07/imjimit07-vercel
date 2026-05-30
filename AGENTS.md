# AGENTS.md

## Commands (executable source of truth)

| Command           | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Standard Next.js dev server                                              |
| `npm run start`   | Dev server with file-watch + socket HMR on `./data` (sets `SOCKET=true`) |
| `npm run build`   | `next build` then `node ./scripts/generate-sitemap`                      |
| `npm run serve`   | `next start` (production server)                                         |
| `npm run preview` | `npm run build && npm run serve`                                         |
| `npm run lint`    | **Formats** everything via `prettier --write .` (not a check)            |
| `npm run analyze` | `cross-env ANALYZE=true next build` (bundle analyzer)                    |

No test suite is configured.

## Pre-commit (husky + lint-staged)

- ESLint `--fix` on `*.+(js|jsx|ts|tsx)`
- Prettier `--write` on `*.+(js|jsx|ts|tsx|json|css|md|mdx)`

## Architecture

- **Framework**: Next.js 16, TypeScript, React 19
- **Styling**: Tailwind CSS v3 + `@geist-ui/core` (theme-aware) + prism.css for code highlighting
- **Content**: MDX/MD files in `data/` (blog/, authors/, snippets/) → rendered via `mdx-bundler` + remark/rehype pipeline
- **Routing**: Dynamic catch-all `pages/blog/[...slug].tsx` for blog posts; static pages for /, /about, /projects, /tags, /snippets
- **Pages support**: `.ts`, `.tsx`, `.js`, `.jsx`, `.md`, `.mdx`
- **Path aliases** (jsconfig/tsconfig): `@/components`, `@/data`, `@/layouts`, `@/lib`, `@/css`, `@/config`
- **Production optimization**: React → Preact swap in client production build (`next.config.js:94-101`)
- **Security**: CSP, HSTS, X-Frame-Options, etc. via `next.config.js` headers
- **TypeScript**: `strict: false`, `allowJs: true`, `jsx: "react-jsx"`
- **Prettier**: singleQuote, jsxSingleQuote, arrowParens: "avoid", trailingComma: "all", printWidth: 80
- **npm**: `save-exact = true` (pins exact versions)

## Content

- Blog posts: `data/blog/**/*.mdx` or `.md`
- Authors: `data/authors/*.mdx`
- Snippets: `data/snippets/**/*.mdx`
- Site config: `data/siteMetadata.js`
- App config (contact, projects): `config/`
- Drafts: set `draft: true` in frontmatter (excluded from sitemap)
- Create new posts via `node scripts/compose.js` (interactive CLI)
- Sitemap auto-generated on `npm run build` → `public/sitemap.xml`
- RSS feed: `lib/generate-rss.ts` (outputs `public/feed.xml`)

## Environment

Copy `.env.example` → `.env.local` for:

- Comments: Giscus (NEXT*PUBLIC_GISCUS*\*)
- Analytics: Google Analytics (NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
- Newsletter: Buttondown (default), Mailchimp, ConvertKit, or Klaviyo
- Authorized image domain: `firebasestorage.googleapis.com`

## Notable quirks

- `npm run lint` **writes** formatted files — use `npx prettier --check .` to read-only check
- No CI workflow, no tests
- ESLint has many relaxed rules: `no-unused-vars` off, `react-hooks/exhaustive-deps` off, `@next/next/no-img-element` off
- Dark mode: `class` strategy via `next-themes`
- Comments: Giscus (configured, requires env vars), alternatives: utterances, Disqus
- `.replit` and `replit.nix` legacy config present (not maintained)
