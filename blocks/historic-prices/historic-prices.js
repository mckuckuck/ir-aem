export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      data[key] = cells[1].textContent.trim();
    }
  });

  block.textContent = '';

  const symbol = data.symbol || 'AXP';

  const wrapper = document.createElement('div');
  wrapper.className = 'hp-inner';

  const header = document.createElement('div');
  header.className = 'hp-header';
  header.innerHTML = `<h3 class="hp-title">Historic Stock Prices — ${symbol}</h3>`;
  wrapper.append(header);

  const controls = document.createElement('div');
  controls.className = 'hp-controls';
  controls.innerHTML = `
    <div class="hp-date-range">
      <label class="hp-date-label">From:
        <input type="date" class="hp-date-input" id="hp-from">
      </label>
      <label class="hp-date-label">To:
        <input type="date" class="hp-date-input" id="hp-to">
      </label>
      <button class="hp-search-btn">Search</button>
    </div>
  `;
  wrapper.append(controls);

  const tableContainer = document.createElement('div');
  tableContainer.className = 'hp-table-container';

  const table = document.createElement('table');
  table.className = 'hp-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Date</th>
        <th>Open</th>
        <th>High</th>
        <th>Low</th>
        <th>Close</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="6" class="hp-empty">Select a date range and click Search to view historical prices.</td>
      </tr>
    </tbody>
  `;
  tableContainer.append(table);
  wrapper.append(tableContainer);

  block.append(wrapper);
}
