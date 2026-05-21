function formatLabel(key) {
  return key
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const [keyCell, valueCell] = cells;
      const key = keyCell.textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = valueCell;
    }
  });

  block.textContent = '';

  const quarter = data.quarter?.textContent?.trim() || data['quarter-label']?.textContent?.trim() || '';

  const linkKeys = ['press-release', 'webcast', 'presentation', 'financial-tables', 'sec-filing', '10-q'];
  const links = [];

  linkKeys.forEach((key) => {
    if (data[key]) {
      const anchor = data[key].querySelector('a');
      if (anchor) {
        links.push({
          label: formatLabel(key),
          href: anchor.href,
          title: anchor.title || anchor.textContent.trim(),
        });
      }
    }
  });

  if (data.links) {
    const anchors = data.links.querySelectorAll('a');
    anchors.forEach((a) => {
      links.push({
        label: a.textContent.trim(),
        href: a.href,
        title: a.title || a.textContent.trim(),
      });
    });
  }

  const card = document.createElement('div');
  card.className = 'earnings-card';

  const header = document.createElement('div');
  header.className = 'earnings-header';
  header.innerHTML = '<h3 class="earnings-title">Quarterly Results</h3>';
  if (quarter) {
    header.innerHTML += `<span class="earnings-quarter">${quarter}</span>`;
  }
  card.append(header);

  if (links.length > 0) {
    const linksEl = document.createElement('ul');
    linksEl.className = 'earnings-links';
    links.forEach(({ label, href, title }) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${href}" title="${title}" class="earnings-link">
        <span class="earnings-link-icon"></span>
        <span class="earnings-link-label">${label}</span>
      </a>`;
      linksEl.append(li);
    });
    card.append(linksEl);
  }

  block.append(card);
}
