import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ModalsService } from 'src/app/services/modals.service';
import { add } from 'src/app/state/actions/tasks.actions';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent {
    //#region Constructor
    constructor(private store: Store<AppState>, private modalService: ModalsService) {
    }
    //#endregion

    //#region Properties
    public task: FormControl = new FormControl('', { validators: [Validators.required] });
    //#endregion

    //#region Methods
    public add(): void {
      if (this.task.invalid) return;
      this.store.dispatch(add({text: this.task.value}));
      this.modalService.popModal();
    }
    //#endregion

    //#region Gets
    public get hasError(): boolean {
      return this.task.hasError('required');
    }
    //#endregion
}
