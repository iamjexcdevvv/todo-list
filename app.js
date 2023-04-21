const form = document.querySelector("form[data-form]");
const todoInput = document.querySelector("input[data-input]");
const todoListEl = document.querySelector("div[data-lists]");

class TodoList {
  constructor(taskName) {
    this.taskName = taskName;
    this.createTodo();
  }
  createTodo() {
    const todos = this.getTodos();
    const todoObj = {
      taskName: this.taskName,
      id: Math.floor(Math.random() * 10000),
    };
    this.makeTodoEl(todoObj.id, todoObj.taskName);
    todos.push(todoObj);
    this.saveTodo(todos);
  }
  saveTodo(todos) {
    localStorage.setItem("todo-app", JSON.stringify(todos));
  }
  getTodos() {
    return JSON.parse(localStorage.getItem("todo-app") || "[]");
  }
  makeTodoEl(id, task) {
    const newDiv = document.createElement("div");
    const newPar = document.createElement("p");
    const newSpan = document.createElement("span");

    newDiv.classList.add("todo");
    newPar.innerText = task;
    newSpan.innerText = "X";

    newDiv.append(newPar, newSpan);
    todoListEl.appendChild(newDiv);

    newSpan.addEventListener("click", () => {
      this.removeTodo(newDiv, id);
    });
  }
  removeTodo(element, id) {
    const todos = this.getTodos().filter((item) => item.id !== id);
    this.saveTodo(todos);
    todoListEl.removeChild(element);
  }
  static renderTodo() {
    this.prototype.getTodos().forEach((item) => {
      this.prototype.makeTodoEl(item.id, item.taskName);
    });
  }
}

TodoList.renderTodo();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  new TodoList(todoInput.value);
  todoInput.value = "";
});
