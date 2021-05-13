import { makeAutoObservable } from 'mobx';

export class TodoListStore {
  todoList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: string): void {
    this.todoList.push(todo);
  }

  getTodoByIndex(index: number): string {
    return this.todoList[index];
  }
}
