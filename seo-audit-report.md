# SEO Audit Report - kinali-elektronik.vercel.app

Date: 2026-02-04
Scope: Code-based audit (no live crawl). Repo: kinali-elektrik
Assumptions: Ecommerce + local electronics service in Istanbul targeting Turkish customers and value pricing.

## Executive Summary
Overall health: At-risk. The site has core SEO blockers caused by text encoding corruption and broken metadata logic.
Top issues (highest impact):
1) Garbled Turkish text in titles, meta descriptions, headings, and JSON-LD.
2) Broken canonical/meta logic on product and category pages.
3) Product/category pages appear to have malformed or missing structured data and placeholder content.

Quick wins: Fix UTF-8 text encoding, repair canonical/meta logic, and add correct product/breadcrumb schema.

---

## Technical SEO Findings

1) Garbled encoding across critical SEO fields
- Impact: High
- Evidence: `kinali-elektrik/src/app/layout.tsx`, `kinali-elektrik/src/app/page.tsx`, `kinali-elektrik/src/app/hero.tsx`, `kinali-elektrik/src/app/_components/footer.tsx`, `kinali-elektrik/src/app/arama/page.tsx` contain mojibake like "Kınalı" and missing Turkish diacritics.
- Fix: Normalize all user-facing Turkish text to proper UTF-8. Verify meta title/description, headings, JSON-LD strings, nav labels, and CTA text. Re-save files in UTF-8.
- Priority: P1

2) Canonical and metadata base logic appears broken on key pages
- Impact: High
- Evidence: `kinali-elektrik/src/app/urun/[slug]/page.tsx` and `kinali-elektrik/src/app/kategori/[slug]/page.tsx` use `process.env.NEXT_PUBLIC_SITE_URL ? "https://...";` which is malformed and can yield bad canonical URLs.
- Fix: Use nullish coalescing or fallback correctly; ensure self-referencing canonicals and absolute URLs on all indexable pages.
- Priority: P1

3) Structured data is incomplete or broken on product pages
- Impact: High
- Evidence: `kinali-elektrik/src/app/urun/[slug]/page.tsx` includes JSON-LD script tags that reference undefined `productJsonLd` and `breadcrumbJsonLd`.
- Fix: Build valid Product + BreadcrumbList JSON-LD from product data, include `@id`, `url`, `image`, `price`, `availability`, and category links. Validate in Rich Results Test.
- Priority: P1

4) Sitemap coverage is incomplete
- Impact: Medium
- Evidence: `kinali-elektrik/src/app/sitemap.ts` includes home, categories, products only. It excludes `tum-urunler` and any service/faq/about pages.
- Fix: Add all important indexable pages to sitemap; keep search results and filtered pages out.
- Priority: P2

5) Faceted filters may create crawl noise
- Impact: Medium
- Evidence: Category page uses filter params but metadata logic for robots is based on `searchParams` and looks incorrect; risk of indexed duplicates.
- Fix: Ensure filtered URLs are noindex + canonical to base category, or block via robots.txt if needed.
- Priority: P2

6) Social meta is incomplete
- Impact: Low
- Evidence: No twitter meta; OpenGraph lacks images.
- Fix: Add `openGraph.images` and `twitter` metadata; include a default share image.
- Priority: P3

7) Image optimization may hurt performance
- Impact: Medium
- Evidence: Product/category images use raw `<img>` and always fall back to placeholders due to incorrect logic in `product-card.tsx` and `category-grid.tsx`.
- Fix: Use actual image URLs; consider `next/image` with proper sizes and formats to improve LCP.
- Priority: P2

---

## On-Page SEO Findings

1) Titles and descriptions are corrupted or low quality
- Impact: High
- Evidence: Homepage and layout metadata show mojibake; product/category descriptions include broken strings like "rn".
- Fix: Rewrite titles/descriptions in clean Turkish; include primary keywords (e.g., "Istanbul elektronik servis", "ucuz TV tamiri", etc.).
- Priority: P1

2) Thin/duplicate product content
- Impact: Medium
- Evidence: Product description fallback is generic and likely reused for all products.
- Fix: Add unique descriptions, specs, compatibility, and FAQs per product.
- Priority: P2

3) Internal linking is weak and some links are placeholders
- Impact: Medium
- Evidence: Footer links use `#` and do not lead to real pages; header has no category/service links.
- Fix: Replace placeholders with real category/service pages and add internal links from homepage sections.
- Priority: P2

4) Branding and NAP inconsistency
- Impact: Medium
- Evidence: Footer text and brand name are corrupted; address text is unreadable.
- Fix: Ensure consistent Name-Address-Phone across header/footer and schema. Use same brand name and address everywhere.
- Priority: P2

---

## Content Quality Findings

1) Turkish content is visibly broken
- Impact: High
- Evidence: Many sections read as missing characters ("Gungoren", "urun" without diacritics) or corrupted mojibake.
- Fix: Restore clean Turkish copy site-wide.
- Priority: P1

2) Missing trust content
- Impact: Medium
- Evidence: Privacy/Terms links are placeholders; no dedicated pages.
- Fix: Add Privacy Policy, Terms, and a Contact/Service page to improve trust and E-E-A-T.
- Priority: P2

3) Local SEO depth is limited
- Impact: Medium
- Evidence: Only a single LocalBusiness schema on home. No dedicated location/service pages.
- Fix: Add location and service pages (e.g., "Istanbul TV tamiri", "Gungoren telefon tamiri"). Expand local signals (map, driving directions, service area).
- Priority: P2

---

## Prioritized Action Plan

1) Critical (P1)
- Fix all UTF-8 text encoding issues in metadata, headings, and content.
- Repair canonical and metadata base logic for product and category pages.
- Implement valid Product + BreadcrumbList schema on product pages.

2) High impact (P2)
- Replace placeholder content and generic descriptions with unique Turkish copy.
- Build real internal links (categories, services, policies).
- Add missing indexable pages to sitemap.
- Fix image logic to use real product/category images and optimize for LCP.

3) Quick wins (P2/P3)
- Add OpenGraph image + twitter metadata.
- Add Privacy Policy and Terms pages.
- Confirm robots.txt and sitemap are accessible at /robots.txt and /sitemap.xml.

4) Long-term
- Build a local SEO content plan (service + location pages).
- Set up GSC and monitor coverage, CWV, and query performance.

---

## Open Questions (to refine next pass)
1) What are the top 5 products/services you want to rank for?
2) Any target districts in Istanbul beyond Gungoren?
3) Do you want to rank for repair services only, product sales only, or both?
4) Who are your top 3 local competitors?

---

## Notes
This audit is based on code review only. A live crawl (Screaming Frog) and performance test (PageSpeed) would likely surface additional issues.
