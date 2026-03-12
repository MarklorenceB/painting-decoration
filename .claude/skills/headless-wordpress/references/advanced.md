# Advanced Usage & Best Practices

## Adding ACF Fields

1. WordPress Admin > Custom Fields > Field Groups > Add New
2. Create fields, set location rules
3. Enable "Show in GraphQL" for field group AND individual fields
4. Set a meaningful "GraphQL Field Name" (camelCase) on the field group
5. Update GraphQL queries in `src/lib/queries.ts`
6. Update TypeScript types in `src/types/wordpress.ts`

## Dynamic Routes for Individual Pages

Create `src/app/[slug]/page.tsx`:

```typescript
import { fetchGraphQL } from '@/lib/graphql';
import { GET_PAGE_BY_SLUG } from '@/lib/queries';
import { PageResponse } from '@/types/wordpress';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await fetchGraphQL<PageResponse>(GET_PAGE_BY_SLUG, { slug });
  return <div>{/* Render page data */}</div>;
}
```

## Next.js Caching Strategies

```typescript
// Static generation with revalidation (ISR) — good for content that changes occasionally
export const revalidate = 60; // seconds

// Force dynamic rendering — for content that changes frequently or is user-specific
export const dynamic = 'force-dynamic';
```

## GraphQL Query Optimization

Request only the fields you actually use to reduce payload:
```typescript
const OPTIMIZED_QUERY = `
  query GetPages {
    pages(first: 20) {
      nodes {
        id
        title
        slug
        pageHero { heroH1 }
      }
    }
  }
`;
```

## Environment-Specific Config

```bash
# Development (.env.local)
WP_GRAPHQL_URL=https://staging.example.com/graphql
WP_AUTH_TOKEN=...  # if staging has Basic Auth

# Production (.env.production)
WP_GRAPHQL_URL=https://example.com/graphql
```

## ACF Field Export for Version Control

1. WordPress Admin > Custom Fields > Tools > Export
2. Choose "Generate PHP code" or export as JSON
3. Save to your repo for documentation purposes

## GraphQL Schema Introspection

Discover available types and fields:
```bash
# List all custom types
curl -s "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name kind } } }"}' \
  | python3 -c "import sys,json; [print(t['name']) for t in json.loads(sys.stdin.read())['data']['__schema']['types'] if not t['name'].startswith('__')]"

# Inspect a specific type's fields
curl -s "https://example.com/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __type(name: \"Page\") { fields { name type { name } } } }"}'
```

## GraphQL Debugging

1. WordPress Admin > GraphQL > Settings
2. Enable "GraphiQL IDE"
3. Visit `https://example.com/graphql` for interactive query builder
4. Use this to test queries before adding them to Next.js

## Preview Mode

For draft content preview, consider implementing Next.js Draft Mode:
1. Create an API route that sets the draft cookie
2. Use WordPress preview links to trigger it
3. Fetch draft content with authenticated GraphQL queries

## Managing Plugins via REST API

Install additional plugins without logging into WP Admin:
```bash
# Install and activate a plugin
curl -s -X POST -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins" \
  -H "Content-Type: application/json" \
  -d '{"slug": "plugin-slug", "status": "active"}'

# List installed plugins
curl -s -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins"

# Deactivate a plugin
curl -s -X PUT -u "USERNAME:APP_PASSWORD" \
  "https://example.com/wp-json/wp/v2/plugins/plugin-folder/plugin-file" \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
```

## Security Notes

- Never commit `.env.local` or application passwords to git
- Application passwords can be revoked in WP Admin > Users > Profile at any time
- GraphQL queries run server-side in Next.js RSC, so WordPress credentials are never exposed to the browser
- For production, consider restricting GraphQL introspection and limiting query depth
