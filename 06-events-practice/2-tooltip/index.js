class Tooltip {
  element;
  static #instance = null;

  constructor() {
    if (!Tooltip.#instance) {
      Tooltip.#instance = this;
    } else {
      return Tooltip.#instance;
    }
  }

  createElement() {
    const tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    return tooltipElem;
  }

  render(textContent) {
    this.element.textContent = textContent;
    document.body.append(this.element);
  }

  addEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  onPointerOver = event => {
    if (event.target.dataset.tooltip) {
      this.render(event.target.dataset.tooltip);
    }
  }

  onPointerMove = event => {
    if (event.target.dataset.tooltip) {
      this.element.style.left = event.clientX + 'px';
      this.element.style.top = event.clientY + 'px';
    }
  }

  onPointerOut = (event) => {
    if (event.target.dataset.tooltip) {
      this.element.remove();
    }
  }

  initialize () {
    this.element = this.createElement();
    this.addEventListeners();
  }

  removeEventListeners() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerout', this.onPointerOut);
  }

  destroy() {
    this.element.remove();
    this.removeEventListeners();
  }
}

export default Tooltip;

// class Tooltip {
//  element;
//
//   constructor() {
//   }
//
//   createElement() {
//     const tooltipElem = document.createElement('div');
//     tooltipElem.className = 'tooltip';
//     return tooltipElem;
//   }
//
//   addEventListeners() {
//     document.addEventListener('pointerover', this.onPointerOver);
//     document.addEventListener('pointermove', this.onPointerMove);
//     document.addEventListener('pointerout', this.onPointerOut);
//   }
//
//   onPointerOver = event => {
//     if (event.target.dataset.tooltip) {
//       this.element.innerHTML = event.target.dataset.tooltip;
//       document.body.append(this.tooltip);
//     }
//   }
//
//   onPointerMove = event => {
//     if (event.target.dataset.tooltip) {
//       this.element.style.left = event.clientX + 'px';
//       this.element.style.top = event.clientY + 'px';
//     }
//   }
//
//   onPointerOut = event => {
//     if (event.target.dataset.tooltip) {
//       this.element.remove();
//     }
//   }
//
//
//   initialize () {
//     this.element = this.createElement();
//     this.addEventListeners();
//   }
//
//   removeEventListeners() {
//     document.removeEventListener('pointerover', this.onPointerOver);
//     document.removeEventListener('pointermove', this.onPointerMove);
//     document.removeEventListener('pointerout', this.onPointerOut);
//   }
//
//   destroy() {
//     this.element.remove();
//     this.removeEventListeners();
//   }
// }
//
// export default Tooltip;
