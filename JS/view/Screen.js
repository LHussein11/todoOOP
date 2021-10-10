export class Screen {
  constructor() {
    this.input = document.querySelector('.input');
    this.btnAdd = document.querySelector('.btnInput');
    this.main = document.querySelector('main');
    this.btnDelete = document.querySelector('.btnDelete');

    this.subscribers = {};

    this.registerEventListeners();
  }

  notifySubscribers(eventName, ...data) {
    if (this.subscribers.hasOwnProperty(eventName)) {
      this.subscribers[eventName].forEach((callback) => {
        callback(...data);
      });
    }
  }

  subscribe(eventName, callback) {
    if (this.subscribers.hasOwnProperty(eventName)) {
      this.subscribers[eventName].push(callback);
    } else {
      this.subscribers[eventName] = [callback];
    }
  }

  registerEventListeners() {
    this.btnAdd.addEventListener('click', () => this.notifySubscribers('click:btnAdd'));
    this.btnDelete.addEventListener('click', () => this.notifySubscribers('click:btnDelete'));
    this.main.addEventListener('click', (event) => {
      if (event.target.classList.contains('fa-trash')) {
        this.notifySubscribers(
          'click:deleteSingle',
          Number(event.target.parentElement.dataset.id),
          event.target.parentElement
        );
      }

      if (event.target.classList.contains('completed')) {
        this.notifySubscribers(
          'click:completed',
          Number(event.target.parentElement.parentElement.dataset.id),
          event.target.parentElement.parentElement
        );
      }

      if (event.target.classList.contains('not-completed')) {
        this.notifySubscribers(
          'click:not-completed',
          Number(event.target.parentElement.parentElement.dataset.id),
          event.target.parentElement.parentElement
        );
      }
    });
  }

  getTaskMarkup(task) {
    const { value, id, completed } = task;
    return `
        <div class='item' data-id='${id}'>
          <p>${value}
            <span class='${completed ? 'completed' : 'not-completed'}'>${
      completed ? 'Completed' : 'Not completed'
    }</span>
          </p>
          <i class='fas fa-trash'></i>
        </div>
      `;
  }

  renderItem(task) {
    const markup = this.getTaskMarkup(task);
    this.main.innerHTML += markup;
  }

  getInput() {
    return this.input.value;
  }

  clearInput() {
    this.input.value = '';
  }

  deleteAllElements() {
    const arrChildren = Array.from(this.main.children);
    arrChildren.forEach((child) => {
      child.remove();
    });
  }

  deleteSingleElement(element) {
    element.remove();
  }

  showTasks(tasks) {
    tasks.forEach((task) => this.renderItem(task));
  }

  updateItem(element, task) {
    const markup = this.getTaskMarkup(task);
    element.innerHTML = markup;
  }
}
