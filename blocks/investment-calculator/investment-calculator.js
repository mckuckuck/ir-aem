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
  wrapper.className = 'ic-inner';

  wrapper.innerHTML = `
    <h3 class="ic-title">Investment Calculator — ${symbol}</h3>
    <p class="ic-description">Calculate the value of a hypothetical investment in American Express stock.</p>
    <form class="ic-form">
      <div class="ic-field">
        <label class="ic-label" for="ic-amount">Investment Amount ($)</label>
        <input type="number" class="ic-input" id="ic-amount" value="10000" min="1">
      </div>
      <div class="ic-field">
        <label class="ic-label" for="ic-date">Investment Date</label>
        <input type="date" class="ic-input" id="ic-date" value="2014-01-01">
      </div>
      <div class="ic-field">
        <label class="ic-label" for="ic-reinvest">Reinvest Dividends</label>
        <select class="ic-input" id="ic-reinvest">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button type="button" class="ic-calculate-btn">Calculate</button>
    </form>
    <div class="ic-results" style="display:none;">
      <div class="ic-result-row">
        <span class="ic-result-label">Current Value</span>
        <span class="ic-result-value" id="ic-current-value">--</span>
      </div>
      <div class="ic-result-row">
        <span class="ic-result-label">Total Return</span>
        <span class="ic-result-value" id="ic-total-return">--</span>
      </div>
      <div class="ic-result-row">
        <span class="ic-result-label">Annualized Return</span>
        <span class="ic-result-value" id="ic-annual-return">--</span>
      </div>
    </div>
    <div class="ic-compare">
      <h4 class="ic-compare-title">Compare with Indices</h4>
      <div class="ic-compare-items">
        <div class="ic-compare-item">
          <span class="ic-compare-label">S&P 500</span>
          <span class="ic-compare-value">--</span>
        </div>
        <div class="ic-compare-item">
          <span class="ic-compare-label">Nasdaq</span>
          <span class="ic-compare-value">--</span>
        </div>
        <div class="ic-compare-item">
          <span class="ic-compare-label">Dow Jones</span>
          <span class="ic-compare-value">--</span>
        </div>
      </div>
    </div>
    <p class="ic-disclaimer">This calculator is for illustrative purposes only and does not represent actual returns.</p>
  `;

  const calcBtn = wrapper.querySelector('.ic-calculate-btn');
  const results = wrapper.querySelector('.ic-results');
  calcBtn.addEventListener('click', () => {
    results.style.display = 'block';
  });

  block.append(wrapper);
}
