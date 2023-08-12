import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { CompletedComponent } from 'src/app/pages/completed/completed.component';
import { ActivitiesComponent } from 'src/app/pages/activities/activities.component';
import { CommonModule, Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutes } from 'src/app/app-routing-key';
import { toggleSideBar } from 'src/app/state/actions/sidebar.actions';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;
  let location: Location;
  let completedComponent: ComponentFixture<CompletedComponent>;
  let activitiesComponent: ComponentFixture<ActivitiesComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        CommonModule,
      ],
      declarations: [
        MenuComponent,
        CompletedComponent,
        ActivitiesComponent
      ],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    completedComponent = TestBed.createComponent(CompletedComponent);
    activitiesComponent = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    router.initialNavigation();
    location = TestBed.inject(Location);
    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to completed component', fakeAsync(() => {

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    completedComponent.detectChanges();
    component.changePage(AppRoutes.completed.route);
    completedComponent.whenStable().then(() => {
      expect(location.path()).toBe(`/${AppRoutes.completed.route}`);
      expect(location.path()).not.toBe(`/${AppRoutes.task.route}`);
    });
    expect(dispatchSpy).toHaveBeenCalledWith(toggleSideBar());

  }));

  it('should navigate to activities component', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    activitiesComponent.detectChanges();
    component.changePage(AppRoutes.task.route);
    activitiesComponent.whenStable().then(() => {
      expect(location.path()).toBe(`/${AppRoutes.task.route}`);
      expect(location.path()).not.toBe(`/${AppRoutes.completed.route}`);
    });

    expect(dispatchSpy).toHaveBeenCalledWith(toggleSideBar());
  }));


});
