export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'abs-inner';

  let currentSection = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const cell = cells[0];
      const heading = cell.querySelector('h2, h3, h4');

      if (heading) {
        currentSection = document.createElement('div');
        currentSection.className = 'abs-subsection';

        const sectionHeading = document.createElement('h3');
        sectionHeading.className = 'abs-subsection-heading';
        sectionHeading.textContent = heading.textContent.trim();
        currentSection.append(sectionHeading);
        wrapper.append(currentSection);
      } else {
        const content = document.createElement('div');
        content.className = 'abs-content';
        content.innerHTML = cell.innerHTML;
        if (currentSection) {
          currentSection.append(content);
        } else {
          wrapper.append(content);
        }
      }
    } else if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const valueCell = cells[1];

      if (key === 'disclaimer' || key === 'notice') {
        const disclaimer = document.createElement('div');
        disclaimer.className = 'abs-disclaimer';
        disclaimer.innerHTML = valueCell.innerHTML;
        if (currentSection) {
          currentSection.append(disclaimer);
        } else {
          wrapper.append(disclaimer);
        }
      } else {
        const item = document.createElement('div');
        item.className = 'abs-item';

        const label = document.createElement('span');
        label.className = 'abs-item-label';
        label.textContent = cells[0].textContent.trim();
        item.append(label);

        const value = document.createElement('span');
        value.className = 'abs-item-value';
        const link = valueCell.querySelector('a');
        if (link) {
          value.append(link.cloneNode(true));
        } else {
          value.textContent = valueCell.textContent.trim();
        }
        item.append(value);

        if (currentSection) {
          currentSection.append(item);
        } else {
          wrapper.append(item);
        }
      }
    }
  });

  block.append(wrapper);
}
