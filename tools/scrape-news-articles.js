/**
 * Scrapes all news article detail pages from ir.americanexpress.com
 * and generates .plain.html files for AEM Edge Delivery Services.
 *
 * Usage: node tools/scrape-news-articles.js
 *
 * Requires: playwright (npx playwright install chromium)
 * Input: docs/data-sheets/news.csv
 * Output: content/news/investor-relations-news/{slug}.plain.html
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { parse } from 'path';

const BASE_URL = 'https://ir.americanexpress.com';
const CSV_PATH = './docs/data-sheets/news.csv';
const OUTPUT_DIR = './content/news/investor-relations-news';
const DELAY_MS = 1500;

function slugFromUrl(url) {
  // /news/investor-relations-news/investor-relations-news-details/2026/Some-Title/default.aspx
  const parts = url.replace('/default.aspx', '').split('/');
  const year = parts[parts.length - 2] || '';
  const titleSlug = parts[parts.length - 1] || '';
  return `${year}/${titleSlug}`.toLowerCase();
}

function cleanHtml(html) {
  // Remove inline styles and script tags
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/ class="[^"]*"/gi, '')
    .replace(/ style="[^"]*"/gi, '')
    .replace(/ id="[^"]*"/gi, '')
    .replace(/<span>([\s\S]*?)<\/span>/gi, '$1')
    .replace(/<div>([\s\S]*?)<\/div>/gi, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function generatePlainHtml(article) {
  const { headline, date, bodyHtml, contacts } = article;

  let html = `<div>\n`;
  html += `  <h1>${headline}</h1>\n`;
  html += `  <p>${date}</p>\n`;
  html += `</div>\n`;
  html += `<div>\n`;
  html += `  ${cleanHtml(bodyHtml)}\n`;
  html += `</div>\n`;

  if (contacts) {
    html += `<div>\n`;
    html += `  <div class="columns">\n`;
    html += `    ${cleanHtml(contacts)}\n`;
    html += `  </div>\n`;
    html += `</div>\n`;
  }

  return html;
}

async function scrapeArticle(page, url) {
  const fullUrl = url.startsWith('http') ? url : BASE_URL + url;
  await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1000);

  const article = await page.evaluate(() => {
    const container = document.querySelector('.evergreen-news-details-item');
    if (!container) return null;

    const headline = container.querySelector('.evergreen-news-headline h3')?.textContent?.trim() || '';
    const date = container.querySelector('.evergreen-item-date-time')?.textContent?.trim() || '';
    const bodyEl = container.querySelector('.evergreen-news-body');
    const bodyHtml = bodyEl?.innerHTML || '';

    // Extract contacts section (usually last div in body)
    const contactDiv = bodyEl?.querySelector('[class*="contact"]');
    const contacts = contactDiv?.innerHTML || '';

    return { headline, date, bodyHtml, contacts };
  });

  return article;
}

async function main() {
  // Read news CSV
  const csv = readFileSync(CSV_PATH, 'utf-8');
  const lines = csv.trim().split('\n').slice(1); // skip header
  const articles = lines.map(line => {
    const match = line.match(/^"?([^",]+)"?,(.+?),(.+)$/);
    if (!match) return null;
    return { date: match[1], title: match[2], link: match[3] };
  }).filter(Boolean);

  console.log(`Found ${articles.length} news articles to scrape`);

  // Filter to only relative links (skip external URLs like americanexpress.com)
  const toScrape = articles.filter(a => a.link.startsWith('/'));
  console.log(`${toScrape.length} articles with internal detail pages`);

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let scraped = 0;
  let errors = 0;

  for (const article of toScrape) {
    const slug = slugFromUrl(article.link);
    const outputPath = `${OUTPUT_DIR}/${slug}.plain.html`;
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf('/'));

    // Skip if already scraped
    if (existsSync(outputPath)) {
      console.log(`  SKIP: ${slug} (already exists)`);
      continue;
    }

    mkdirSync(outputDir, { recursive: true });

    try {
      const data = await scrapeArticle(page, article.link);
      if (data && data.headline) {
        const html = generatePlainHtml(data);
        writeFileSync(outputPath, html);
        scraped++;
        console.log(`  OK [${scraped}/${toScrape.length}]: ${data.headline.substring(0, 60)}`);
      } else {
        console.log(`  WARN: No content found at ${article.link}`);
        errors++;
      }
    } catch (e) {
      console.log(`  ERROR: ${article.link} - ${e.message}`);
      errors++;
    }

    await page.waitForTimeout(DELAY_MS);
  }

  await browser.close();
  console.log(`\nDone! Scraped: ${scraped}, Errors: ${errors}, Skipped: ${toScrape.length - scraped - errors}`);
}

main().catch(console.error);
