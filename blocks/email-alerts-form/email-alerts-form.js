export default function decorate(block) {
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'eaf-inner';

  wrapper.innerHTML = `
    <div class="eaf-section eaf-subscribe">
      <h3 class="eaf-heading">Subscribe to Email Alerts</h3>
      <p class="eaf-description">Enter your email and select the types of alerts you'd like to receive.</p>
      <form class="eaf-form" id="eaf-subscribe-form">
        <div class="eaf-field">
          <label class="eaf-label" for="eaf-sub-email">Email Address</label>
          <input type="email" class="eaf-input" id="eaf-sub-email" placeholder="your@email.com" required>
        </div>
        <div class="eaf-checkboxes">
          <span class="eaf-label">Alert Types</span>
          <label class="eaf-checkbox"><input type="checkbox" name="alerts" value="press-releases"> Press Releases</label>
          <label class="eaf-checkbox"><input type="checkbox" name="alerts" value="sec-filings"> SEC Filings</label>
          <label class="eaf-checkbox"><input type="checkbox" name="alerts" value="events"> Events & Presentations</label>
          <label class="eaf-checkbox"><input type="checkbox" name="alerts" value="quarterly"> Quarterly Results</label>
          <label class="eaf-checkbox"><input type="checkbox" name="alerts" value="annual-report"> Annual Report</label>
        </div>
        <button type="submit" class="eaf-btn">Subscribe</button>
      </form>
    </div>
    <div class="eaf-divider"></div>
    <div class="eaf-section eaf-unsubscribe">
      <h3 class="eaf-heading">Unsubscribe</h3>
      <p class="eaf-description">Enter your email to unsubscribe from all alerts.</p>
      <form class="eaf-form" id="eaf-unsubscribe-form">
        <div class="eaf-field">
          <label class="eaf-label" for="eaf-unsub-email">Email Address</label>
          <input type="email" class="eaf-input" id="eaf-unsub-email" placeholder="your@email.com" required>
        </div>
        <button type="submit" class="eaf-btn eaf-btn-secondary">Unsubscribe</button>
      </form>
    </div>
  `;

  wrapper.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (e) => e.preventDefault());
  });

  block.append(wrapper);
}
