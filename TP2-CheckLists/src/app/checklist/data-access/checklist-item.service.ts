import {Injectable, computed, signal, inject} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import {
  AddChecklistItem,
  ChecklistItem,
} from '../../shared/interfaces/checklist-item';
import {Checklist} from "../../shared/interfaces/checklist";
import {StorageService} from "../../shared/data-access/storage.service";

// Interface utilisée que par le service, donc on la met ici
export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
}

class CheckListItem {
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  storageService = inject(StorageService);

  // state
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);

  // sources
  add$ = new Subject<AddChecklistItem>();
  toggle$ = new Subject<CheckListItem>();
  reset$ = new Subject<Checklist>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: Date.now().toString(),
            checklistId: checklistItem.checklistId,
            checked: false,
          },
        ],
      }));
      this.saveToStorage(checklistItem.checklistId);
    });

    this.reset$.pipe(takeUntilDestroyed()).subscribe((checklist) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.checklistId === checklist.id
            ? { ...item, checked: false }
            : item
        ),
      }));
      this.saveToStorage(checklist.id);
    });

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === checklistItemId
            ? { ...item, checked: !item.checked }
            : item
        ),
      }));
      this.saveToStorage(this.checklistItems()[0].checklistId);
    });
  }

  private saveToStorage(checklistId: string | null | undefined) {
    this.storageService.set('checklists' + checklistId, JSON.stringify(this.checklistItems()));
  }

  public loadChecklistItemsFromStorage(checklistId: string | null | undefined) {
    const storedChecklistItems = this.storageService.get('checklists' + checklistId);
    if (storedChecklistItems) {
      this.state.update(() => ({
        checklistItems: JSON.parse(storedChecklistItems),
      }));
    }
  }

}
