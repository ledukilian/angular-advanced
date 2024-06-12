import {Component, inject} from '@angular/core';
import {TodoFormComponent} from "./ui/todo-form/todo-form.component";
import {TodoService} from "../shared/data-access/todo.service";
import {TodoListComponent} from "./ui/todo-list/todo-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent
  ],
  template: `
    <h1>ToDo</h1>
    <p>Todos: {{ todoService.todosLength() }}</p>
    <app-todo-form (todoSubmitted)="todoService.addTodo($event)" ></app-todo-form>
    <app-todo-list [todos]="todoService.todos()"></app-todo-list>
  `,
  styles: ``
})
export default class HomeComponent {
  todoService = inject(TodoService);
}
