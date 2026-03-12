---
name: headless-wordpress
description: >-
  Connect an existing WordPress site to a new Next.js frontend using WPGraphQL. Installs
  and configures required plugins (WPGraphQL, ACF, Yoast SEO) on the user's real WordPress
  site via the REST API using application passwords, then scaffolds a Next.js frontend
  with TypeScript, Tailwind CSS, and type-safe GraphQL queries. Use this skill whenever
  the user wants to set up headless WordPress, create a WordPress + Next.js stack, build
  a GraphQL-powered WordPress frontend, go headless with their existing WordPress site,
  or mentions WPGraphQL with a modern frontend. Also trigger when users ask for "WordPress
  as a CMS with React/Next", "headless CMS with WordPress", "decouple my WordPress
  frontend", or any variation of connecting WordPress to Next.js — even if they don't
  use the word "headless" explicitly.
---

# Headless WordPress + Next.js Setup

Connect an existing WordPress site to a new Next.js frontend via WPGraphQL. This skill works with any live or staging WordPress site — no Docker, no local WordPress instance.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, WPGraphQL, ACF, Yoast SEO

## What You Need From the User

Before starting, collect these details:

1. **WordPress Admin URL** — e.g., `https://example.com/wp-admin`
2. **Admin username**
3. **Application password** — for REST API access (not their regular login password)

If the user doesn't have an application password yet, walk them through creating one:
1. Go to WP Admin > Users > Profile
2. Scroll to "Application Passwords"
3. Enter a name (e.g., "Claude Setup") and click "Add New Application Password"
4. Copy the generated password — it's only shown once

Also confirm:
- They have admin-level access to the WordPress site
- The site is accessible from where you're running (not behind a firewall that blocks API access)

## Phase 1: Verify WordPress Connection

### 1.1 Test REST API access

Use the application password to verify the connection works. The REST API uses Basic Auth with the username and application password.

```bash
curl -s -u "USERNAME:APPLICATION_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" | head -c 200
```

If this returns a JSON array of plugins, the connection is working. If it returns a 401 or error, troubleshoot:
- Verify the application password is correct (no extra spaces)
- Check that the REST API isn't blocked by a security plugin
- Confirm the user has administrator role

### 1.2 Check what's already installed

Query the plugins endpoint to see what's already active. This avoids reinstalling things unnecessarily.

```bash
curl -s -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" | python3 -m json.tool
```

Note which of these are already installed/active:
- `wp-graphql/wp-graphql.php`
- `advanced-custom-fields/acf.php`
- `wordpress-seo/wp-seo.php`
- `wpgraphql-acf/wpgraphql-acf.php`
- `add-wpgraphql-seo/wp-graphql-yoast-seo.php`

## Phase 2: Install & Activate Required Plugins

For each plugin that isn't already installed, use the REST API to install and activate it. The REST API plugin endpoint accepts the plugin slug from wordpress.org.

### 2.1 Install plugins via REST API

Install each missing plugin:

```bash
# WPGraphQL — the core GraphQL API
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "wp-graphql", "status": "active"}'

# Advanced Custom Fields
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "advanced-custom-fields", "status": "active"}'

# Yoast SEO
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "wordpress-seo", "status": "active"}'

# WPGraphQL for ACF
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "wpgraphql-acf", "status": "active"}'

# WPGraphQL Yoast SEO Addon
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "add-wpgraphql-seo", "status": "active"}'
```

Each successful response returns the plugin object with `"status": "active"`. If a plugin is already installed but inactive, activate it:

```bash
curl -s -X PUT -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins/wp-graphql/wp-graphql" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### 2.2 Verify permalinks are set

WPGraphQL needs pretty permalinks for the `/graphql` endpoint. Check via REST API:

```bash
curl -s -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/settings" \
  -H "Content-Type: application/json"
```

If `permalink_structure` is empty, the user needs to go to WP Admin > Settings > Permalinks and select "Post name" (`/%postname%/`). This can't be set via REST API — let the user know.

### 2.3 Verify GraphQL endpoint

```bash
curl -s "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ generalSettings { title url } }"}'
```

Should return JSON with the site title. If 404:
- Permalinks aren't set to "Post name"
- Try `https://example.com/index.php?graphql` as fallback
- Ask user to visit WP Admin > GraphQL > Settings and verify the endpoint

