import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedComponent } from './completed.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task';

describe('CompletedComponent', () => {
  let component: CompletedComponent;
  let fixture: ComponentFixture<CompletedComponent>;
  const task: Array<Task> = [];
  const storeMock = {
    select() {
      return of(task);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeMock }
      ],
      declarations: [CompletedComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
