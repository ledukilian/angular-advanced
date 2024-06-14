import {Component, input, output} from '@angular/core';
import {ChecklistItem, RemoveChecklistItem, ToogleCheckListItem} from "../../../shared/interfaces/checklist-item";
import {NgClass} from "@angular/common";

class RemoveCheckListitem {
}

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <section>
      <ul>
        @for (item of checklistItems(); track item.id) {
          <li [ngClass]="{'traite': item.checked}">
            <span>
              <div class="badge"></div>
              {{ item.title }}
            </span>
            <span>
              <button class="btn-blue btn-space"
                      (click)="remove.emit(item.id)">🚮</button>
              @if (!item.checked){
                <button class="btn-green btn-space"
                        (click)="toggle.emit(item.id)">✅</button>
              }
              @if (item.checked){
                <button class="btn-red btn-space"
                        (click)="toggle.emit(item.id)">❌</button>
              }
            </span>
          </li>
        } @empty {
          <li>
            <p class="muted">Aucun ToDo pour le moment!</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: ``
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<ToogleCheckListItem>();
  remove = output<RemoveChecklistItem>();
}
