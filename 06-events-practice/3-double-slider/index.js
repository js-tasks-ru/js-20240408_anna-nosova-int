export default class DoubleSlider {
  element;
  subElements = {};

  constructor(
    {
      min = 0,
      max = 100,
      selected = { from: min, to: max },
      formatValue = value => value
    } = {}) {
    this.min = min;
    this.max = max;
    this.selected = selected;
    this.formatValue = formatValue;

    this.render();
    this.createSubElements();
    this.addEventListeners();
  }

  get template() {
    let left = this.getPercentage(this.selected.from);
    let right = 100 - this.getPercentage(this.selected.to);

    return `
      <div class="range-slider">
        <span data-element="from">${ this.formatValue(this.selected.from) }</span>
        <div data-element="inner" class="range-slider__inner">
           <span data-element="progress" class="range-slider__progress" style="left: ${ left }%; right: ${ right }%"></span>
           <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: ${ left }%"></span>
           <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${ right }%"></span>
        </div>
        <span data-element="to">${ this.formatValue(this.selected.to) }</span>
      </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  createSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      this.subElements[element.dataset.element] = element;
    }
  }

  getPercentage(value) {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  addEventListeners() {
    this.subElements.inner.addEventListener('pointerdown', this.onThumbPointerDown);
  }

  onThumbPointerDown = event => {
    const thumb = event.target;
    if (thumb === this.subElements.thumbLeft || thumb === this.subElements.thumbRight) {
      event.preventDefault();
      this.currentThumb = thumb;

      document.addEventListener('pointermove', this.onThumbPointerMove);
      document.addEventListener('pointerup', this.onThumbPointerUp);
    }
  }

  onThumbPointerUp = () => {
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);
    this.element.dispatchEvent(new CustomEvent('range-select', {
      detail: this.selected,
      bubbles: true
    }));
  }

  onThumbPointerMove = event => {
    const { left, right } = this.subElements.inner.getBoundingClientRect();
    let newLeft = (event.clientX - left) / (right - left) * 100;

    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > 100) {
      newLeft = 100;
    }

    if (this.currentThumb === this.subElements.thumbLeft) {
      const rightThumb = parseFloat(this.subElements.thumbRight.style.right);

      if (newLeft > 100 - rightThumb) {
        newLeft = 100 - rightThumb;
      }

      this.selected.from = Math.round(this.min + newLeft * (this.max - this.min) / 100);
      this.currentThumb.style.left = this.subElements.progress.style.left = `${ newLeft }%`;
      this.subElements.from.textContent = this.formatValue(this.selected.from);
    }

    if (this.currentThumb === this.subElements.thumbRight) {
      const leftThumb = parseFloat(this.subElements.thumbLeft.style.left);

      if (newLeft < leftThumb) {
        newLeft = leftThumb;
      }
      this.selected.to = Math.round(this.min + newLeft * (this.max - this.min) / 100);
      this.currentThumb.style.right = this.subElements.progress.style.right = `${ 100 - newLeft }%`;
      this.subElements.to.textContent = this.formatValue(this.selected.to);
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements.inner.addEventListener('pointerdown', this.onThumbPointerDown);
    document.removeEventListener('pointermove', this.onThumbPointerMove);
    document.removeEventListener('pointerup', this.onThumbPointerUp);
  }

}
