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
                this.notifySubscribers('click:deleteSingle', event.target.previousElementSibling.innerText, event.target.parentElement);
            }
        });
    }

    renderItem(task) {
        const value = task ? task.value : this.input.value;
        if (!value.trim()) {
            return;
        }

        const element = `
        <div class="item">
          <p>${value}</p>
          <i class="fas fa-trash"></i>
        </div>
      `;

      this.main.innerHTML += element;
    }

    getInput() {
        return this.input.value;
    }

    clearInput() {
        this.input.value = '';
    }

    deleteAllElements() {
        const arrChildren = Array.from(this.main.children);
        arrChildren.forEach(child => {
            child.remove();
        })
    }

    deleteSingleElement(element) {
        element.remove();
    }

    showTasks(tasks) {
        tasks.forEach(task => this.renderItem(task));
    }
}