export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'fo-inner';

  const contentCol = document.createElement('div');
  contentCol.className = 'fo-content';

  const imageCol = document.createElement('div');
  imageCol.className = 'fo-image';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const cell1 = cells[0];
      const cell2 = cells[1];

      const pic1 = cell1.querySelector('picture');
      const pic2 = cell2.querySelector('picture');

      if (pic1) {
        imageCol.append(pic1.cloneNode(true));
        contentCol.innerHTML = cell2.innerHTML;
      } else if (pic2) {
        imageCol.append(pic2.cloneNode(true));
        contentCol.innerHTML = cell1.innerHTML;
      } else {
        contentCol.innerHTML += cell1.innerHTML;
      }
    } else if (cells.length === 1) {
      const pic = cells[0].querySelector('picture');
      if (pic) {
        imageCol.append(pic.cloneNode(true));
      } else {
        contentCol.innerHTML += cells[0].innerHTML;
      }
    }
  });

  wrapper.append(contentCol);
  if (imageCol.children.length > 0) {
    wrapper.append(imageCol);
  }

  block.append(wrapper);
}
