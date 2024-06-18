export default class DoubleSlider {

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
    this.addEventListeners();
  }

  get template() {
    return `
      <div class="range-slider">
        <span data-element="from">${ this.formatValue(this.selected.from) }</span>
        <div class="range-slider__inner">
           <span class="range-slider__progress" style="left: ${ this.getPercentage(this.selected.from) }%; right: ${ 100 - this.getPercentage(this.selected.to) }%"></span>
           <span class="range-slider__thumb-left" style="left: ${ this.getPercentage(this.selected.from) }%"></span>
           <span class="range-slider__thumb-right" style="right: ${ 100 - this.getPercentage(this.selected.to) }%"></span>
        </div>
        <span data-element="to">${ this.formatValue(this.selected.to) }</span>
      </div>`;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  getPercentage(value) {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  addEventListeners() {
    this.element.querySelector('.range-slider__thumb-left').addEventListener('pointerdown', this.onThumbPointerDown);
    this.element.querySelector('.range-slider__thumb-right').addEventListener('pointerdown', this.onThumbPointerDown);
  }

  onThumbPointerDown = event => {
    event.preventDefault();

    const thumb = event.target;
    const { left, right } = this.element.querySelector('.range-slider__inner').getBoundingClientRect();
    const shiftX = event.clientX - thumb.getBoundingClientRect().left;
    const moveThumb = this.onThumbPointerMove.bind(this, thumb, left, right, shiftX);

    document.addEventListener('pointermove', moveThumb);
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', moveThumb);
      this.element.dispatchEvent(new CustomEvent('range-select', {
        detail: this.selected,
        bubbles: true
      }));
    }, { once: true });
  }

  onThumbPointerMove = (thumb, left, right, shiftX, event) => {
    let newLeft = (event.clientX - shiftX - left) / (right - left) * 100;

    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > 100) {
      newLeft = 100;
    }

    if (thumb.classList.contains('range-slider__thumb-left')) {
      const rightThumb = this.element.querySelector('.range-slider__thumb-right');
      const rightThumbLeft = parseFloat(rightThumb.style.right);

      if (newLeft > 100 - rightThumbLeft) {
        newLeft = 100 - rightThumbLeft;
      }

      this.selected.from = Math.round(this.min + newLeft * (this.max - this.min) / 100);
      thumb.style.left = `${ newLeft }%`;
      this.element.querySelector('[data-element="from"]').textContent = this.formatValue(this.selected.from);
    } else {
      const leftThumb = this.element.querySelector('.range-slider__thumb-left');
      const leftThumbLeft = parseFloat(leftThumb.style.left);

      if (newLeft < leftThumbLeft) {
        newLeft = leftThumbLeft;
      }

      this.selected.to = Math.round(this.min + newLeft * (this.max - this.min) / 100);
      thumb.style.right = `${ 100 - newLeft }%`;
      console.log(this.selected.to);
      this.element.querySelector('[data-element="to"]').textContent = this.formatValue(this.selected.to);
    }

    this.updateProgress();
  }

  updateProgress() {
    const progress = this.element.querySelector('.range-slider__progress');
    progress.style.left = `${this.getPercentage(this.selected.from)}%`;
    progress.style.right = `${100 - this.getPercentage(this.selected.to)}%`;
  }

  destroy() {
    this.element.remove();
  }
}
