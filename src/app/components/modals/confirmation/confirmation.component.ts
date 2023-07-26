import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private modalService: ModalsService) {
    this.text = data;
  }

  text: string;

  public confirm(): void {
    this.modalService.popModal<boolean>(true);
  }

  public cancel(): void {
    this.modalService.popModal<boolean>(false);
  }
}
