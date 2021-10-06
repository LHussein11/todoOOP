export class TodoList {
    constructor() {
        this.tasks = [];
    }

    getTasks() {
        let tasks = localStorage.getItem('items');
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
        return this.tasks;
    }

    add(task) {
        const tasks = JSON.parse(localStorage.getItem('items')) || [];
        tasks.push(task);
        localStorage.setItem('items', JSON.stringify(tasks));
    }

    deleteAll() {
        localStorage.removeItem('items');
    }
    
    remove(task) {
        const tasks = JSON.parse(localStorage.getItem('items'));
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(tasks));
    }
}