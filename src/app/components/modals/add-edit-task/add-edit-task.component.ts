import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';
import { ModalsService } from 'src/app/services/modals.service';
import { add, edit } from 'src/app/state/actions/tasks.actions';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent {
  //#region Constructor
  constructor(private store: Store<AppState>, private modalService: ModalsService, @Inject(MAT_DIALOG_DATA) public data: Task) {
    this.task = new FormControl(data?.text, { validators: [Validators.required] });
  }
  //#endregion

  //#region Properties
  public task!: FormControl;
  //#endregion

  //#region Methods
  public add(): void {
    this.task.markAsTouched();
    if (this.task.invalid) return;
    this.store.dispatch(add({ text: this.task.value }));
    this.modalService.popModal();
  }

  public update(): void {
    this.task.markAsTouched();
    if (this.task.invalid || this.sameValue) return;
    this.store.dispatch(edit({ id: this.data.id, text: this.task.value }));
    this.modalService.popModal();
  }
  //#endregion

  //#region Gets
  public get hasError(): boolean {
    return this.task.hasError('required');
  }
  public get isNew(): boolean {
    return !this.data;
  }

  public get text(): string {
    return this.isNew ? 'New task' : 'Edit task';
  }

  public get sameValue(): boolean {
    return this.data === this.task.value;
  }
  //#endregion
}
