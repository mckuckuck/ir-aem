# Data Sheets for AEM Edge Delivery Services

## Overview

These 13 CSV files define the data that powers the dynamic blocks on the site. Each CSV needs to become a spreadsheet page in AEM that gets served as a `.json` endpoint.

## How to Add Sheets to AEM

For xwalk projects, spreadsheets are authored as pages in AEM with a table structure:

1. **Create a spreadsheet page** in AEM Universal Editor at the content path (e.g., `/content/aem-ir/sec-filings`)
2. **Add a table** with the column headers matching the CSV headers below
3. **Populate rows** from the CSV data
4. **Preview the page** — it will be served as JSON at the corresponding path (e.g., `/sec-filings.json`)

Alternatively, upload `.xlsx` files to the AEM DAM and reference them directly.

## Sheet Summary

| Sheet | Path | Columns | Feeds |
|-------|------|---------|-------|
| sec-filings | `/content/aem-ir/sec-filings` | date, type, description, company, document | Earnings page + IR Home |
| events | `/content/aem-ir/events-data` | date, time, title, type, webcast, link | Events page + IR Home |
| news | `/content/aem-ir/news-data` | date, title, link | News page + IR Home |
| insider-filings | `/content/aem-ir/insider-filings` | date, name, title, type, document | Insider Filings page |
| term-sheets | `/content/aem-ir/term-sheets` | date, issuer, cusip, rateType, maturityYear, description, termSheet, prospectus | Fixed Income Tab 3 |
| pillar3-disclosures | `/content/aem-ir/pillar3-disclosures` | year, quarter, title, document | Pillar 3 page |
| lcr-disclosures | `/content/aem-ir/lcr-disclosures` | year, quarter, title, document | LCR page |
| fi-presentations | `/content/aem-ir/fi-presentations` | year, month, title, document | Fixed Income Tab 2 |
| reporting-resources | `/content/aem-ir/reporting-resources` | year, title, document | Reporting & Resources page |
| abs-servicer-reports-master | `/content/aem-ir/abs-servicer-reports-master` | year, month, title, document | Fixed Income Tab 4 (Master Trust) |
| abs-performance-master | `/content/aem-ir/abs-performance-master` | year, month, title, document | Fixed Income Tab 4 (Master Trust) |
| abs-servicer-reports-issuance | `/content/aem-ir/abs-servicer-reports-issuance` | year, month, title, document | Fixed Income Tab 4 (Issuance Trust II) |
| abs-performance-issuance | `/content/aem-ir/abs-performance-issuance` | year, month, title, document | Fixed Income Tab 4 (Issuance Trust II) |

## Column Definitions

### sec-filings.csv
- **date** — Filing date (YYYY-MM-DD)
- **type** — Filing type: 8-K, 10-K, 10-Q, etc.
- **description** — Human-readable filing description
- **company** — Filing company name
- **document** — AEM DAM path to the filing PDF

### events.csv
- **date** — Event date (YYYY-MM-DD)
- **time** — Event time with timezone (e.g., "8:30 AM ET")
- **title** — Event name
- **type** — Category: Earnings, Conference, Investor Day, Other
- **webcast** — URL to webcast replay (blank if none)
- **link** — Path to event details page

### news.csv
- **date** — Publication date (YYYY-MM-DD)
- **title** — Press release headline
- **link** — Path to news detail page

### insider-filings.csv
- **date** — Transaction date (YYYY-MM-DD)
- **name** — Insider name
- **title** — Insider's corporate title
- **type** — Transaction type: Purchase, Sale, Grant, Exercise
- **document** — AEM DAM path to filing PDF

### term-sheets.csv
- **date** — Issuance date (YYYY-MM-DD)
- **issuer** — Issuing entity name
- **cusip** — CUSIP identifier
- **rateType** — Fixed or Floating
- **maturityYear** — Maturity year
- **description** — Series/class description
- **termSheet** — AEM DAM path to term sheet PDF
- **prospectus** — AEM DAM path to prospectus supplement PDF

### pillar3-disclosures.csv / lcr-disclosures.csv
- **year** — Disclosure year
- **quarter** — Quarter: Q1, Q2, Q3, Q4
- **title** — Document title
- **document** — AEM DAM path to PDF

### fi-presentations.csv
- **year** — Presentation year
- **month** — Month name
- **title** — Presentation title
- **document** — AEM DAM path to PDF

### reporting-resources.csv
- **year** — Report year
- **title** — Report title
- **document** — AEM DAM path to PDF

### abs-servicer-reports-*.csv / abs-performance-*.csv
- **year** — Report year
- **month** — Month name
- **title** — Report title
- **document** — AEM DAM path to PDF
