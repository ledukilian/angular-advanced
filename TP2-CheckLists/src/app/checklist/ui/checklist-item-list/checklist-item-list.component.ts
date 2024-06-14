import {Component, input} from '@angular/core';
import {ChecklistItem} from "../../../shared/interfaces/checklist-item";

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [],
  template: `
    <section>
      <ul>
        @for (item of checklistItems(); track item.id) {
          <li class="traite">
            <span>
              <div class="badge"></div>
              {{ item.title }}
            </span>
            <span>
              <button class="btn-blue btn-space">🚮</button>
              <button class="btn-green btn-space">✅</button>
              <button class="btn-red btn-space">❌</button>
                  <!--<button class="btn-blue btn-space">Voir</button>-->
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

}
