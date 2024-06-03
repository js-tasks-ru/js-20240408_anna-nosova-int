import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {},
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;
    this.element = this.createElement(this.createTemplate());

    this.sort(this.sorted.id, this.sorted.order);
    this.onHeaderColClick();
  }

  onHeaderColClick() {
    const header = this.element.querySelector(`[data-element ="header"]`);
    header.onpointerdown = (event) => {
      const col = event.target.closest(`[data-sortable ="true"]`);
      const sortOrder = col.dataset.order === 'asc' ? 'desc' : 'asc';

      this.sort(col.dataset.id, sortOrder);
    };
  }
}
