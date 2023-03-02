import { Component } from '@angular/core';
import { ModalsService } from 'src/app/services/modals.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  constructor(private modalService: ModalsService) {
  }
}
