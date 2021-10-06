import { Screen } from './view/Screen.js';
import { TodoList } from './model/TodoList.js';
import { TodoController } from './controller/TodoController.js';
class TodoApp {
    main() {
      const screen = new Screen();
      const list = new TodoList();
      const controller = new TodoController(screen, list);
      controller.startApp();
    }
}
  
  
  const todo = new TodoApp();
  todo.main();