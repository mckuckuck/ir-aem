async function fetchEvents(source) {
  if (!source) return [];
  try {
    const resp = await fetch(source);
    if (!resp.ok) return [];
    const json = await resp.json();
    return json.data || json;
  } catch (e) {
    return [];
  }
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

function buildEventCard(event) {
  const card = document.createElement('div');
  card.className = 'ec-event-card';

  const dateEl = document.createElement('div');
  dateEl.className = 'ec-event-date';
  dateEl.textContent = formatDate(event.date);
  card.append(dateEl);

  if (event.time) {
    const timeEl = document.createElement('div');
    timeEl.className = 'ec-event-time';
    timeEl.textContent = event.time;
    card.append(timeEl);
  }

  const titleEl = document.createElement('h4');
  titleEl.className = 'ec-event-title';
  titleEl.textContent = event.title || event.name || '';
  card.append(titleEl);

  if (event.type) {
    const badge = document.createElement('span');
    badge.className = 'ec-event-type';
    badge.textContent = event.type;
    card.append(badge);
  }

  if (event.webcast || event.link) {
    const actions = document.createElement('div');
    actions.className = 'ec-event-actions';
    if (event.webcast) {
      const a = document.createElement('a');
      a.href = event.webcast;
      a.className = 'ec-event-action';
      a.textContent = 'Watch Webcast';
      actions.append(a);
    }
    if (event.link) {
      const a = document.createElement('a');
      a.href = event.link;
      a.className = 'ec-event-action';
      a.textContent = 'Details';
      actions.append(a);
    }
    card.append(actions);
  }

  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const config = {};

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const valueCell = cells[1];
      const link = valueCell.querySelector('a');
      config[key] = link?.href || valueCell.textContent.trim();
    }
  });

  block.textContent = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'ec-inner';

  const heading = config.heading || 'Events';
  const h3 = document.createElement('h3');
  h3.className = 'ec-heading';
  h3.textContent = heading;
  wrapper.append(h3);

  const tabs = document.createElement('div');
  tabs.className = 'ec-tabs';

  const upcomingTab = document.createElement('button');
  upcomingTab.className = 'ec-tab ec-tab-active';
  upcomingTab.textContent = 'Upcoming';

  const pastTab = document.createElement('button');
  pastTab.className = 'ec-tab';
  pastTab.textContent = 'Past';

  tabs.append(upcomingTab);
  tabs.append(pastTab);
  wrapper.append(tabs);

  const filtersWrapper = document.createElement('div');
  filtersWrapper.className = 'ec-filters';
  wrapper.append(filtersWrapper);

  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'ec-events';
  wrapper.append(eventsContainer);

  block.append(wrapper);

  const events = await fetchEvents(config.source || config['data-source'] || '');
  const now = new Date();
  let showUpcoming = true;
  let activeType = '';
  let activeYear = '';

  const types = [...new Set(events.map((e) => e.type).filter(Boolean))].sort();
  const years = [...new Set(events.map((e) => {
    const match = (e.date || '').match(/\d{4}/);
    return match ? match[0] : '';
  }).filter(Boolean))].sort((a, b) => b - a);

  function render() {
    eventsContainer.textContent = '';

    let filtered = events.filter((e) => {
      const eventDate = new Date(e.date);
      if (showUpcoming) return eventDate >= now;
      return eventDate < now;
    });

    if (activeType) filtered = filtered.filter((e) => e.type === activeType);
    if (activeYear) filtered = filtered.filter((e) => (e.date || '').includes(activeYear));

    filtered.sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return showUpcoming ? da - db : db - da;
    });

    if (filtered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'ec-empty';
      empty.textContent = showUpcoming ? 'No upcoming events.' : 'No past events found.';
      eventsContainer.append(empty);
    } else {
      filtered.forEach((event) => eventsContainer.append(buildEventCard(event)));
    }
  }

  function buildFilters() {
    filtersWrapper.textContent = '';

    if (types.length > 0) {
      const select = document.createElement('select');
      select.className = 'ec-filter-select';
      select.setAttribute('aria-label', 'Filter by type');
      const allOpt = document.createElement('option');
      allOpt.value = '';
      allOpt.textContent = 'All Types';
      select.append(allOpt);
      types.forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        if (t === activeType) opt.selected = true;
        select.append(opt);
      });
      select.addEventListener('change', () => { activeType = select.value; render(); });
      filtersWrapper.append(select);
    }

    if (years.length > 0) {
      const select = document.createElement('select');
      select.className = 'ec-filter-select';
      select.setAttribute('aria-label', 'Filter by year');
      const allOpt = document.createElement('option');
      allOpt.value = '';
      allOpt.textContent = 'All Years';
      select.append(allOpt);
      years.forEach((y) => {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        if (y === activeYear) opt.selected = true;
        select.append(opt);
      });
      select.addEventListener('change', () => { activeYear = select.value; render(); });
      filtersWrapper.append(select);
    }
  }

  upcomingTab.addEventListener('click', () => {
    showUpcoming = true;
    upcomingTab.classList.add('ec-tab-active');
    pastTab.classList.remove('ec-tab-active');
    render();
  });

  pastTab.addEventListener('click', () => {
    showUpcoming = false;
    pastTab.classList.add('ec-tab-active');
    upcomingTab.classList.remove('ec-tab-active');
    render();
  });

  buildFilters();
  render();
}
