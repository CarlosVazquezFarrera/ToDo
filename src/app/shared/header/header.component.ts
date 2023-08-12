import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { toggleSideBar } from 'src/app/state/actions/sidebar.actions';
import metadata from './header.metadata.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store<AppState>) {

  }
  today = new Date();


  //#region Methods
  public toggleMenu(): void {
    this.store.dispatch(toggleSideBar());
  }
  //#endregion

  //#region Gets

  public get day(): string {
    return metadata.days[this.today.getDay()]
  }

  public get currentDay(): string {
    return `${this.today.getDate()}th`;
  }
  public get month(): string {
    return metadata.months[this.today.getMonth()]
  }
  //#endregion
}
