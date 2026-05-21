# Migration Context: American Express Investor Relations → AEM Edge Delivery Services

## Project Overview

We are migrating the American Express Investor Relations site (https://ir.americanexpress.com) to AEM Edge Delivery Services (xwalk project type). 

**AEM Instance:** `https://author-p92869-e1797231.adobeaemcloud.com`
**Project repo:** `/backups/mckuckuck/aem-ir/repo`
**Project type:** xwalk (markup-based EDS)
**fstab mount:** `https://author-p92869-e1797231.adobeaemcloud.com/bin/franklin.delivery/mckuckuck/aem-ir/main`
**Library URL:** `https://main--aem-ir--mckuckuck.aem.page/tools/sidekick/library.json`
**Content path:** `/content/aem-ir`

## Current Status

### ✅ Phase 1: Block Development — COMPLETE

All 23 custom blocks built with JS, CSS, and Universal Editor model files (`_<block>.json`).

| # | Block | Variants | Status |
|---|-------|----------|--------|
| 1 | Hero | base, home | ✅ Built |
| 2 | Stock Ticker | — | ✅ Built |
| 3 | Upcoming Event Card | — | ✅ Built |
| 4 | Earnings Summary | — | ✅ Built |
| 5 | Sec Filings Preview | — | ✅ Built |
| 6 | News List | — | ✅ Built |
| 7 | Annual Report Card | — | ✅ Built |
| 8 | Document List | — | ✅ Built |
| 9 | Year Selector | — | ✅ Built |
| 10 | Filterable Data Table | sec-filings, insider-filings, term-sheets | ✅ Built |
| 11 | Events Calendar | — | ✅ Built |
| 12 | Stock Quote | — | ✅ Built |
| 13 | Stock Chart | — | ✅ Built |
| 14 | Historic Prices | — | ✅ Built |
| 15 | Investment Calculator | — | ✅ Built |
| 16 | Executive Profiles | — | ✅ Built |
| 17 | Annual Reports Gallery | — | ✅ Built |
| 18 | Funding Overview | — | ✅ Built |
| 19 | Investor Alerts | — | ✅ Built |
| 20 | ABS Section | — | ✅ Built |
| 21 | Commercial Paper | — | ✅ Built |
| 22 | Email Alerts Form | — | ✅ Built |
| 23 | Information Request | — | ✅ Built |

**Standard EDS blocks configured:** Cards, Columns, Fragment (with model files)

**Generated files:** `component-models.json`, `component-definition.json`, `component-filters.json` (35 total components registered)

### ✅ Phase 2: Content Migration — COMPLETE (local)

All 22 pages created as local HTML content with corresponding `.plain.html` files for md2jcr processing.

| Section | Pages | Content Files |
|---------|-------|---------------|
| Home | IR Home | `content/index.html` |
| Events | Events | `content/events/index.html` |
| Financials | Earnings & SEC Filings | `content/financials/earnings-and-sec-filings.html` |
| | Annual Reports & Proxy | `content/financials/annual-reports-and-proxy-statements.html` |
| | Insider Filings | `content/financials/insider-filings.html` |
| | Pillar 3 Disclosures | `content/financials/pillar-3-disclosures.html` |
| | LCR Disclosures | `content/financials/lcr-disclosures.html` |
| Stock Info | Stock Information | `content/stock-information/index.html` |
| Governance | Executive Committee & Directors | `content/governance-and-corporate-responsibility/executive-committee-and-directors.html` |
| | Governance Framework | `content/governance-and-corporate-responsibility/governance-framework.html` |
| | Committee Composition | `content/governance-and-corporate-responsibility/committee-composition.html` |
| | Shareholder Engagement | `content/governance-and-corporate-responsibility/shareholder-engagement.html` |
| | Reporting & Resources | `content/governance-and-corporate-responsibility/reporting-and-resources.html` |
| | Policy Engagement | `content/governance-and-corporate-responsibility/policy-engagement-and-political-activity.html` |
| Fixed Income | Fixed Income Investors | `content/fixed-income-investors/index.html` |
| News | Investor Relations News | `content/news/investor-relations-news.html` |
| Resources | Sign Up for Email Alerts | `content/resources/sign-up-for-email-alerts.html` |
| | FAQ | `content/resources/faq.html` |
| | Shareholder Services | `content/resources/shareholder-services.html` |
| | Information Request | `content/resources/information-request.html` |
| | Our Contact Information | `content/resources/our-contact-information.html` |

### 🔲 Phase 2 Remaining: Data Sheets

13 spreadsheet data sources referenced by blocks but not yet populated:

- `sec-filings.json` — SEC filings data
- `events.json` — Events data
- `news.json` — News items (not yet created)
- `insider-filings.json` — Insider transaction data
- `term-sheets.json` — Term sheets data
- `pillar3-disclosures.json` — Pillar 3 disclosure documents
- `lcr-disclosures.json` — LCR disclosure documents
- `fi-presentations.json` — Fixed income presentations
- `reporting-resources.json` — ESG/reporting documents
- `abs-servicer-reports-master.json` — ABS servicer reports
- `abs-performance-master.json` — ABS performance data
- `abs-servicer-reports-issuance.json` — ABS issuance reports
- `abs-performance-issuance.json` — ABS issuance performance

### 🔲 Phase 3: Design & Styling — NOT STARTED

- AmEx blue palette (#006fcf primary)
- Roboto typography (fonts already in repo at `fonts/`)
- Responsive breakpoints
- Per-block visual polish to match source site

### 🔲 Phase 4: QA & Finalization — NOT STARTED

### ⚠️ Blocking Issue: AEM Config Service

The md2jcr Sidekick tool reports "Missing site configuration" when attempting to push content to AEM. The site `mckuckuck/aem-ir` needs its Config Service registration updated to recognize it as a markup/xwalk project with:
- `contentSourceUrl`: `https://author-p92869-e1797231.adobeaemcloud.com`
- `contentSourceType`: `markup`

Until resolved, content cannot be pushed to AEM via md2jcr.

## Site Scope

- **22 static pages** + a News Detail page template
- **678 assets** (PDFs, XLS, XBRL ZIPs, HTML files) — already downloaded and uploaded to AEM DAM at `/content/dam/ir/`
- Assets are also stored locally in `assets-zipped/` as 9 tar.gz archives (<100MB each)
- Full asset inventory CSV at `docs/block-analysis/asset-inventory.csv` (source URL, local path, AEM DAM path, filename, file type, page where used)

## Block Architecture (35 components registered)

### 23 Custom blocks (built)

- **Hero** (2 variants): `hero (home)` with upcoming event + stock ticker; base `hero` with breadcrumb + page title
- **Filterable Data Table** (3 variants): `sec-filings`, `insider-filings`, `term-sheets` — dropdown filters + data table + download links, powered by sheets
- **Year Selector** — year dropdown + document list with PDF downloads (reused on 7 page instances)
- **Document List** — container block with repeating document items (title + PDF link + icon)
- **Events Calendar** — interactive calendar widget + upcoming/past events with type/year filters
- **News List** — date-sorted news items with configurable count
- **Earnings Summary** — latest quarter's download links (press release, webcast, presentation, tables, 10-Q)
- **Sec Filings Preview** — latest filings with configurable count
- **Upcoming Event Card** — single event with date/time, title, webcast, calendar links
- **Annual Report Card** — report thumbnail + PDF/HTML download links
- **Annual Reports Gallery** — container with year-by-year report covers and downloads
- **Stock Ticker** — NYSE:AXP price, change, market cap, volume
- **Stock Quote** — detailed quote with open/high/low/close
- **Stock Chart** — interactive chart with time range + index comparison
- **Historic Prices** — date-range filtered daily prices table
- **Investment Calculator** — investment modeling with S&P/Nasdaq/Dow comparison
- **Executive Profiles** — container with tabbed (Executive Committee / Board) photo + bio cards
- **Investor Alerts** — email + checkbox preferences
- **Funding Overview** — text + image layout
- **ABS Section** — complex section with sub-sections and disclaimers
- **Commercial Paper** — structured content with ratings and contacts
- **Email Alerts Form** — subscribe + unsubscribe sections
- **Information Request** — multi-field contact form with CAPTCHA placeholder

### 5 Standard EDS blocks (configured with models)

- Columns
- Cards (+ Card items)
- Fragment

### Default Content components

- Text, Title, Image, Button, Section

## Data Architecture

### 3 Shared sheets (feed multiple pages)

- `sec-filings.json` → Earnings page table + IR Home preview + IR Home earnings summary
- `events.json` → Events page calendar/list + IR Home hero event + IR Home event card
- `news.json` → News page archive + IR Home news list

### 10 Dedicated sheets (one page each)

- `insider-filings.json`, `term-sheets.json`, `pillar3-disclosures.json`, `lcr-disclosures.json`, `fi-presentations.json`, `abs-servicer-reports-master.json`, `abs-performance-master.json`, `abs-servicer-reports-issuance.json`, `abs-performance-issuance.json`, `reporting-resources.json`

### Authored directly (no sheet — small/static data)

- Document List, Dividends Table, Committee Composition, Credit Ratings, Commercial Paper Ratings, Rate Info

## Key Design Decisions Made

1. **One Hero block with variants** — `hero (home)` for IR Home (event card + stock ticker), base `hero` for 21 interior pages (breadcrumb + title + blue background)
2. **One Filterable Data Table block with 3 variants** — consolidates SEC Filings Table, Insider Filings Table, and Term Sheets Table
3. **Analyst Contacts = standard Columns** — not a custom block, just 3-column rich text
4. **Document List is a reusable custom block** — used on Governance Framework (13 charters/policies), Policy Engagement (10 contribution reports), and Fixed Income (sustainability + ABS program docs)
5. **Governance/Policy pages split into Default Content + Document List** — rich text intro followed by structured download list
6. **Fixed Income page uses Tabs block** with 7 tabs, each containing nested blocks (Year Selectors, Document Lists, Tables, rich text)
7. **All assets hosted in AEM** (not external CDNs) — DAM path: `/content/dam/ir/{category}/{year}/filename.pdf`
8. **News Detail pages** are a single template — all Default Content + Columns for contacts, with "About AmEx" boilerplate as a potential shared fragment
9. **Component naming** — md2jcr title-cases CSS class names, so `sec-filings-preview` becomes "Sec Filings Preview" (not "SEC Filings Preview") in component-definition.json
10. **Content path** — Updated `paths.json` to map `/content/aem-ir/` → `/` for delivery pipeline

## Key Files in Repo

| File | Description |
|------|-------------|
| `docs/block-analysis/block-analysis.md` | Full visual block analysis with annotated screenshots of all 22 pages |
| `docs/block-analysis/asset-inventory.csv` | 678-row CSV mapping source URL → local path → AEM DAM path → page used on |
| `docs/block-analysis/screenshots/` | 21 annotated page screenshots with block overlays |
| `ir-americanexpress-blocks.csv` | Block inventory CSV with properties and types |
| `ir-americanexpress-pages.md` | Page list with URLs |
| `assets-zipped/` | 9 tar.gz archives of all downloaded assets |
| `tools/upload-assets-to-aem.sh` | Script for uploading to AEM DAM (already run successfully) |
| `tools/download-assets.sh` | Script for downloading from source site |
| `.migration/project.json` | Project config (xwalk, author instance, library URL) |
| `fstab.yaml` | EDS mount config (markup type, AEM author) |
| `paths.json` | Content path mapping (`/content/aem-ir/` → `/`) |
| `tools/sidekick/config.json` | Sidekick config with contentSourceUrl and contentPath |
| `component-models.json` | Generated Universal Editor models (35 components) |
| `component-definition.json` | Generated component registry |
| `component-filters.json` | Generated filter definitions |
| `content/` | 22 pages as HTML + .plain.html for md2jcr |
| `content-packages/ir-home/.content.xml` | JCR XML for IR Home page (manual export) |
| `blocks/` | 23 custom blocks + 3 standard blocks (JS, CSS, _block.json) |