## Phase 3: ACF Configuration

Ask the user what content structure they need — the ACF fields depend entirely on their project. Guide them through creating field groups in WP Admin.

Common approach:
1. Go to WP Admin > Custom Fields > Field Groups > Add New
2. Create fields for their content model
3. Set location rules (which post types get which fields)
4. **Enable "Show in GraphQL"** on both the field group AND each individual field — this is the most commonly missed step and will cause fields to silently not appear in the GraphQL schema

After creating fields and adding content to a page, verify ACF data appears in GraphQL:

```bash
curl -s "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ pages { nodes { title } } }"}'
```

## Phase 4: Next.js Frontend

### 4.1 Create Next.js app

```bash
npx create-next-app@latest web --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd web
```

### 4.2 Configure environment

Create `web/.env.local`:
```
WP_GRAPHQL_URL=https://example.com/graphql
```

Use the actual WordPress site URL. For sites behind Basic Auth (staging), you may also need:
```
WP_AUTH_TOKEN=dXNlcm5hbWU6YXBwbGljYXRpb25fcGFzc3dvcmQ=
```
(Base64-encoded `username:application_password` — only needed if GraphQL queries require auth)

### 4.3 Install dependencies

```bash
npm install graphql graphql-request
```

### 4.4 Create GraphQL client (`web/src/lib/graphql.ts`)

```typescript
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.WP_GRAPHQL_URL!;

const headers: Record<string, string> = {};
if (process.env.WP_AUTH_TOKEN) {
  headers['Authorization'] = `Basic ${process.env.WP_AUTH_TOKEN}`;
}

export const graphqlClient = new GraphQLClient(endpoint, { headers });

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  return graphqlClient.request<T>(query, variables);
}
```

### 4.5 Create TypeScript types and queries

Create `web/src/types/wordpress.ts` with types matching the user's actual ACF field structure, and `web/src/lib/queries.ts` with GraphQL queries for their content.

Adapt these to the user's real content model. Query the GraphQL schema to discover available fields:

```bash
curl -s "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name fields { name } } } }"}' \
  | python3 -c "import sys,json; [print(t['name'], [f['name'] for f in (t.get('fields') or [])]) for t in json.loads(sys.stdin.read())['data']['__schema']['types'] if t['name'].startswith('Page') or 'Hero' in t['name'] or 'Acf' in t['name']]"
```

This helps discover the exact GraphQL field names for ACF groups and Yoast SEO data.

### 4.6 Create the home page

Build `web/src/app/page.tsx` with:
- Server-side data fetching via GraphQL
- Display of WordPress pages with their ACF custom fields
- Yoast SEO metadata
- Error handling with troubleshooting tips

See `assets/page.tsx` for a reference implementation. Adapt it to match the user's fields and design.

### 4.7 Start and verify

```bash
npm run dev
```

Verify at `http://localhost:3000` that real WordPress content appears.

## Phase 5: Git & Handoff

Create `.gitignore`:
```
node_modules/
.next/
.env.local
.DS_Store
```

Generate a README — see `references/readme-template.md` for a template.

Provide the user with:
- How to start the dev server (`npm run dev` in `web/`)
- How to add new pages/routes
- Reminder that ACF field changes in WP Admin need matching TypeScript type updates
- How to deploy (Vercel, etc.) — just set `WP_GRAPHQL_URL` as an environment variable

## Troubleshooting

For detailed troubleshooting, read `references/troubleshooting.md`. Quick reference:

| Issue | Fix |
|-------|-----|
| REST API returns 401 | Verify application password, check security plugins aren't blocking REST API |
| Plugin install fails via API | Try installing through WP Admin UI instead |
| GraphQL 404 | Set permalinks to "Post name" in WP Admin > Settings > Permalinks |
| ACF fields missing in GraphQL | Enable "Show in GraphQL" on field group AND individual fields |
| Next.js can't reach WordPress | Check `WP_GRAPHQL_URL` in `.env.local`, verify site is accessible |
| CORS errors in browser | GraphQL queries should run server-side (Next.js RSC), not from browser |
