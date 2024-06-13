import {Component, inject, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateTodo} from "../../../shared/models/todo";

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="title" placeholder="Titre" />
      <input
        type="text"
        formControlName="description"
        placeholder="Description"
      />
      <button [disabled]="!todoForm.valid" type="submit">Ajouter</button>
    </form>
  `,
  styles: ``
})

export class TodoFormComponent {
  private fb = inject(FormBuilder);

  todoForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
  });

  todoSubmitted = output<CreateTodo>();

  onSubmit() {
    this.todoSubmitted.emit(this.todoForm.getRawValue());
    this.todoForm.get('title')?.reset();
    this.todoForm.get('description')?.reset();
  }
}
