export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const [keyCell, valueCell] = cells;
      const key = keyCell.textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = valueCell;
    } else if (cells.length === 1) {
      const [cell] = cells;
      const pic = cell.querySelector('picture');
      if (pic) {
        data.image = cell;
      } else {
        const heading = cell.querySelector('h2, h3, h4');
        if (heading) data.heading = cell;
      }
    }
  });

  block.textContent = '';

  const card = document.createElement('div');
  card.className = 'annual-report-inner';

  const imgCell = data.image || data.thumbnail;
  if (imgCell) {
    const thumb = document.createElement('div');
    thumb.className = 'annual-report-thumbnail';
    const pic = imgCell.querySelector('picture');
    if (pic) {
      thumb.append(pic);
    }
    card.append(thumb);
  }

  const content = document.createElement('div');
  content.className = 'annual-report-content';

  const title = data.title?.textContent?.trim()
    || data['report-title']?.textContent?.trim()
    || 'Annual Report';
  const titleEl = document.createElement('h3');
  titleEl.className = 'annual-report-title';
  titleEl.textContent = title;
  content.append(titleEl);

  const year = data.year?.textContent?.trim() || data['report-year']?.textContent?.trim() || '';
  if (year) {
    const yearEl = document.createElement('span');
    yearEl.className = 'annual-report-year';
    yearEl.textContent = year;
    content.append(yearEl);
  }

  const actions = document.createElement('div');
  actions.className = 'annual-report-actions';

  const linkKeys = ['pdf', 'pdf-link', 'html', 'html-link'];
  linkKeys.forEach((key) => {
    if (data[key]) {
      const anchor = data[key].querySelector('a');
      if (anchor) {
        const a = anchor.cloneNode(true);
        a.className = 'annual-report-action';
        actions.append(a);
      }
    }
  });

  if (data.links) {
    const anchors = data.links.querySelectorAll('a');
    anchors.forEach((a) => {
      const link = a.cloneNode(true);
      link.className = 'annual-report-action';
      actions.append(link);
    });
  }

  if (actions.children.length > 0) {
    content.append(actions);
  }

  card.append(content);
  block.append(card);
}
