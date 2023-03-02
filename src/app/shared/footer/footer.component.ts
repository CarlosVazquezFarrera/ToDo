import { Component } from '@angular/core';
import { ModalsKeys } from 'src/app/components/modals/modalKeys';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private modalsService: ModalsService) {

  }

  public addTask(): void {
    this.modalsService.pushModal(ModalsKeys.addTask);
  }
}
