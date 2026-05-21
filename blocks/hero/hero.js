function buildEventCard(rows) {
  const card = document.createElement('div');
  card.className = 'hero-event-card';

  const eventRows = rows.filter((row) => {
    const text = row.textContent.trim();
    return text && !row.querySelector('picture') && !row.querySelector('h1, h2');
  });

  if (eventRows.length === 0) return null;

  const dateRow = eventRows[0];
  if (dateRow) {
    const cells = [...dateRow.children];
    const dateEl = document.createElement('div');
    dateEl.className = 'event-date';
    dateEl.textContent = cells[0]?.textContent?.trim() || '';
    card.append(dateEl);

    if (cells[1]) {
      const timeEl = document.createElement('div');
      timeEl.className = 'event-time';
      timeEl.textContent = cells[1].textContent.trim();
      card.append(timeEl);
    }
  }

  if (eventRows[1]) {
    const titleEl = document.createElement('div');
    titleEl.className = 'event-title';
    titleEl.textContent = eventRows[1].textContent.trim();
    card.append(titleEl);
  }

  if (eventRows[2]) {
    const links = eventRows[2].querySelectorAll('a');
    if (links.length > 0) {
      const linksWrapper = document.createElement('div');
      linksWrapper.className = 'event-links';
      links.forEach((link) => {
        const btn = link.cloneNode(true);
        btn.className = 'event-link';
        linksWrapper.append(btn);
      });
      card.append(linksWrapper);
    }
  }

  return card;
}

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

function decorateHomeHero(block) {
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

  const title = block.querySelector('h1, h2');
  if (title) {
    content.append(title);
  }

  const grid = document.createElement('div');
  grid.className = 'hero-grid';

  const eventCard = buildEventCard(rows);
  if (eventCard) grid.append(eventCard);

  const ticker = buildStockTicker(rows);
  if (ticker) grid.append(ticker);

  content.append(grid);

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
