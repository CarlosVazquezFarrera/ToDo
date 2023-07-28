import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private store: Store<AppState>) {
    this.store.select('sideBar').subscribe((sideBarOpen) => this.isOpen = sideBarOpen);
  }
  public isOpen!: boolean;

}
