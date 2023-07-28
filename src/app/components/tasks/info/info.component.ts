import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';
import { toggleAll } from 'src/app/state/actions/tasks.actions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select('tasks');
  }

  public tasks$!: Observable<Task[]>;

  private completed: boolean = false;

  public toggleAll(): void {
    this.completed = !this.completed;
    this.store.dispatch(toggleAll({ completed: this.completed }));
  }
}
