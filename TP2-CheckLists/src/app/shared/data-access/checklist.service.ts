import {Injectable, computed, signal, inject} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import {AddChecklist, Checklist, ChecklistsState, RemoveChecklist} from '../interfaces/checklist';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  storageService = inject(StorageService);

  // state
  private state = signal<ChecklistsState>({
    checklists: [],
  });

  // selectors
  checklists = computed(() => this.state().checklists);

  // sources
  add$ = new Subject<AddChecklist>();
  remove$ = new Subject<Checklist>();

  constructor() {
    this.loadChecklistsFromStorage();

    // reducers
    this.add$.pipe(takeUntilDestroyed())
      .subscribe((checklist) => {
        this.state.update((state) => ({
          ...state,
          checklists: [...state.checklists, this.addIdToChecklist(checklist)],
        }));
        this.storageService.set('checklists', JSON.stringify(this.checklists()));
      });

    this.remove$.pipe(takeUntilDestroyed())
      .subscribe((checklistId) => {
        this.state.update((state) => ({
          ...state,
          checklists: state.checklists.filter((checklist) => checklist.id !== checklistId.id),
        }));
        this.storageService.set('checklists', JSON.stringify(this.checklists()));
      });

  }

  private loadChecklistsFromStorage() {
    const storedChecklists = this.storageService.get('checklists');
    if (storedChecklists) {
      this.state.update(() => ({
        checklists: JSON.parse(storedChecklists),
      }));
    }
  }

  private addIdToChecklist(checklist: AddChecklist) {
    return {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };
  }

  private generateSlug(title: string) {
    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // Check if the slug already exists
    const matchingSlugs = this.checklists().find(
      (checklist) => checklist.id === slug
    );

    // If the title is already being used, add a string to make the slug unique
    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
