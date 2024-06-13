import { Component, input } from '@angular/core';
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
          <button class="btn-blue" routerLink="/checklist/{{ checklist.id }}">Voir</button>
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
}
