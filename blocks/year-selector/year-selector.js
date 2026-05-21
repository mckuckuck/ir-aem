function buildDocumentList(items) {
  const list = document.createElement('div');
  list.className = 'year-selector-documents';

  items.forEach(({ title, href }) => {
    const item = document.createElement('div');
    item.className = 'year-selector-doc-item';

    const icon = document.createElement('span');
    icon.className = 'year-selector-doc-icon';
    icon.setAttribute('aria-hidden', 'true');

    const link = document.createElement('a');
    link.className = 'year-selector-doc-link';
    link.href = href;
    link.textContent = title;

    item.append(icon);
    item.append(link);
    list.append(item);
  });

  return list;
}

export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const config = {};
  const documents = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim();
      const valueCell = cells[1];

      if (key.toLowerCase() === 'heading') {
        config.heading = valueCell.textContent.trim();
      } else if (key.toLowerCase() === 'source') {
        config.source = valueCell.querySelector('a')?.href || valueCell.textContent.trim();
      } else {
        const year = key;
        const links = valueCell.querySelectorAll('a');
        if (links.length > 0) {
          documents[year] = [...links].map((a) => ({
            title: a.textContent.trim(),
            href: a.href,
          }));
        } else {
          documents[year] = [{ title: valueCell.textContent.trim(), href: '#' }];
        }
      }
    }
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'year-selector-inner';

  if (config.heading) {
    const heading = document.createElement('h3');
    heading.className = 'year-selector-heading';
    heading.textContent = config.heading;
    wrapper.append(heading);
  }

  const years = Object.keys(documents).sort((a, b) => b - a);

  if (years.length > 0) {
    const selectWrapper = document.createElement('div');
    selectWrapper.className = 'year-selector-controls';

    const label = document.createElement('label');
    label.className = 'year-selector-label';
    label.textContent = 'Select Year:';
    label.setAttribute('for', 'year-select');

    const select = document.createElement('select');
    select.className = 'year-selector-select';
    select.id = 'year-select';

    years.forEach((year) => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      select.append(option);
    });

    selectWrapper.append(label);
    selectWrapper.append(select);
    wrapper.append(selectWrapper);

    const docsContainer = document.createElement('div');
    docsContainer.className = 'year-selector-docs-container';
    wrapper.append(docsContainer);

    const showYear = (y) => {
      docsContainer.textContent = '';
      if (documents[y]) {
        docsContainer.append(buildDocumentList(documents[y]));
      }
    };

    select.addEventListener('change', () => showYear(select.value));
    showYear(years[0]);
  }

  block.append(wrapper);
}
