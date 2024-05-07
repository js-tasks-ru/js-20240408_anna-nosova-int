export default class NotificationMessage {
  element;

  constructor(
    title = '',
    { duration = 0,
      type = ''
    } = {}) {
    this.duration = duration;
    this.type = type;
    this.title = title;
    this.timerId = null;

    this.element = this.createTemplate();
  }

  createTemplate() {
    const element = document.createElement('div');

    element.innerHTML = `<div class="notification ${this.type}" style="--value:${this.duration}ms">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.title}
        </div>
      </div>
    </div>`;
    return element.firstElementChild;
  }

  show(container = document.body) {
    container.append(this.createTemplate());

    this.timerId = setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
}
