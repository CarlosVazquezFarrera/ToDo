import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'filterTask'
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: Array<Task>, completed: boolean = false): Array<Task> {
    return tasks.filter(t=> t.completed === completed);
  }

}
