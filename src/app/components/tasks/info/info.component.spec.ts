import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InfoComponent } from './info.component';
import { ModalsService } from 'src/app/services/modals.service';
import { of } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Task } from 'src/app/models/task';
import { AppState } from 'src/app/app.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { toggleAll } from 'src/app/state/actions/tasks.actions';
import metadata from './info.metadata.json';

describe('InfoComponent', () => {
  const task1 = new Task("1");
  task1.completed = true;
  const task2 = new Task("2");
  const task3 = new Task("3");
  const task4 = new Task("4");
  const initialState: Pick<AppState, 'tasks'> = {
    tasks: [
      task1,
      task2,
      task3,
      task4
    ]
  }

  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let mockStore: MockStore<AppState>;
  let modalService: jasmine.SpyObj<ModalsService> = jasmine.createSpyObj('ModalsService', ['pushModal']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSlideToggleModule, MatDialogModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: ModalsService, useValue: modalService },
        ModalsService
      ],
      declarations: [InfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore = TestBed.inject(MockStore);
    modalService = TestBed.inject(ModalsService) as jasmine.SpyObj<ModalsService>;
  });
  beforeEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.matSlideToggle.disabled).toBeFalse();
  });

  it('should has 3 elements', () => {
    expect(component.tasks).toBe(3);
  });

  it('should return true and toggle all the tasks', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    const pushModalSpy = spyOn(modalService, 'pushModal').and.returnValue(dialogRefSpyObj);

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const toggleSppy = spyOn(component.matSlideToggle, 'toggle');
    component.toggleAll();
    tick();
    expect(pushModalSpy).toHaveBeenCalled();
    expect(toggleSppy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(toggleAll());
  }));

  it('should return false and switch back the matSlideToggle', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });
    spyOn(modalService, 'pushModal').and.returnValue(dialogRefSpyObj);

    const toggleSppy = spyOn(component.matSlideToggle, 'toggle');
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.toggleAll();
    tick();
    expect(toggleSppy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalledWith(toggleAll());
  }));

  it('should not toggle since there are not tasks', fakeAsync(() => {
    const pushModalSpy = spyOn(modalService, 'pushModal');
    component.tasks = 0;
    component.toggleAll();
    expect(pushModalSpy).not.toHaveBeenCalled();
  }));
});
