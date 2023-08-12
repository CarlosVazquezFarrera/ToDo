import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private store: Store<AppState>) {
    this.task$ = this.store.select('tasks');
  }

  public task$!: Observable<Array<Task>>;
}
