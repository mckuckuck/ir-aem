function buildStockTicker(rows) {
  const ticker = document.createElement('div');
  ticker.className = 'hero-stock-ticker';

  const stockRows = rows.filter((row) => {
    const text = row.textContent.trim();
    return text && /(\$|NYSE|market cap|volume)/i.test(text);
  });

  if (stockRows.length === 0) {
    ticker.innerHTML = `
      <div class="ticker-symbol">NYSE: AXP</div>
      <div class="ticker-price">--</div>
      <div class="ticker-change">--</div>
      <div class="ticker-details">
        <span class="ticker-market-cap"><strong>Market Cap:</strong> --</span>
        <span class="ticker-volume"><strong>Volume:</strong> --</span>
      </div>
      <div class="ticker-delay">Price delayed by 20 minutes</div>
    `;
    return ticker;
  }

  stockRows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const text = cell.textContent.trim();
      if (/NYSE/i.test(text)) {
        const el = document.createElement('div');
        el.className = 'ticker-symbol';
        el.textContent = text;
        ticker.append(el);
      } else if (/^\$[\d,.]+$/.test(text)) {
        const el = document.createElement('div');
        el.className = 'ticker-price';
        el.textContent = text;
        ticker.append(el);
      } else if (/market cap/i.test(text)) {
        const el = document.createElement('span');
        el.className = 'ticker-market-cap';
        el.innerHTML = `<strong>Market Cap:</strong> ${text.replace(/market cap:?\s*/i, '')}`;
        const details = ticker.querySelector('.ticker-details') || document.createElement('div');
        details.className = 'ticker-details';
        details.append(el);
        if (!ticker.querySelector('.ticker-details')) ticker.append(details);
      } else if (/volume/i.test(text)) {
        const el = document.createElement('span');
        el.className = 'ticker-volume';
        el.innerHTML = `<strong>Volume:</strong> ${text.replace(/volume:?\s*/i, '')}`;
        const details = ticker.querySelector('.ticker-details') || document.createElement('div');
        details.className = 'ticker-details';
        details.append(el);
        if (!ticker.querySelector('.ticker-details')) ticker.append(details);
      }
    });
  });

  if (!ticker.querySelector('.ticker-delay')) {
    const delay = document.createElement('div');
    delay.className = 'ticker-delay';
    delay.textContent = 'Price delayed by 20 minutes';
    ticker.append(delay);
  }

  return ticker;
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

  const breadcrumb = block.querySelector('ul');
  if (breadcrumb) {
    breadcrumb.className = 'hero-breadcrumb';
    content.append(breadcrumb);
  }

  const title = block.querySelector('h1, h2');
  if (title) {
    content.append(title);
  }

  rows.forEach((row) => row.remove());
  block.append(content);
}

function buildEventFromParagraphs(container) {
  const paragraphs = container.querySelectorAll('p');
  if (paragraphs.length === 0) return null;

  const card = document.createElement('div');
  card.className = 'hero-event-card';

  paragraphs.forEach((p, i) => {
    const links = p.querySelectorAll('a');
    if (links.length > 0 && !p.textContent.replace(links[0].textContent, '').trim().match(/\d{4}/)) {
      const linksWrapper = document.createElement('div');
      linksWrapper.className = 'event-links';
      links.forEach((link) => {
        const btn = link.cloneNode(true);
        btn.className = 'event-link';
        linksWrapper.append(btn);
      });
      card.append(linksWrapper);
    } else if (i === 0) {
      const dateEl = document.createElement('div');
      dateEl.className = 'event-date';
      dateEl.textContent = p.textContent.trim();
      card.append(dateEl);
    } else {
      const titleEl = document.createElement('div');
      titleEl.className = 'event-title';
      titleEl.textContent = p.textContent.trim();
      card.append(titleEl);
    }
    p.remove();
  });

  return card;
}

function decorateHomeHero(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-content';

  const pictures = block.querySelectorAll('picture');
  if (pictures.length > 0) {
    const bgWrapper = document.createElement('div');
    bgWrapper.className = 'hero-background';
    bgWrapper.append(pictures[0]);
    block.prepend(bgWrapper);
  }

  if (pictures.length > 1) {
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'hero-logo';
    logoWrapper.append(pictures[1]);
    content.append(logoWrapper);
  }

  const title = block.querySelector('h1, h2');
  if (title) {
    const titleParent = title.parentElement;
    content.append(title);

    const eventCard = buildEventFromParagraphs(titleParent);
    if (eventCard) content.append(eventCard);
  }

  const grid = document.createElement('div');
  grid.className = 'hero-grid';

  const ticker = buildStockTicker(rows);
  if (ticker) grid.append(ticker);

  if (grid.children.length > 0) content.append(grid);

  rows.forEach((row) => row.remove());
  block.append(content);
}

export default function decorate(block) {
  const isHome = block.classList.contains('home');

  if (isHome) {
    decorateHomeHero(block);
  } else {
    decorateBaseHero(block);
  }
}
