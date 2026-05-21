export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const value = cells[1].textContent.trim();
      data[key] = value;
    }
  });

  block.textContent = '';

  const symbol = data.symbol || data['ticker-symbol'] || 'NYSE: AXP';
  const exchange = data.exchange || 'NYSE';
  const price = data.price || '--';
  const change = data.change || '--';
  const changePercent = data['change-percent'] || data['change-%'] || '--';
  const marketCap = data['market-cap'] || '--';
  const volume = data.volume || '--';

  const isPositive = parseFloat(change) >= 0;
  const changeClass = isPositive ? 'positive' : 'negative';
  const changeIcon = isPositive ? '▲' : '▼';

  block.innerHTML = `
    <div class="stock-ticker-header">
      <span class="stock-ticker-symbol">${symbol}</span>
      <span class="stock-ticker-exchange">${exchange}</span>
    </div>
    <div class="stock-ticker-price-row">
      <span class="stock-ticker-price">${price}</span>
      <span class="stock-ticker-change ${changeClass}">
        <span class="change-icon">${changeIcon}</span>
        <span class="change-value">${change}</span>
        <span class="change-percent">(${changePercent})</span>
      </span>
    </div>
    <div class="stock-ticker-details">
      <div class="stock-ticker-detail">
        <span class="detail-label">Market Cap</span>
        <span class="detail-value">${marketCap}</span>
      </div>
      <div class="stock-ticker-detail">
        <span class="detail-label">Volume</span>
        <span class="detail-value">${volume}</span>
      </div>
    </div>
    <div class="stock-ticker-delay">Price delayed by 20 minutes</div>
  `;
}
