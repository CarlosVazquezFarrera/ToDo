import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { Store } from '@ngrx/store';
import { MenuComponent } from './shared/menu/menu.component';
import { of } from 'rxjs';
import { SharedModule } from './shared.module';

describe('AppComponent', () => {
  const storeMock = {
    select() {
      return of([])
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeMock }
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
