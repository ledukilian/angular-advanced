import {Component, effect, inject, signal} from '@angular/core';
import { Checklist } from '../shared/interfaces/checklist';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { FormModalComponent } from "../shared/ui/form-modal/form-modal.component";
import { FormBuilder } from "@angular/forms";
import {ChecklistService} from "../shared/data-access/checklist.service";
import {ChecklistListComponent} from "./ui/checklist-list/checklist-list.component";

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <header>
      <h1>📌 Quicklists</h1>
      <button class="btn-green" (click)="checklistBeingEdited.set({})">Ajouter une liste</button>
    </header>
    <section>
      <h2>Vos listes</h2>
      <app-checklist-list [checklists]="checkListService.checklists()"
                          (edit)="checklistBeingEdited.set($event)"
                          (remove)="this.checkListService.remove$.next($event)" />
    </section>

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="
            checklistBeingEdited()?.title
              ? 'Éditer une liste'
              : 'Ajouter une liste'
          "
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
          (save)="
            checklistBeingEdited()?.id
              ? checkListService.edit$.next({
                  id: checklistBeingEdited()!.id!,
                  data: checklistForm.getRawValue()
                })
              : checkListService.add$.next(checklistForm.getRawValue())
          "
        />
      </ng-template>
    </app-modal>
  `,
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent],
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);
  checkListService = inject(ChecklistService);

  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited();
      if (!checklist) {
        this.checklistForm.reset();
      } else {
        this.checklistForm.patchValue(checklist);
      }
    });
  }
}
