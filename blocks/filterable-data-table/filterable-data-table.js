async function fetchData(source) {
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

function getUniqueValues(data, field) {
  const values = new Set();
  data.forEach((row) => {
    if (row[field]) values.add(row[field]);
  });
  return [...values].sort();
}

function buildFilter(label, options, onChange) {
  const wrapper = document.createElement('div');
  wrapper.className = 'fdt-filter';

  const select = document.createElement('select');
  select.className = 'fdt-filter-select';
  select.setAttribute('aria-label', label);

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = label;
  select.append(defaultOpt);

  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.append(option);
  });

  select.addEventListener('change', () => onChange(select.value));
  wrapper.append(select);
  return wrapper;
}

function buildTable(data, columns) {
  const table = document.createElement('table');
  table.className = 'fdt-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  columns.forEach((col) => {
    const th = document.createElement('th');
    th.textContent = col.label;
    headerRow.append(th);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  data.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((col) => {
      const td = document.createElement('td');
      const value = row[col.field] || '';
      if (col.type === 'link' && value) {
        const a = document.createElement('a');
        a.href = value;
        a.textContent = col.linkLabel || 'Download';
        a.className = 'fdt-download-link';
        td.append(a);
      } else if (col.type === 'titled-link' && value) {
        const a = document.createElement('a');
        a.href = value;
        a.textContent = row[col.titleField] || value;
        a.className = 'fdt-title-link';
        td.append(a);
      } else if (col.type === 'links') {
        const links = value.split(',').map((l) => l.trim()).filter(Boolean);
        links.forEach((href, i) => {
          if (i > 0) td.append(document.createTextNode(' | '));
          const a = document.createElement('a');
          a.href = href;
          a.textContent = col.linkLabels?.[i] || 'View';
          a.className = 'fdt-download-link';
          td.append(a);
        });
      } else {
        td.textContent = value;
      }
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);

  if (data.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = columns.length;
    td.className = 'fdt-empty';
    td.textContent = 'No results found.';
    tr.append(td);
    tbody.append(tr);
  }

  return table;
}

function getVariantConfig(variant) {
  if (variant === 'sec-filings') {
    return {
      columns: [
        { field: 'date', label: 'Date' },
        { field: 'type', label: 'Type' },
        { field: 'description', label: 'Description' },
        {
          field: 'document', label: 'Document', type: 'link', linkLabel: 'View',
        },
      ],
      filters: ['type', 'year'],
    };
  }
  if (variant === 'insider-filings') {
    return {
      columns: [
        { field: 'date', label: 'Date' },
        { field: 'name', label: 'Name' },
        { field: 'title', label: 'Title' },
        { field: 'type', label: 'Transaction Type' },
        {
          field: 'document', label: 'Filing', type: 'link', linkLabel: 'View',
        },
      ],
      filters: ['name', 'type'],
    };
  }
  if (variant === 'term-sheets') {
    return {
      columns: [
        { field: 'date', label: 'Date' },
        { field: 'description', label: 'Description' },
        {
          field: 'document', label: 'Document', type: 'link', linkLabel: 'Download',
        },
      ],
      filters: ['year'],
    };
  }
  if (variant === 'news') {
    return {
      columns: [
        { field: 'date', label: 'Date' },
        {
          field: 'link', label: 'Title', type: 'titled-link', titleField: 'title',
        },
      ],
      filters: ['year'],
    };
  }
  return {
    columns: [
      { field: 'date', label: 'Date' },
      { field: 'description', label: 'Description' },
      {
        field: 'document', label: 'Document', type: 'link', linkLabel: 'View',
      },
    ],
    filters: ['year'],
  };
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
    } else if (cells.length === 1) {
      const cell = cells[0];
      const link = cell.querySelector('a');
      const text = cell.textContent.trim();
      if (link) {
        config.source = link.href;
      } else if (!config.heading) {
        config.heading = text;
      }
    }
  });

  block.textContent = '';

  const variant = [...block.classList].find((c) => c !== 'filterable-data-table' && c !== 'block') || '';
  const variantConfig = getVariantConfig(variant);
  const source = config.source || config['data-source'] || '';

  const wrapper = document.createElement('div');
  wrapper.className = 'fdt-inner';

  const heading = config.heading || config.title || '';
  if (heading) {
    const h3 = document.createElement('h3');
    h3.className = 'fdt-heading';
    h3.textContent = heading;
    wrapper.append(h3);
  }

  const filtersWrapper = document.createElement('div');
  filtersWrapper.className = 'fdt-filters';
  wrapper.append(filtersWrapper);

  const tableContainer = document.createElement('div');
  tableContainer.className = 'fdt-table-container';
  wrapper.append(tableContainer);

  block.append(wrapper);

  const data = await fetchData(source);
  let filteredData = [...data];
  const activeFilters = {};

  function renderTable() {
    filteredData = data.filter((row) => Object.entries(activeFilters).every(([field, value]) => {
      if (!value) return true;
      if (field === 'year') {
        return row.date && row.date.includes(value);
      }
      return row[field] === value;
    }));
    tableContainer.textContent = '';
    tableContainer.append(buildTable(filteredData, variantConfig.columns));
  }

  variantConfig.filters.forEach((filterField) => {
    let options;
    if (filterField === 'year') {
      options = getUniqueValues(data.map((row) => {
        const date = row.date || '';
        const match = date.match(/\d{4}/);
        return { ...row, year: match ? match[0] : '' };
      }), 'year');
    } else {
      options = getUniqueValues(data, filterField);
    }
    const label = `All ${filterField.charAt(0).toUpperCase() + filterField.slice(1)}s`;
    const filter = buildFilter(label, options, (value) => {
      activeFilters[filterField] = value;
      renderTable();
    });
    filtersWrapper.append(filter);
  });

  renderTable();
}
