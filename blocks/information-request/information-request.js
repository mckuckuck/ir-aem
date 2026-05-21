export default function decorate(block) {
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'ir-form-inner';

  wrapper.innerHTML = `
    <h3 class="ir-form-heading">Information Request</h3>
    <p class="ir-form-description">Complete the form below and we will respond to your request.</p>
    <form class="ir-form" id="information-request-form">
      <div class="ir-form-row">
        <div class="ir-form-field">
          <label class="ir-form-label" for="ir-first-name">First Name *</label>
          <input type="text" class="ir-form-input" id="ir-first-name" required>
        </div>
        <div class="ir-form-field">
          <label class="ir-form-label" for="ir-last-name">Last Name *</label>
          <input type="text" class="ir-form-input" id="ir-last-name" required>
        </div>
      </div>
      <div class="ir-form-row">
        <div class="ir-form-field">
          <label class="ir-form-label" for="ir-email">Email Address *</label>
          <input type="email" class="ir-form-input" id="ir-email" required>
        </div>
        <div class="ir-form-field">
          <label class="ir-form-label" for="ir-phone">Phone Number</label>
          <input type="tel" class="ir-form-input" id="ir-phone">
        </div>
      </div>
      <div class="ir-form-field ir-form-field-full">
        <label class="ir-form-label" for="ir-company">Company</label>
        <input type="text" class="ir-form-input" id="ir-company">
      </div>
      <div class="ir-form-field ir-form-field-full">
        <label class="ir-form-label" for="ir-subject">Subject *</label>
        <select class="ir-form-input" id="ir-subject" required>
          <option value="">Select a topic...</option>
          <option value="annual-report">Annual Report Request</option>
          <option value="financial-info">Financial Information</option>
          <option value="shareholder">Shareholder Services</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="ir-form-field ir-form-field-full">
        <label class="ir-form-label" for="ir-message">Message *</label>
        <textarea class="ir-form-input ir-form-textarea" id="ir-message" rows="5" required></textarea>
      </div>
      <div class="ir-form-captcha">
        <p class="ir-form-captcha-note">CAPTCHA verification required before submission.</p>
      </div>
      <button type="submit" class="ir-form-submit">Submit Request</button>
    </form>
  `;

  const form = wrapper.querySelector('form');
  form.addEventListener('submit', (e) => e.preventDefault());

  block.append(wrapper);
}
