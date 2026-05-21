export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'sec-filings-inner';

  // Header
  const header = document.createElement('div');
  header.className = 'sec-filings-header';
  header.innerHTML = `
    <h3 class="sec-filings-title">SEC Filings</h3>
    <a href="/financials/earnings-and-sec-filings" class="sec-filings-view-all">View All →</a>
  `;
  wrapper.append(header);

  // Filing items
  const list = document.createElement('div');
  list.className = 'sec-filings-items';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const filingType = cells[0].textContent.trim();
      const descCell = cells[1];
      const links = descCell.querySelectorAll('a');
      const description = descCell.textContent.trim().split('\n')[0] || filingType;

      const item = document.createElement('div');
      item.className = 'sec-filing-item';

      // Filing type badge
      const badge = document.createElement('span');
      badge.className = `sec-filing-badge sec-filing-badge-${filingType.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      badge.textContent = filingType;
      item.append(badge);

      // Description
      const desc = document.createElement('span');
      desc.className = 'sec-filing-desc';
      desc.textContent = description !== filingType ? description : '';
      item.append(desc);

      // Download links
      if (links.length > 0) {
        const downloads = document.createElement('div');
        downloads.className = 'sec-filing-downloads';
        links.forEach((link) => {
          const a = link.cloneNode(true);
          a.className = 'sec-filing-download';
          downloads.append(a);
        });
        item.append(downloads);
      }

      list.append(item);
    }
  });

  wrapper.append(list);
  block.append(wrapper);
}
