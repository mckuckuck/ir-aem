function buildProfileCard(profile) {
  const card = document.createElement('div');
  card.className = 'ep-card';

  if (profile.image) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'ep-card-image';
    imgWrapper.append(profile.image);
    card.append(imgWrapper);
  }

  const info = document.createElement('div');
  info.className = 'ep-card-info';

  const name = document.createElement('h4');
  name.className = 'ep-card-name';
  name.textContent = profile.name;
  info.append(name);

  if (profile.title) {
    const title = document.createElement('p');
    title.className = 'ep-card-title';
    title.textContent = profile.title;
    info.append(title);
  }

  if (profile.bio) {
    const bio = document.createElement('p');
    bio.className = 'ep-card-bio';
    bio.textContent = profile.bio;
    info.append(bio);
  }

  card.append(info);
  return card;
}

export default function decorate(block) {
  const rows = [...block.children];
  const tabs = {};
  let currentTab = 'Executive Committee';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const heading = cells[0].querySelector('h2, h3, h4');
      if (heading) {
        currentTab = heading.textContent.trim();
        if (!tabs[currentTab]) tabs[currentTab] = [];
        return;
      }
    }

    if (!tabs[currentTab]) tabs[currentTab] = [];

    if (cells.length >= 2) {
      const imageCell = cells[0];
      const infoCell = cells[1];
      const pic = imageCell.querySelector('picture');
      const nameEl = infoCell.querySelector('strong, h4, h5');
      const allText = infoCell.textContent.trim();
      const nameText = nameEl?.textContent?.trim() || '';
      const remaining = allText.replace(nameText, '').trim();
      const parts = remaining.split('\n').filter((p) => p.trim());

      tabs[currentTab].push({
        image: pic?.cloneNode(true) || null,
        name: nameText,
        title: parts[0] || '',
        bio: parts.slice(1).join(' ') || '',
      });
    }
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'ep-inner';

  const tabNames = Object.keys(tabs);

  if (tabNames.length > 1) {
    const tabBar = document.createElement('div');
    tabBar.className = 'ep-tabs';

    const panels = [];

    tabNames.forEach((tabName, i) => {
      const btn = document.createElement('button');
      btn.className = `ep-tab${i === 0 ? ' ep-tab-active' : ''}`;
      btn.textContent = tabName;

      const panel = document.createElement('div');
      panel.className = `ep-panel${i === 0 ? ' ep-panel-active' : ''}`;

      const grid = document.createElement('div');
      grid.className = 'ep-grid';
      tabs[tabName].forEach((profile) => grid.append(buildProfileCard(profile)));
      panel.append(grid);

      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.ep-tab').forEach((t) => t.classList.remove('ep-tab-active'));
        panels.forEach((p) => p.classList.remove('ep-panel-active'));
        btn.classList.add('ep-tab-active');
        panel.classList.add('ep-panel-active');
      });

      tabBar.append(btn);
      panels.push(panel);
    });

    wrapper.append(tabBar);
    panels.forEach((p) => wrapper.append(p));
  } else if (tabNames.length === 1) {
    const grid = document.createElement('div');
    grid.className = 'ep-grid';
    tabs[tabNames[0]].forEach((profile) => grid.append(buildProfileCard(profile)));
    wrapper.append(grid);
  }

  block.append(wrapper);
}
