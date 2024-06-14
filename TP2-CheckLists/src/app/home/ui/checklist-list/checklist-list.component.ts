import {Component, input, output} from '@angular/core';
import {Checklist} from "../../../shared/interfaces/checklist";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-checklist-list',
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
        <li>
          {{ checklist.title }}
          <div>
            <button (click)="remove.emit(checklist)" class="btn-red btn-space">Supprimer</button>
            <button class="btn-blue btn-space" routerLink="/checklist/{{ checklist.id }}">Consulter</button>
          </div>
        </li>
      } @empty {
        <p>Cliquez sur le bouton ajouter pour créer une liste!</p>
      }
    </ul>
  `,
  imports: [
    RouterLink
  ]
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>();
  remove = output<Checklist>();
}
