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
    store.select('tasks').subscribe((task)=>{
      this.tasks = task.filter(task => task.completed );
    });
  }
  public tasks!: Task[];
}
