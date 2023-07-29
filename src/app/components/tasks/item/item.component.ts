import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';
import { ModalsService } from 'src/app/services/modals.service';
import { remove, toggle } from 'src/app/state/actions/tasks.actions';
import { ModalsKeys } from '../../modals/modal-keys';
import metadata from '../item/item.metadata.json';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private store: Store<AppState>, private modalService: ModalsService) {

  }
  @Input() task!: Task;
  check!: FormControl;
  metadata = metadata;

  ngOnInit(): void {
    this.check = new FormControl(this.task.completed);
    this.suscribeToChanges();
  }


  private suscribeToChanges(): void {
    this.check.valueChanges.subscribe(() => {
      this.store.dispatch(toggle({ id: this.task.id }));
    });
  }

  public edit(): void {
    this.modalService.pushModal<Task, void>(ModalsKeys.addEditTask, this.task);
  }

  public async delete(): Promise<void> {
    const confirmation$ = this.modalService.pushModal<string, boolean>(ModalsKeys.confirmation, this.metadata.message).afterClosed();
    const confirmation = await firstValueFrom(confirmation$);
    if (!confirmation) return;
    this.store.dispatch(remove({ id: this.task.id }));
  }
}
