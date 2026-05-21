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
  wrapper.className = 'stock-quote-inner';

  wrapper.innerHTML = `
    <div class="sq-header">
      <h3 class="sq-symbol">${exchange}: ${symbol}</h3>
      <span class="sq-update">Last Updated: --</span>
    </div>
    <div class="sq-price-section">
      <span class="sq-price">--</span>
      <span class="sq-change">-- (--)</span>
    </div>
    <div class="sq-details">
      <div class="sq-detail-row">
        <span class="sq-label">Open</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">High</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">Low</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">Close</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">Volume</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">Market Cap</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">52-Week High</span>
        <span class="sq-value">--</span>
      </div>
      <div class="sq-detail-row">
        <span class="sq-label">52-Week Low</span>
        <span class="sq-value">--</span>
      </div>
    </div>
    <p class="sq-disclaimer">Price delayed by 20 minutes.</p>
  `;

  block.append(wrapper);
}
