import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TodoService} from "../shared/data-access/todo.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <button class="btn-blue" routerLink="/home">Retour</button>
    @if (todo(); as todo) {
      <h1>{{ todo.title }}</h1>
      <p>{{ todo.description }}</p>
    } @else {
      <p>Todo not found</p>
    }
  `,
  styles: ``
})
export default class TodoDetailComponent {
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);

  private paramMap = toSignal(this.route.paramMap);

  todo = computed(() =>
    this.todoService.todos()
      .find(todo => todo.id === this.paramMap()?.get('id'))
  );
}
