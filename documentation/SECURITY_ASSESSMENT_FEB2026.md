# Security Assessment — February 2026

**Scope:** Full app security scan, Netlify configuration, URL sharing compatibility  
**Date:** February 8, 2026

---

## Executive Summary

The app is in **good security posture** for a static, client-only site. Netlify config and headers are solid. URL sharing works correctly. No critical issues found. A few optional hardenings are recommended.

---

## Netlify Configuration Assessment

### Current State

| Setting | Value | Status |
|--------|-------|--------|
| Build command | `yarn generate` | ✅ Correct |
| Publish directory | `.output/public` | ✅ Correct |
| Node version | 22 | ✅ Matches `.nvmrc` |
| Redirects | None | ✅ Not needed (static output has per-route HTML) |

### URL Sharing: `/share?r=...`

- **Static output:** `.output/public/share/index.html` exists — `/share` is served correctly.
- **Query parameter:** `?r=` (base64 payload) is preserved; no redirect or rewrite strips it.
- **Routing:** Nuxt static build outputs `share/index.html` and `200.html`; `/share` resolves to the share page.
- **Conclusion:** URL sharing works as designed. No Netlify changes required for sharing.

### Security Headers (Current)

| Header | Value | Assessment |
|--------|-------|------------|
| `X-Frame-Options` | `DENY` | ✅ Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | ✅ Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ Limits referrer — cross-origin only sends origin, not full URL with `r=` |
| `Permissions-Policy` | Restrictive | ✅ Disables camera, mic, geolocation, etc. |
| `Strict-Transport-Security` | 1 year, preload | ✅ Enforces HTTPS |
| `X-XSS-Protection` | `1; mode=block` | ⚠️ Legacy; CSP is primary |
| `Content-Security-Policy` | Strict with `'unsafe-inline'` | ⚠️ See below |

### CSP Notes

- `script-src 'self' 'unsafe-inline'` — Required for Nuxt/Vue hydration.
- `img-src 'self' data: blob:` — Needed for PNG export preview via blob URLs.
- `object-src 'none'`, `frame-ancestors 'none'` — Good defenses.
- `'unsafe-inline'` weakens XSS protection but is common for Vue/Nuxt; input sanitization and escaping mitigate risk.

---

## App Security Scan

### Data Flow & Privacy

| Area | Status | Notes |
|------|--------|-------|
| Share payload | ✅ | PII excluded; only aggregated data in `r=` |
| localStorage | ✅ | History limited to 100 meetings; quota handled |
| Server data | ✅ | No backend; all processing client-side |

### Input Sanitization

| Input | Sanitized | Location |
|-------|-----------|----------|
| Meeting description | ✅ | `useCalculator.buildMeeting`, `useReceipt`, `Receipt.vue`, `history.vue` |
| Participant role | ✅ | `useCalculator.buildMeeting` |
| Share page `payload.m` | ⚠️ | Rendered via `{{ payload.m }}` — Vue escapes HTML; optional extra sanitization for defense in depth |

### Share Page (Forged URLs)

- Anyone can forge `/share?r=<base64>` with arbitrary payloads.
- `payload.m` is rendered with Vue `{{ }}`, which escapes HTML.
- XSS risk: **Low** — Vue escaping protects against typical injection.
- Optional: run `payload.m` through `sanitizeString()` before display for extra safety.

### XSS Mitigations

- `sanitizeString()` used for meeting description, role, export text.
- Strips HTML, `javascript:`, `data:`, control chars, zero-width chars.
- Share page uses `{{ }}` only (no `v-html`).

### Dependencies

- `yarn audit` — Past assessments show 0 critical/high/medium.
- jsPDF 4.x in use (previous vulns addressed).

---

## Outstanding Issues

### Netlify

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| None identified | — | No changes required for URL sharing or security |

### App-Level (Optional)

| Issue | Severity | Recommendation |
|-------|----------|----------------|
| Share page `payload.m` not sanitized | Low | Optional: `sanitizeString(payload.m)` before render for defense in depth |
| Very long `r=` param | Low | Optional: cap length in `decodeSharePayload` to reduce DoS risk |

---

## Changes Applied

1. **Removed `X-XSS-Protection`** — Deprecated; can interfere with CSP. CSP is the primary XSS defense.
2. **Added `/share`-specific header** — `Referrer-Policy: no-referrer` for the share page so the `r=` param is never sent as referrer on outbound requests or when users navigate away.

---

## Conclusion

- **Netlify:** Configuration is sound; `/share?r=...` works; no blocking issues.
- **Security:** Strong for a static, client-only app with no backend.
- **Actions taken:** Removed deprecated X-XSS-Protection; added no-referrer for share page.
