import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select('tasks');
  }
  public tasks$!: Observable<Array<Task>>;
}
