export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'document-list-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 1) {
      const item = document.createElement('div');
      item.className = 'document-list-item';

      const titleCell = cells[0];
      const link = titleCell.querySelector('a');
      const title = link?.textContent?.trim() || titleCell.textContent.trim();
      const href = link?.href || '#';

      const titleEl = document.createElement('a');
      titleEl.className = 'document-list-link';
      titleEl.href = href;
      titleEl.textContent = title;

      const icon = document.createElement('span');
      icon.className = 'document-list-icon';
      icon.setAttribute('aria-hidden', 'true');

      item.append(icon);
      item.append(titleEl);

      if (cells[1]) {
        const meta = document.createElement('span');
        meta.className = 'document-list-meta';
        meta.textContent = cells[1].textContent.trim();
        item.append(meta);
      }

      wrapper.append(item);
    }
  });

  block.append(wrapper);
}
