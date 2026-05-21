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

  const date = data.date?.textContent?.trim() || '';
  const time = data.time?.textContent?.trim() || '';
  const title = data.title?.textContent?.trim() || data['event-title']?.textContent?.trim() || '';
  const linksCell = data.links || data.webcast || data['event-links'];

  const card = document.createElement('div');
  card.className = 'event-card-inner';

  const dateBadge = document.createElement('div');
  dateBadge.className = 'event-card-date';
  dateBadge.textContent = date;
  card.append(dateBadge);

  if (time) {
    const timeEl = document.createElement('div');
    timeEl.className = 'event-card-time';
    timeEl.textContent = time;
    card.append(timeEl);
  }

  const titleEl = document.createElement('h3');
  titleEl.className = 'event-card-title';
  titleEl.textContent = title;
  card.append(titleEl);

  if (linksCell) {
    const links = linksCell.querySelectorAll('a');
    if (links.length > 0) {
      const actions = document.createElement('div');
      actions.className = 'event-card-actions';
      links.forEach((link) => {
        const a = link.cloneNode(true);
        a.className = 'event-card-action';
        actions.append(a);
      });
      card.append(actions);
    }
  }

  block.append(card);
}
