import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-completed-item',
  templateUrl: './completed-item.component.html',
  styleUrls: ['./completed-item.component.scss']
})
export class CompletedItemComponent {
  @Input() task!: string;
}
