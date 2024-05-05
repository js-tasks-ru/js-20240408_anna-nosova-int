export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = value => value
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;

    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createLink() {
    if (this.link) {
      return (`<a href="/${this.link}" class="column-chart__link">View all</a>`);
    }
    return '';
  }

  createChartBody() {
    return this.getColumnProps().map(({ value, percent }) =>
      `<div style="--value: ${value}" data-tooltip="${percent}"></div>`).join('');
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createClasses() {
    return this.data.length ? 'column-chart' : 'column-chart column-chart_loading';
  }

  createTemplate() {
    return (`<div class="${this.createClasses()}" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.createLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.createChartBody()}
        </div>
      </div>
    </div>`);
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBody();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
