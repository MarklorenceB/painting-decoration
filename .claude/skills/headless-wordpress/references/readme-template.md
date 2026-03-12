# README Template

Use this template when generating the project README.md. Replace bracketed values with actual project details.

---

# [Project Name] — Next.js Frontend

Next.js frontend for [WordPress Site Name], powered by WPGraphQL.

## Tech Stack

- **CMS:** WordPress ([URL]) with WPGraphQL, ACF, Yoast SEO
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Data:** GraphQL via `graphql-request`

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment

Copy `.env.example` to `.env.local` and fill in:

```
WP_GRAPHQL_URL=https://[wordpress-url]/graphql
```

For staging sites behind Basic Auth, also set:
```
WP_AUTH_TOKEN=[base64-encoded-credentials]
```

## Project Structure

```
web/
├── src/
│   ├── app/           # Next.js pages & routes
│   ├── lib/
│   │   ├── graphql.ts # GraphQL client
│   │   └── queries.ts # GraphQL queries
│   └── types/
│       └── wordpress.ts  # TypeScript types for WP data
├── .env.local         # Environment config (not committed)
└── package.json
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint
```

## Adding New Pages

1. Create content in WordPress Admin
2. Add ACF fields if needed (enable "Show in GraphQL")
3. Add/update GraphQL queries in `src/lib/queries.ts`
4. Update TypeScript types in `src/types/wordpress.ts`
5. Create route in `src/app/[route]/page.tsx`

## Deployment

Set `WP_GRAPHQL_URL` as an environment variable in your hosting platform (Vercel, Netlify, etc.).

## WordPress Dependencies

These plugins must be active on the WordPress site:
- WPGraphQL
- Advanced Custom Fields (ACF)
- Yoast SEO
- WPGraphQL for ACF
- WPGraphQL Yoast SEO Addon
