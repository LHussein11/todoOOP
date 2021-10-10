import { Task } from './Task.js';

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

    setTasks(tasks) {
        localStorage.setItem('items', JSON.stringify(tasks));
    }

    add(value) {
        const tasks = JSON.parse(localStorage.getItem('items')) || [];
        const task = new Task(value);
        tasks.push(task);
        this.setTasks(tasks);
        return task;
    }

    deleteAll() {
        localStorage.removeItem('items');
    }
    
    remove(id) {
        const tasks = this.getTasks()
        .filter((task) => id !== task.id);
        this.setTasks(tasks);
    }

    toggleComplete(id) {
        const tasks = this.getTasks();
        const task = tasks.find(task => id === task.id);
        task.completed = !task.completed;
        this.setTasks(tasks);
        return task;
    }
}