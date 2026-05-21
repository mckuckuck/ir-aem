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
  const exchange = data.exchange || 'NYSE';

  const wrapper = document.createElement('div');
  wrapper.className = 'stock-chart-inner';

  const header = document.createElement('div');
  header.className = 'sc-header';
  header.innerHTML = `<h3 class="sc-title">${exchange}: ${symbol} Stock Chart</h3>`;
  wrapper.append(header);

  const controls = document.createElement('div');
  controls.className = 'sc-controls';
  const ranges = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'Max'];
  ranges.forEach((range, i) => {
    const btn = document.createElement('button');
    btn.className = `sc-range-btn${i === 5 ? ' sc-range-active' : ''}`;
    btn.textContent = range;
    btn.addEventListener('click', () => {
      controls.querySelectorAll('.sc-range-btn').forEach((b) => b.classList.remove('sc-range-active'));
      btn.classList.add('sc-range-active');
    });
    controls.append(btn);
  });
  wrapper.append(controls);

  const chartArea = document.createElement('div');
  chartArea.className = 'sc-chart-area';
  chartArea.innerHTML = `
    <div class="sc-chart-placeholder">
      <p>Stock chart data requires a live market data integration.</p>
      <p class="sc-chart-note">Connect a financial data API to display interactive charts.</p>
    </div>
  `;
  wrapper.append(chartArea);

  const compare = document.createElement('div');
  compare.className = 'sc-compare';
  compare.innerHTML = `
    <span class="sc-compare-label">Compare:</span>
    <label class="sc-compare-option"><input type="checkbox" value="SPX"> S&P 500</label>
    <label class="sc-compare-option"><input type="checkbox" value="IXIC"> Nasdaq</label>
    <label class="sc-compare-option"><input type="checkbox" value="DJI"> Dow Jones</label>
  `;
  wrapper.append(compare);

  block.append(wrapper);
}
