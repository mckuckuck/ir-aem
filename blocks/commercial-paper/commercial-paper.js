export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'cp-inner';

  let currentSection = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const cell = cells[0];
      const heading = cell.querySelector('h2, h3, h4');
      if (heading) {
        currentSection = document.createElement('div');
        currentSection.className = 'cp-subsection';
        const h = document.createElement('h3');
        h.className = 'cp-subsection-heading';
        h.textContent = heading.textContent.trim();
        currentSection.append(h);
        wrapper.append(currentSection);
      } else {
        const content = document.createElement('div');
        content.className = 'cp-content';
        content.innerHTML = cell.innerHTML;
        if (currentSection) {
          currentSection.append(content);
        } else {
          wrapper.append(content);
        }
      }
    } else if (cells.length >= 2) {
      const item = document.createElement('div');
      item.className = 'cp-item';

      const label = document.createElement('span');
      label.className = 'cp-item-label';
      label.textContent = cells[0].textContent.trim();
      item.append(label);

      const value = document.createElement('span');
      value.className = 'cp-item-value';
      value.innerHTML = cells[1].innerHTML;
      item.append(value);

      if (currentSection) {
        currentSection.append(item);
      } else {
        wrapper.append(item);
      }
    }
  });

  block.append(wrapper);
}
