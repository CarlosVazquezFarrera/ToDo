import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../components/modals/add-edit-task/add-edit-task.component';
import { ModalsKeys } from '../components/modals/modal-keys';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private dialog: MatDialog) { }

  private modals = Array<MatDialogRef<unknown, unknown>>();

  private components = new Map<string, ComponentType<unknown>>(
    [
      [ModalsKeys.addEditTask, AddEditTaskComponent],
      [ModalsKeys.confirmation, ConfirmationComponent]
    ]
  );
  /***
   * Display a new modal on the screen
   */
  public pushModal<D, R>(key: ModalsKeys, data?: D): MatDialogRef<unknown, R> {
    const component: ComponentType<unknown> = this.components.get(key)!;
    const dialog: MatDialogRef<unknown, R> = this.dialog.open(component, { disableClose: true, data: data });
    this.modals.push(dialog);
    return dialog;
  }
  /***
   * Revemove the last modal displeyed on screen
   */
  public popModal<T>(data?: T) {
    if (this.modals.length - 1 < 0) return;
    const lastModal = this.modals[this.modals.length - 1];
    lastModal.close(data);
    this.modals.pop();
  }

  public popToRoot() {
    this.modals.forEach((m) => m.close());
    this.modals = [];
  }

  public get modalCount(): number {
    return this.modals.length;
  }
}
