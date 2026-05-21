export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'ia-inner';

  const heading = document.createElement('h3');
  heading.className = 'ia-heading';
  heading.textContent = 'Investor Alerts';
  wrapper.append(heading);

  const description = document.createElement('p');
  description.className = 'ia-description';
  description.textContent = 'Sign up to receive email alerts for press releases, SEC filings, and events.';
  wrapper.append(description);

  const form = document.createElement('form');
  form.className = 'ia-form';
  form.addEventListener('submit', (e) => e.preventDefault());

  const emailField = document.createElement('div');
  emailField.className = 'ia-field';
  emailField.innerHTML = `
    <label class="ia-label" for="ia-email">Email Address</label>
    <input type="email" class="ia-input" id="ia-email" placeholder="your@email.com" required>
  `;
  form.append(emailField);

  const options = [];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 1) {
      const text = cells[0].textContent.trim();
      if (text) options.push(text);
    }
  });

  if (options.length > 0) {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'ia-checkboxes';
    const groupLabel = document.createElement('span');
    groupLabel.className = 'ia-label';
    groupLabel.textContent = 'Alert Preferences';
    checkboxGroup.append(groupLabel);

    options.forEach((opt, i) => {
      const label = document.createElement('label');
      label.className = 'ia-checkbox-label';
      label.innerHTML = `<input type="checkbox" name="pref" value="${opt}" id="ia-pref-${i}"> ${opt}`;
      checkboxGroup.append(label);
    });
    form.append(checkboxGroup);
  } else {
    const checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'ia-checkboxes';
    checkboxGroup.innerHTML = `
      <span class="ia-label">Alert Preferences</span>
      <label class="ia-checkbox-label"><input type="checkbox" name="pref" value="press-releases"> Press Releases</label>
      <label class="ia-checkbox-label"><input type="checkbox" name="pref" value="sec-filings"> SEC Filings</label>
      <label class="ia-checkbox-label"><input type="checkbox" name="pref" value="events"> Events & Presentations</label>
      <label class="ia-checkbox-label"><input type="checkbox" name="pref" value="quarterly-results"> Quarterly Results</label>
    `;
    form.append(checkboxGroup);
  }

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'ia-submit';
  submitBtn.textContent = 'Subscribe';
  form.append(submitBtn);

  wrapper.append(form);
  block.append(wrapper);
}
