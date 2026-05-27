# Migration Context: American Express Investor Relations → AEM Edge Delivery Services

## Project Overview

We are migrating the American Express Investor Relations site (https://ir.americanexpress.com) to AEM Edge Delivery Services (xwalk project type). 

**AEM Instance:** `https://author-p92869-e1797231.adobeaemcloud.com`
**Project repo:** `https://github.com/mckuckuck/ir-aem`
**Project type:** xwalk (markup-based EDS)
**fstab mount:** `https://author-p92869-e1797231.adobeaemcloud.com/bin/franklin.delivery/mckuckuck/ir-aem/main`
**Library URL:** `https://main--ir-aem--mckuckuck.aem.page/tools/sidekick/library.json`
**Content path:** `/content/aem-ir`
**Organization:** `mckuckuck`
**Site:** `ir-aem`

## Current Status

### ✅ Phase 1: Block Development — COMPLETE

All 24 custom blocks built with JS, CSS, and Universal Editor model files (`_<block>.json`).

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
| 24 | Accordion | — | ✅ Built (from AEM Block Collection) |

**Standard EDS blocks configured:** Cards, Columns, Fragment (with model files)

**Generated files:** `component-models.json`, `component-definition.json`, `component-filters.json` (37 total components registered)

### ✅ Phase 2: Content Migration — COMPLETE

All 21 pages created as local HTML content with corresponding `.plain.html` files for md2jcr processing. Content is backed up in `tools/content-backup/` and can be restored with `bash tools/restore-content.sh`.

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

### ✅ Phase 2 Data Sheets — COMPLETE

All 13 spreadsheet data sources populated with real data from asset inventory:

| Sheet | Records | Feeds |
|-------|---------|-------|
| `sec-filings.json` | 15 filings | Earnings page + IR Home |
| `events.json` | 10 events | Events page + IR Home |
| `news.json` | 12 items | News page + IR Home |
| `insider-filings.json` | 12 transactions | Insider Filings page |
| `term-sheets.json` | 8 entries | Fixed Income page |
| `pillar3-disclosures.json` | 4 disclosures | Pillar 3 page |
| `lcr-disclosures.json` | 6 disclosures | LCR page |
| `fi-presentations.json` | 5 presentations | Fixed Income page |
| `reporting-resources.json` | 4 documents | Reporting & Resources page |
| `abs-servicer-reports-master.json` | 4 reports | Fixed Income page |
| `abs-performance-master.json` | 4 reports | Fixed Income page |
| `abs-servicer-reports-issuance.json` | 4 reports | Fixed Income page |
| `abs-performance-issuance.json` | 4 reports | Fixed Income page |

### ✅ Phase 3: Design & Styling — COMPLETE

Site-wide design system migrated from source site with per-block styling applied.

**Design tokens established:**
- Primary blue: `#006fcf` (`--color-primary`)
- Navy (headings): `#00175a` (`--color-navy`)
- Text: `#333` (`--text-color`)
- Border: `#ecedee` (`--color-border`)
- Light background: `#f7f8f9` (`--light-color`)

**Typography:**
- Body: Roboto (local fonts in `fonts/`)
- Headings: Roboto Condensed (local fonts in `fonts/`)

**Breakpoints (matching source site):**
- Mobile: `< 480px`
- Tablet → Desktop: `>= 768px`
- Mobile-only overrides: `<= 768px`

**All 23 blocks styled** with design tokens — no hardcoded brand colors remain. CSS passes linting cleanly.

### ✅ Image Assets — COMPLETE

54 image assets downloaded from source site and organized for AEM DAM upload.

**DAM structure:** `/content/dam/ir-aem/media/`

| Path | Contents | Count |
|------|----------|-------|
| `/content/dam/ir-aem/media/site/` | Hero bg, funding overview, SEC thumbnail, favicon | 4 |
| `/content/dam/ir-aem/media/covers/` | Annual report covers (2008–2025) | 18 |
| `/content/dam/ir-aem/media/portraits/` | Executive & Board portraits | 31 |

**Upload package:** `assets-images-dam.tar.gz` (3.1MB) — extracts directly to DAM paths.

### ✅ JCR Content Package — COMPLETE

JCR XML content package generated for all 21 pages at `content-packages/ir-content.zip` (83KB, 174 XML nodes).

**Generator script:** `node tools/generate-jcr-package.js`

**Upload to AEM:**
```
npx @adobe/aem-import-helper aem upload \
  --zip content-packages/ir-content.zip \
  --target https://author-p92869-e1797231.adobeaemcloud.com \
  --token <YOUR_AEM_TOKEN>
```

Or upload via Package Manager at the AEM instance.

### ✅ AEM Config Service — RESOLVED

The site `mckuckuck/ir-aem` Config Service registration has been updated. md2jcr now recognizes the project correctly.

### 🔲 Phase 4: QA & Finalization — NOT STARTED

- Full-page visual verification against source site
- Navigation (header/footer) setup
- Responsive testing across breakpoints
- Performance audit (PageSpeed Insights)
- Content accuracy review

## Site Scope

- **21 static pages** + a News Detail page template
- **678 document assets** (PDFs, XLS, XBRL ZIPs, HTML files) — uploaded to AEM DAM at `/content/dam/ir-aem/`
- **54 image assets** — downloaded and packaged for upload to `/content/dam/ir-aem/media/`
- Document assets stored locally in `assets-zipped/` as 9 tar.gz archives (<100MB each)
- Image assets stored locally in `assets-images/` (organized by page) and `assets-images-dam.tar.gz` (organized by DAM path)
- Full asset inventory CSV at `docs/block-analysis/asset-inventory.csv`

## Block Architecture (37 components registered)

### 24 Custom blocks (built and styled)

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
- **Accordion** — expandable question/answer sections (from AEM Block Collection, uses native `<details>`/`<summary>`)

### 3 Standard EDS blocks (configured with models)

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

## Asset Architecture

### Document assets (678 files) — at `/content/dam/ir-aem/`

PDFs, XLS, XBRL ZIPs organized by category:
- `earnings/` — quarterly earnings press releases, presentations, tables
- `sec-filings/` — SEC filings from EDGAR
- `annual-reports/` — annual reports and proxy statements
- `disclosures/` — Pillar 3 and LCR disclosures
- `fixed-income/` — FI presentations, ABS reports
- `downloads/` — term sheets, prospectus supplements
- `sustainability/` — ESG and sustainability reports

### Image assets (54 files) — at `/content/dam/ir-aem/media/`

```
/content/dam/ir-aem/media/
├── site/             hero-bg.jpg, funding-overview.jpg, sec-filings-thumbnail.png, favicon.ico
├── covers/           2008-cover.png through 2025-cover.png (annual report thumbnails)
└── portraits/        31 executive & board member headshots
```

## Key Design Decisions Made

1. **One Hero block with variants** — `hero (home)` for IR Home (event card + stock ticker), base `hero` for 21 interior pages (breadcrumb + title + blue background)
2. **One Filterable Data Table block with 3 variants** — consolidates SEC Filings Table, Insider Filings Table, and Term Sheets Table
3. **Analyst Contacts = standard Columns** — not a custom block, just 3-column rich text
4. **Document List is a reusable custom block** — used on Governance Framework (13 charters/policies), Policy Engagement (10 contribution reports), and Fixed Income (sustainability + ABS program docs)
5. **Governance/Policy pages split into Default Content + Document List** — rich text intro followed by structured download list
6. **Fixed Income page uses Tabs block** with 7 tabs, each containing nested blocks (Year Selectors, Document Lists, Tables, rich text)
7. **All assets hosted in AEM** (not external CDNs) — Documents at `/content/dam/ir-aem/`, images at `/content/dam/ir-aem/media/`
8. **News Detail pages** are a single template — all Default Content + Columns for contacts, with "About AmEx" boilerplate as a potential shared fragment
9. **Component naming** — md2jcr title-cases CSS class names, so `sec-filings-preview` becomes "Sec Filings Preview" (not "SEC Filings Preview") in component-definition.json
10. **Content path** — Updated `paths.json` to map `/content/aem-ir/` → `/` for delivery pipeline
11. **DAM image separation** — Documents at `/content/dam/ir-aem/` root; images separated under `/content/dam/ir-aem/media/` with subfolders `site/`, `covers/`, `portraits/`
12. **Breakpoints match source** — 480px/768px from original site instead of default EDS 600px/900px
13. **Field hinting for xwalk** — Blocks use `<!-- field:name -->` HTML comments for md2jcr mapping; collapsible fields (imageAlt, linkText, etc.) don't get separate cells
14. **Design tokens** — All block CSS uses CSS custom properties; no hardcoded brand colors
15. **md2jcr content rules** — Simple blocks (one model, no container) must have 1 cell per row, 1 row per field. No key-value pairs. Field collapsing means `imageAlt`, `linkText`, etc. don't get their own row/cell. Raw HTML `<table>` elements in their own section div get interpreted as blocks — keep tables inside the same section as surrounding text to avoid this.
16. **Accordion from Block Collection** — FAQ uses the standard accordion block from `github.com/adobe/aem-block-collection` rather than a custom implementation. Uses native HTML5 `<details>`/`<summary>` for accessibility.
17. **Committee Composition as default content** — The board member/committee matrix is authored as default content (paragraphs) rather than a raw HTML table, since md2jcr interprets table headers as block names.
18. **News List uses data source** — The news-list block on IR Home only stores heading + count in content; actual news items are fetched from `news.json` at runtime by the block JS.

## Key Files in Repo

| File | Description |
|------|-------------|
| `docs/block-analysis/block-analysis.md` | Full visual block analysis with annotated screenshots of all 22 pages |
| `docs/block-analysis/asset-inventory.csv` | 678-row CSV mapping source URL → local path → AEM DAM path → page used on |
| `docs/block-analysis/screenshots/` | 21 annotated page screenshots with block overlays |
| `tools/restore-content.sh` | Restore content pages from backup |
| `tools/generate-jcr-package.js` | Generate JCR content package ZIP from .plain.html files |
| `tools/download-missing-assets.sh` | Download 54 image assets from source site |
| `tools/upload-assets-to-aem.sh` | Script for uploading documents to AEM DAM |
| `tools/download-assets.sh` | Script for downloading documents from source site |
| `tools/content-backup/` | Backup of all 21 page HTML files |
| `assets-images/` | Downloaded images organized by page (reference copy) |
| `assets-images-dam.tar.gz` | Images packaged matching AEM DAM paths (upload-ready) |
| `content-packages/ir-content.zip` | JCR content package (21 pages, 174 XML nodes) |
| `migration-work/brand.json` | Extracted brand tokens from source site |
| `fstab.yaml` | EDS mount config (markup type, AEM author) |
| `paths.json` | Content path mapping (`/content/aem-ir/` → `/`) |
| `tools/sidekick/config.json` | Sidekick config with contentSourceUrl and contentPath |
| `component-models.json` | Generated Universal Editor models (35 components) |
| `component-definition.json` | Generated component registry |
| `component-filters.json` | Generated filter definitions |
| `styles/styles.css` | Global design system (colors, typography, spacing, sections) |
| `styles/fonts.css` | Roboto + Roboto Condensed @font-face declarations |
| `content/` | 21 pages as HTML + .plain.html |
| `content/*.json` | 13 data sheet files |
| `blocks/` | 23 custom blocks + 3 standard blocks (JS, CSS, _block.json) |
