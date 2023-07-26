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

  today = new Date();

  public addTask(): void {
    this.modalsService.pushModal(ModalsKeys.addEditTask);
  }

  public get year(): number {
    return this.today.getFullYear();
  }
}
