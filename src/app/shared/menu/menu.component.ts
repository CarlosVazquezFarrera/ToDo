import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing-key';
import { toggleSideBar } from 'src/app/state/actions/sidebar.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select('sideBar').subscribe((sideBarOpen) => this.isOpen = sideBarOpen);
  }
  public isOpen!: boolean;

  public changePage(route: string): void {
    this.router.navigateByUrl(route);
    this.store.dispatch(toggleSideBar());
  }

  //#region Gets
  public get menuItems() {
    return Object.values(AppRoutes);
  }

  //#endregion
}
