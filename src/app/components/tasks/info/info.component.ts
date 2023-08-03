import { Component, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ModalsService } from 'src/app/services/modals.service';
import { toggleAll } from 'src/app/state/actions/tasks.actions';
import { ModalsKeys } from '../../modals/modal-keys';
import metadata from './info.metadata.json';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(private store: Store<AppState>, private modalService: ModalsService) {
    this.store.subscribe((state) => {
      this.tasks = state.tasks.filter(t => !t.completed).length;
    });
  }

  public tasks: number = 0;
  private completed: boolean = false;
  @ViewChild('matSlideToggle') matSlideToggle!: MatSlideToggle;


  public async toggleAll(): Promise<void> {
    if (this.noTasksAvailable) return;
    const confirmation$ = this.modalService.pushModal<string, boolean>(ModalsKeys.confirmation, metadata.confirmationMessage).beforeClosed();
    const confirmation =  await firstValueFrom(confirmation$);
    if (!confirmation) {
      this.matSlideToggle.toggle();
      return;
    }
    this.completed = !this.completed;
    this.store.dispatch(toggleAll({ completed: this.completed }));
    this.matSlideToggle.toggle();
  }

  public get noTasksAvailable(): boolean {
    return this.tasks <= 0;
  }

}
