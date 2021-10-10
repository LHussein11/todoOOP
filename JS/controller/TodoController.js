export class TodoController {
    constructor(screen, list) {
        this.screen = screen;
        this.list = list;
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.screen.subscribe('click:btnAdd', () => this.onButtonAddClick());
        this.screen.subscribe('click:btnDelete', () => this.onButtonDeleteClick());
        this.screen.subscribe('click:deleteSingle', (id, element) => this.onDeleteSingleClick(id, element));
    }

    onButtonAddClick() {
        const input = this.screen.getInput();
        const task = this.list.add(input);
        this.screen.clearInput();
        this.screen.renderItem(task);
    }

    onButtonDeleteClick() {
        this.screen.deleteAllElements();
        this.list.deleteAll();
    }

    onDeleteSingleClick(id, element) {
        this.list.remove(id);
        this.screen.deleteSingleElement(element);
    }

    startApp() {
        const tasks = this.list.getTasks();
        this.screen.showTasks(tasks);
    }
}