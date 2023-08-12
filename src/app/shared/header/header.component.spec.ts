import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppState } from 'src/app/app.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { toggleSideBar } from 'src/app/state/actions/sidebar.actions';
import { By } from '@angular/platform-browser';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const initialState: Pick<AppState, 'tasks'> = {
    tasks: []
  }
  const today: Date = new Date();
  let storeSpy: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],
      providers: [
        provideMockStore({ initialState })
      ],
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storeSpy = TestBed.inject(MockStore);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected month', () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const futureDate = new Date();
    futureDate.setMonth(today.getMonth() + 1);
    const currentMonth: string = component.month;

    const testFutureMonth: string = months[futureDate.getMonth()];
    const testCurrentMonth: string = months[today.getMonth()];

    expect(currentMonth).not.toBe(testFutureMonth);
    expect(currentMonth).toBe(testCurrentMonth);
  });


  it('should return expected day', () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 2);

    const currentDay: string = component.day;

    const testFutureDay: string = days[futureDate.getDay()]
    const testCurrentDay: string = days[today.getDay()];

    expect(currentDay).not.toBe(testFutureDay);
    expect(currentDay).toBe(testCurrentDay);
  });

  it('should toggle Menu', () => {
    const toggleSpy = spyOn(storeSpy, 'dispatch');
    component.toggleMenu();
    expect(toggleSpy).toHaveBeenCalledWith(toggleSideBar());
  });
});
