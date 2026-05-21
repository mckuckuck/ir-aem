export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'arg-inner';

  const heading = document.createElement('h3');
  heading.className = 'arg-heading';
  heading.textContent = 'Annual Reports';
  wrapper.append(heading);

  const grid = document.createElement('div');
  grid.className = 'arg-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const imageCell = cells[0];
      const infoCell = cells[1];

      const card = document.createElement('div');
      card.className = 'arg-card';

      const pic = imageCell.querySelector('picture');
      if (pic) {
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'arg-card-cover';
        imgWrapper.append(pic.cloneNode(true));
        card.append(imgWrapper);
      }

      const content = document.createElement('div');
      content.className = 'arg-card-content';

      const year = infoCell.querySelector('strong, h4, h5');
      if (year) {
        const yearEl = document.createElement('h4');
        yearEl.className = 'arg-card-year';
        yearEl.textContent = year.textContent.trim();
        content.append(yearEl);
      }

      const links = infoCell.querySelectorAll('a');
      if (links.length > 0) {
        const actions = document.createElement('div');
        actions.className = 'arg-card-actions';
        links.forEach((link) => {
          const a = link.cloneNode(true);
          a.className = 'arg-card-link';
          actions.append(a);
        });
        content.append(actions);
      }

      card.append(content);
      grid.append(card);
    }
  });

  wrapper.append(grid);
  block.append(wrapper);
}
