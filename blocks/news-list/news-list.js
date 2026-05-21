export default function decorate(block) {
  const rows = [...block.children];

  // Check if first row is a heading/config row
  const firstRow = rows[0];
  let heading = '';
  let dataRows = rows;

  if (firstRow && firstRow.children.length === 1) {
    heading = firstRow.textContent.trim();
    dataRows = rows.slice(1);
  }

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'news-list-inner';

  // Header
  if (heading) {
    const header = document.createElement('div');
    header.className = 'news-list-header';
    header.innerHTML = `<h3 class="news-list-title">${heading}</h3>`;
    wrapper.append(header);
  }

  // News items
  const list = document.createElement('ul');
  list.className = 'news-items';

  dataRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const date = cells[0].textContent.trim();
      const titleCell = cells[1];
      const link = titleCell.querySelector('a');
      const title = link?.textContent?.trim() || titleCell.textContent.trim();
      const href = link?.href || '#';

      const li = document.createElement('li');
      li.className = 'news-item';
      li.innerHTML = `
        <span class="news-item-date">${date}</span>
        <a href="${href}" class="news-item-title">${title}</a>
      `;
      list.append(li);
    }
  });

  wrapper.append(list);

  // View all link
  const viewAll = document.createElement('div');
  viewAll.className = 'news-list-footer';
  viewAll.innerHTML = '<a href="/news/investor-relations-news" class="news-view-all">View All News →</a>';
  wrapper.append(viewAll);

  block.append(wrapper);
}
