export default class SortableTable {

  constructor(headerConfig = [], data = []) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return (`<div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeader(this.headerConfig)}
            </div>
            <div data-element="body" class="sortable-table__body">
            ${this.createRows(this.data)}
            </div>
        </div>
    </div>`);
  }

  createHeader(headerConfig) {
    return headerConfig.map(({ id, sortable, title }) =>
      `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
       </div>`).join('');
  }

  createArrows() {
    return (`<span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
            </span>`);
  }

  createRows(data) {
    return data.map((item) => `<a href="/products/${item.id}" class="sortable-table__row">
        ${this.createCells(item, data)}
    </a>`).join('');
  }

  createCells(item) {
    const headers = this.headerConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return headers.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }


  updateArrows(field, order) {
    if (this.element.querySelector(`[data-element="arrow"]`)) {
      this.element.querySelector(`[data-element="arrow"]`).remove();
    }
    this.element.querySelector(`[data-id="${field}"]`).append(this.createElement(this.createArrows()));
    this.element.querySelector(`[data-id="${field}"]`).dataset.order = order;
  }

  sortData(field, order) {
    let sortingArr = [...this.data];

    if (order === 'desc') {
      typeof sortingArr[0][field] === 'string' ?
        sortingArr.sort((a, b) => a[field].localeCompare(b[field])).reverse()
        : sortingArr.sort((a, b) => a[field] - b[field]).reverse();
    }
    if (order === 'asc') {
      typeof sortingArr[0][field] === 'string' ?
        sortingArr.sort((a, b) => a[field].localeCompare(b[field]))
        : sortingArr.sort((a, b) => a[field] - b[field]);
    }

    return sortingArr;
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.element.querySelector(`[data-element="body"]`).innerHTML = this.createRows(sortedData);
    this.updateArrows(field, order);
  }


  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
