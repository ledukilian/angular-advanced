import {Component, input} from '@angular/core';
import {Todo} from "../../../shared/models/todo";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos(); track $index) {
        <li>
          <a routerLink="/detail/{{ todo.id }}">{{ todo.title }}</a>
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
}
