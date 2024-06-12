import {Component, inject, input} from '@angular/core';
import {Todo} from "../../../shared/models/todo";
import {RouterLink} from "@angular/router";
import {TodoService} from "../../../shared/data-access/todo.service";

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos(); track $index) {
        <li>
          <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a> <button (click)="todoService.deleteTodo(todo)">Supprimer</button>
        </li>
      } @empty {
        <li>Rien à afficher</li>
      }
    </ul>
  `,
  imports: [
    RouterLink
  ]
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  todoService = inject(TodoService);
}
