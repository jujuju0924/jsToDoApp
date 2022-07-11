import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {

  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    this.#todoListModel.onChange(() => {
    // Todoリストをまとめるlist要素
    const todoListElement = element`<ul />`;
    const todoItems = this.#todoListModel.getTodoItems();
    todoItems.forEach(item => {
      const todoItemElement = element `<li>${item.title}</li>`;
      todoListElement.appendChild(todoItemElement);
    });
    render(todoListElement, containerElement);
    todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  });

    formElement.addEventListener("submit",(event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();

            this.#todoListModel.addTodo(new TodoItemModel({
              title: inputElement.ariaValueMax,
              completed: false
            }));
            inputElement.value = "";
    });
  }
}