import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { toggleSideBar } from 'src/app/state/actions/sidebar.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store<AppState>) {

  }
  showFiller = false;
  today = new Date();


  //#region Methods
  public toggleMenu(): void {
    this.store.dispatch(toggleSideBar());
  }
  //#endregion

  //#region Gets

  public get day(): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[this.today.getDay()]
  }

  public get currentDay(): string {
    return `${this.today.getDate()}th`;
  }
  public get month(): string {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[this.today.getMonth()]
  }
  //#endregion
}
