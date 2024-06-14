import {Component, computed, effect, inject, signal} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {ChecklistService} from "../shared/data-access/checklist.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ChecklistHeaderComponent} from "./ui/checklist-header/checklist-header.component";
import {ChecklistItemService} from "./data-access/checklist-item.service";
import {FormBuilder} from "@angular/forms";
import {ChecklistItem} from "../shared/interfaces/checklist-item";
import {ModalComponent} from "../shared/ui/modal/modal.component";
import {FormModalComponent} from "../shared/ui/form-modal/form-modal.component";
import {ChecklistItemListComponent} from "./ui/checklist-item-list/checklist-item-list.component";

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    ChecklistHeaderComponent,
    ModalComponent,
    FormModalComponent,
    RouterLink,
    ChecklistItemListComponent
  ],
  template: `
    @if (checklist(); as checklist){
      <app-checklist-header [checklist]="checklist"
                            (addItem)="checklistItemBeingEdited.set({});"
                            (resetCheckList)="checklistItemService.reset$.next(checklist)"/>
    }
    <app-checklist-item-list [checklistItems]="items()"
                             (toggle)="checklistItemService.toggle$.next($event)"
                             (remove)="checklistItemService.remove$.next($event)"
                             (edit)="checklistItemBeingEdited.set($event)"/>
    <app-modal [isOpen]="!!checklistItemBeingEdited()">
      <ng-template>
        <app-form-modal
          title="{{ checklistItemBeingEdited()?.id ? 'Modifier un ToDo' : 'Créer un ToDo' }}"
          [formGroup]="checklistItemForm"
          (save)="checklistItemBeingEdited()?.id
          ? checklistItemService.edit$.next({
              id: checklist()?.id!,
              data: checklistItemForm.getRawValue(),
          })
          : checklistItemService.add$.next({
              item: checklistItemForm.getRawValue(),
              checklistId: checklist()?.id!,
            })"
            (close)="checklistItemBeingEdited.set(null)
          "
        ></app-form-modal>
      </ng-template>
    </app-modal>
  `,
  styles: ``
})

export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  checklistItemService = inject(ChecklistItemService);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );

  items = computed(() =>
    this.checklistItemService
      .checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id'))
  );

  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    this.checklistItemService.loadChecklistItemsFromStorage(this.params()?.get('id'));
    effect(() => {
      const checklistItem = this.checklistItemBeingEdited();
      if (!checklistItem) {
        this.checklistItemForm.reset();
      } else {
        this.checklistItemForm.patchValue(checklistItem);
      }
    });
  }
}
