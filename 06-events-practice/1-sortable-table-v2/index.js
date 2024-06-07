import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTableV2 extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {},
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;

    this.sort(this.sorted.id, this.sorted.order);
    this.addEventListeners();
  }

  addEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onHeaderColClick);
  }

  onHeaderColClick = (event) => {
    const col = event.target.closest('[data-sortable="true"]');
    if (!col) {
      return;
    }
    const sortOrder = col.dataset.order === 'desc' ? 'asc' : 'desc';

    this.sort(col.dataset.id, sortOrder);
  }
}
