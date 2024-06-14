import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form-modal',
  template: `<div>
    <header>
      <h2>{{ title() }}</h2>
      <button class="btn-red" (click)="close.emit()">Fermer</button>
    </header>
    <div>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
              @for (control of formGroup().controls | keyvalue; track control.key){
      <div>
      <!--<label [for]="control.key">{{ control.key }}</label>-->
      <input
                    [id]="control.key"
                    type="text"
                    [formControlName]="control.key"
                  />
      </div>
              }
      <button class="btn-blue" type="submit">Sauvegarder</button>
      </form>
    </div>
</div>
  `,
  imports: [ReactiveFormsModule, KeyValuePipe],
  styles: [``],
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>();
  title = input.required<string>();
  save = output();
  close = output();
}
