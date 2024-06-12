import {computed, effect, Injectable, signal} from '@angular/core';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  #todos = signal<Todo[]>([]);
  todos = this.#todos.asReadonly();

  todosLength = computed(() => this.#todos().length);

  constructor() {
    effect(() => {
      console.log(this.#todos());
    });
  }

  addTodo(todo: Todo) {
    this.#todos.update(todos => [...todos, todo]);
    console.log('Todo added!', todo);
  }
}
