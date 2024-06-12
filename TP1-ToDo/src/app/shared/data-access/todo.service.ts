import {computed, effect, Injectable, signal} from '@angular/core';
import {CreateTodo, Todo} from "../models/todo";

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

  addTodo(todo: CreateTodo) {
    this.#todos.update(todos => [...todos,
      {id: Date.now().toString(), ...todo}
    ]);
    console.log('Todo added!', todo);
  }
}
