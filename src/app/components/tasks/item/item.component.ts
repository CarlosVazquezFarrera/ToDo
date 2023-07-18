import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Task } from 'src/app/models/task';
import { toggle } from 'src/app/state/actions/tasks.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }
  @Input() task!: Task;
  check!: FormControl;

  ngOnInit(): void {
    this.check = new FormControl(this.task.completed);
    this.suscribeToChanges();
  }


  private suscribeToChanges(): void {
    this.check.valueChanges.subscribe(() => {
      this.store.dispatch(toggle({ id: this.task.id }));
    });
  }
}
