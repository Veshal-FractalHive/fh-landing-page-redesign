---
name: azure-deploy
description: Deploying the site to Azure Static Web Apps and building the contact form as an Azure Function. Load before touching staticwebapp.config.json, the api/ folder, GitHub Actions deploy workflows, headers, redirects or environment variables.
---

# Azure Static Web Apps

The Astro site is fully static (`dist/`). Server logic runs as SWA managed Azure Functions in `api/`.
Don't add an Astro SSR adapter.

## Layout

```
public/staticwebapp.config.json   # copied into dist/ at build
api/                              # Azure Functions (Node, v4 programming model)
  package.json
  host.json
  src/functions/contact.ts
  local.settings.json             # local secrets, gitignored
.github/workflows/azure-static-web-apps.yml
```

## staticwebapp.config.json

- `responseOverrides.404` rewrites to `/404.html` (build a `src/pages/404.astro`).
- No `navigationFallback`: this is a multi-page site, not an SPA.
- `globalHeaders`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  a Content-Security-Policy that allows only what the site uses, `Permissions-Policy` locking unused features.
- Long cache for hashed assets: route `/_astro/*` → `cache-control: public, max-age=31536000, immutable`.
- Redirects from old fractalhive.com URLs go in `routes` with `statusCode: 301`. Keep a list of them when
  the page structure changes, so existing links and SEO survive.
- `platform.apiRuntime` must match a Node version SWA supports.

## Contact form function

- `POST /api/contact`, anonymous. Validate on the server (zod), whatever the client already checked.
- Spam protection: a honeypot field, a minimum time-to-submit, and a basic per-IP rate limit.
  Add Cloudflare Turnstile or reCAPTCHA only if spam gets through.
- Send email through a provider chosen by the user (Azure Communication Services Email or Resend; still
  undecided, so ask). Read keys from app settings (`process.env`), never from code.
- Return JSON `{ ok: true }` or `{ ok: false, error }` with correct status codes. The form shows
  success/warning states through the state tokens and announces them with `aria-live`.
- The form must work without JS: plain `<form method="post" action="/api/contact">`, with a redirect to a
  thank-you page. JS adds inline validation and states on top.

## Deploy workflow

GitHub Actions with `Azure/static-web-apps-deploy@v1`: `app_location: "/"`, `api_location: "api"`,
`output_location: "dist"`. The deploy token lives in repo secrets. PRs get preview environments automatically.

## Secrets

Production values go in SWA → Configuration → Application settings. Local values go in
`api/local.settings.json` (gitignored). Never commit keys. When unsure about an Azure detail, check the
`azure` / `microsoft-docs` plugin or the official docs rather than guessing.
