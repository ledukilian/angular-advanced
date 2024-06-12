import {Component, input} from '@angular/core';
import {Todo} from "../../../shared/models/todo";

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
            <ul>
                  @for (todo of todos(); track $index){
            <li>
            <a>{{ todo.title }}</a>
            </li>
                  } @empty {
            <li>Rien à afficher</li>
                  }
            </ul>
              `,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
}
