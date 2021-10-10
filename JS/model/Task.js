export class Task {
    constructor(value) {
        this.id = Math.floor(Math.random() * 10000);
        this.value = value;
        this.completed = false;
    }
}