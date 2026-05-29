function buildStockTicker() {
  const ticker = document.createElement('div');
  ticker.className = 'hero-stock-ticker';
  ticker.innerHTML = `
    <div class="ticker-header">
      <span class="ticker-symbol">NYSE: AXP</span>
    </div>
    <div class="ticker-price">--</div>
    <div class="ticker-change"><span class="ticker-change-value">--</span> | <span class="ticker-change-pct">--</span></div>
    <div class="ticker-details">
      <div class="ticker-detail-row"><span class="ticker-label">Market Cap</span><span class="ticker-value">--</span></div>
      <div class="ticker-detail-row"><span class="ticker-label">Volume</span><span class="ticker-value">--</span></div>
    </div>
    <div class="ticker-footer">
      <div class="ticker-delay">20 minutes minimum delay</div>
    </div>
  `;
  return ticker;
}

function buildBreadcrumb() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (!path) return null;

  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const nav = document.createElement('nav');
  nav.className = 'hero-breadcrumb';
  nav.setAttribute('aria-label', 'Breadcrumb');

  const ol = document.createElement('ol');

  const home = document.createElement('li');
  const homeLink = document.createElement('a');
  homeLink.href = '/';
  homeLink.textContent = 'Investor Relations';
  home.append(homeLink);
  ol.append(home);

  let href = '';
  segments.forEach((seg, i) => {
    href += `/${seg}`;
    const li = document.createElement('li');
    const label = seg
      .replace(/[-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    if (i < segments.length - 1) {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      li.append(a);
    } else {
      li.textContent = label;
      li.setAttribute('aria-current', 'page');
    }
    ol.append(li);
  });

  nav.append(ol);
  return nav;
}

function decorateBaseHero(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-content';

  const pic = block.querySelector('picture');
  if (pic) {
    const bgWrapper = document.createElement('div');
    bgWrapper.className = 'hero-background';
    bgWrapper.append(pic);
    block.prepend(bgWrapper);
  }

  const breadcrumb = buildBreadcrumb();
  if (breadcrumb) {
    content.append(breadcrumb);
  }

  let title = block.querySelector('h1, h2');
  if (!title) {
    const textRow = rows.find((row) => {
      const text = row.textContent.trim();
      return text && !row.querySelector('picture') && !row.querySelector('ul');
    });
    if (textRow) {
      title = document.createElement('h1');
      title.textContent = textRow.textContent.trim();
    }
  }
  if (title) {
    content.append(title);
  }

  rows.forEach((row) => row.remove());
  block.append(content);
}

function decorateHomeHero(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-content';

  const pictures = block.querySelectorAll('picture');

  // Row 1: background image
  if (pictures.length > 0) {
    const bgWrapper = document.createElement('div');
    bgWrapper.className = 'hero-background';
    bgWrapper.append(pictures[0]);
    block.prepend(bgWrapper);
  }

  // Left column: logo box + event info
  const leftCol = document.createElement('div');
  leftCol.className = 'hero-left';

  // Logo + title in white box
  const titleBox = document.createElement('div');
  titleBox.className = 'hero-title-box';

  if (pictures.length > 1) {
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'hero-logo';
    logoWrapper.append(pictures[1]);
    titleBox.append(logoWrapper);
  }

  const divider = document.createElement('div');
  divider.className = 'hero-title-divider';
  titleBox.append(divider);

  const title = block.querySelector('h1, h2');
  if (title) {
    titleBox.append(title);
  }

  leftCol.append(titleBox);

  // Event info — below the title box
  const eventRow = rows.find((row) => {
    const hasHeading = row.querySelector('h1, h2');
    const hasPicture = row.querySelector('picture');
    return !hasHeading && !hasPicture && row.querySelector('p');
  });

  if (eventRow) {
    const eventCard = document.createElement('div');
    eventCard.className = 'hero-event-card';
    const paragraphs = eventRow.querySelectorAll('p');

    paragraphs.forEach((p, i) => {
      const links = p.querySelectorAll('a');
      const hasDatePattern = /\d{1,2},\s*\d{4}/.test(p.textContent);

      if (links.length > 0 && !hasDatePattern) {
        const linksWrapper = document.createElement('div');
        linksWrapper.className = 'event-links';
        links.forEach((link) => {
          const btn = link.cloneNode(true);
          btn.className = 'event-link';
          linksWrapper.append(btn);
        });
        eventCard.append(linksWrapper);
      } else if (i === 0 || hasDatePattern) {
        const dateEl = document.createElement('div');
        dateEl.className = 'event-date';
        dateEl.textContent = p.textContent.trim();
        eventCard.append(dateEl);
      } else {
        const titleEl = document.createElement('div');
        titleEl.className = 'event-title';
        titleEl.textContent = p.textContent.trim();
        eventCard.append(titleEl);
      }
    });

    leftCol.append(eventCard);
  }

  content.append(leftCol);

  // Right column: stock ticker
  const rightCol = document.createElement('div');
  rightCol.className = 'hero-right';
  const ticker = buildStockTicker();
  rightCol.append(ticker);
  content.append(rightCol);

  rows.forEach((row) => row.remove());
  block.append(content);
}

export default function decorate(block) {
  const isHome = block.classList.contains('home');
  // Also detect home variant by content: if logo image is present (2+ pictures)
  const hasLogo = block.querySelectorAll('picture').length > 1;

  if (isHome || hasLogo) {
    if (!block.classList.contains('home')) block.classList.add('home');
    decorateHomeHero(block);
  } else {
    decorateBaseHero(block);
  }
}
