# Troubleshooting Guide

## Quick Diagnosis Matrix

| Symptom | Check 1 | Check 2 | Check 3 | Likely Cause |
|---------|---------|---------|---------|--------------|
| REST API 401 | Application password correct? | User has admin role? | Security plugin blocking? | Auth issue |
| Plugin install fails | Try via WP Admin UI | Check disk space | Plugin slug correct? | Server restriction |
| 404 on GraphQL | Permalink structure | WPGraphQL active? | Try `/index.php?graphql` | Permalinks or plugin not active |
| Empty pages list | Create page in WP Admin | Check GraphQL query | Verify ACF field names | No content or query mismatch |
| Type errors in Next.js | `npm run type-check` | Compare types to schema | Check field name casing | Type definition mismatch |

## REST API Connection Issues

### 401 Unauthorized

- Verify the application password has no extra spaces (copy-paste carefully)
- Confirm the user account has the Administrator role
- Check if a security plugin (Wordfence, iThemes, etc.) is blocking REST API access
- Try accessing `https://example.com/wp-json/wp/v2/users/me` with the same credentials to isolate the issue

### 403 Forbidden

- The user may not have the `install_plugins` capability
- Some hosts restrict the plugins REST API endpoint
- Check if the site uses a WAF (Cloudflare, Sucuri) that blocks API requests
- Try whitelisting your IP address if behind a WAF

### Connection Timeout

- Verify the WordPress site URL is correct and accessible
- Check if the site is behind a VPN or firewall
- Try accessing the site in a browser first

## Plugin Installation Failures

If the REST API plugin installation fails:

1. **Fallback to WP Admin UI** — navigate to Plugins > Add New and search for the plugin
2. **Check server restrictions** — some managed hosts block plugin installation via API
3. **Verify disk space** — the server may be out of storage
4. **Check file permissions** — the web server needs write access to `wp-content/plugins/`

## GraphQL Endpoint Returns 404

1. **Permalinks not set to "Post name":**
   - Go to WP Admin > Settings > Permalinks
   - Select "Post name" (`/%postname%/`)
   - Save (this flushes rewrite rules)

2. **WPGraphQL not activated:**
   - Go to WP Admin > Plugins
   - Find WPGraphQL and click Activate

3. **Try alternative endpoint:** `https://example.com/index.php?graphql`

4. **Check WPGraphQL settings:** WP Admin > GraphQL > Settings — verify the endpoint path

## ACF Fields Not Showing in GraphQL

This is the most common issue. Check all of these:

1. Field group has "Show in GraphQL" enabled (field group settings, not individual fields)
2. Each individual field also has "Show in GraphQL" enabled
3. Field group is assigned to the correct post type via location rules
4. The "GraphQL Field Name" on the field group is set (defaults to camelCase of the group title)
5. Save the field group after making changes
6. Try a simple introspection query to see what's in the schema:
   ```bash
   curl -s "https://example.com/graphql" \
     -H "Content-Type: application/json" \
     -d '{"query": "{ __type(name: \"Page\") { fields { name } } }"}'
   ```

## Next.js Connection Errors

1. **Check `.env.local`** — `WP_GRAPHQL_URL` should point to the real WordPress GraphQL endpoint
2. **Test the endpoint directly:**
   ```bash
   curl -s "https://example.com/graphql" \
     -H "Content-Type: application/json" \
     -d '{"query": "{ generalSettings { title } }"}'
   ```
3. **CORS:** GraphQL queries run server-side in Next.js (React Server Components), so CORS isn't typically an issue. If you're fetching client-side, you'll need a CORS plugin on WordPress.
4. **SSL:** If the WordPress site uses HTTPS, make sure the certificate is valid. Self-signed certs will fail in Node.js unless `NODE_TLS_REJECT_UNAUTHORIZED=0` is set (not recommended for production).

## Staging Sites with Basic Auth

If the WordPress site is behind HTTP Basic Auth (common for staging):

```
# .env.local
WP_GRAPHQL_URL=https://staging.example.com/graphql
WP_AUTH_TOKEN=dXNlcm5hbWU6cGFzc3dvcmQ=
```

The `WP_AUTH_TOKEN` is Base64-encoded `username:password`. Generate it:
```bash
echo -n "username:password" | base64
```

The GraphQL client should pass this as an `Authorization: Basic ...` header.
