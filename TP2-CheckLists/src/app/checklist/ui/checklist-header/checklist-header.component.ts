import {Component, input, output} from '@angular/core';
import { RouterLink } from '@angular/router';
import {Checklist} from "../../../shared/interfaces/checklist";

@Component({
  standalone: true,
  selector: 'app-checklist-header',
  template: `
    <header>
      <button class="btn-red" routerLink="/home">Retour</button>
      <h1>
              {{ checklist().title }}
      </h1>
      <!--<p class="muted">{{ checklist().id }}</p>-->
      <div>
        <button class="btn-red btn-space" (click)="resetCheckList.emit()">Réinitialiser</button>
        <button class="btn-green btn-space" (click)="addItem.emit()">Ajouter un ToDo</button>
      </div>
    </header>
  `,
  imports: [RouterLink],
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  addItem = output();
  resetCheckList = output();
}
