function buildStockTicker() {
  const ticker = document.createElement('div');
  ticker.className = 'hero-stock-ticker';
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

  const pictures = block.querySelectorAll('picture');

  // Row 1: background image
  if (pictures.length > 0) {
    const bgWrapper = document.createElement('div');
    bgWrapper.className = 'hero-background';
    bgWrapper.append(pictures[0]);
    block.prepend(bgWrapper);
  }

  // Row 2: logo — inside the title box
  // Row 3: title (h1) — inside the title box
  const titleBox = document.createElement('div');
  titleBox.className = 'hero-title-box';

  if (pictures.length > 1) {
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'hero-logo';
    logoWrapper.append(pictures[1]);
    titleBox.append(logoWrapper);
  }

  const title = block.querySelector('h1, h2');
  if (title) {
    titleBox.append(title);
  }

  content.append(titleBox);

  // Row 4: event info — below the title box
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

    content.append(eventCard);
  }

  // Stock ticker grid
  const grid = document.createElement('div');
  grid.className = 'hero-grid';
  const ticker = buildStockTicker();
  grid.append(ticker);
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
