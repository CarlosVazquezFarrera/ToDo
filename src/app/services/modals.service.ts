import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { AddEditTaskComponent } from '../components/modals/add-edit-task/add-edit-task.component';
import { ModalsKeys } from '../components/modals/modalKeys';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(public dialog: MatDialog) { }

  private modals = Array<MatDialogRef<unknown, unknown>>();

  /***
   * Display a new modal on the screen
   */
  public pushModal<T>(key: ModalsKeys): MatDialogRef<unknown, unknown> {
    let matDialogRef: MatDialogRef<unknown, unknown> = Object.create(MatDialogRef);
    switch (key) {
      case ModalsKeys.addTask:
        return this.addAndOpenModal({ component: AddEditTaskComponent});
      default:
        return matDialogRef;
    }
  }
  /***
   * Revemove the last modal displeyed on screen
   */
  public popModal<T>(data?: T) {
    if (this.modals.length - 1 < 0) return;
    const ultimoModal = this.modals[this.modals.length - 1];
    if (!data) {
      ultimoModal.close();
      return;
    }
    else ultimoModal.close(data);
    this.modals.pop();
  }

  public popToRoot() {
    this.modals.forEach((m) => m.close());
    this.modals = [];
  }
  /**
   *
   * @param Component
   * @para Data
   * @returns
   */
  private addAndOpenModal<C, T>({ component, data }: { component: ComponentType<C>, data?: T }): MatDialogRef<unknown, unknown> {
    const dialog = this.dialog.open(component, { disableClose: true, data: data });
    this.modals.push(dialog);
    return dialog;
  }
}
