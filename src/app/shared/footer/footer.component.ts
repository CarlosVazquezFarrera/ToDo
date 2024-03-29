import { Component } from '@angular/core';
import { ModalsKeys } from 'src/app/components/modals/modal-keys';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private modalsService: ModalsService) {

  }

  today = new Date();

  public addTask(): void {
    this.modalsService.pushModal(ModalsKeys.addEditTask);
  }
}
