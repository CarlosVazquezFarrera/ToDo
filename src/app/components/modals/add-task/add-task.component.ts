import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ModalsService } from 'src/app/services/modals.service';
import { add } from 'src/app/state/actions/todo.actions';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  //#region Constructor
  constructor(private store: Store<AppState>, private modalService: ModalsService) {
    this.task = new FormControl('', { validators: [Validators.required] });
  }
  //#endregion

  //#region Properties
  public task: FormControl;
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
