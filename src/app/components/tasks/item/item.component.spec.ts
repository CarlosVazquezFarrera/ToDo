import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { ModalsService } from 'src/app/services/modals.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Task } from 'src/app/models/task';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducer';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalsKeys } from '../../modals/modal-keys';
import metadata from './item.metadata.json';
import { By } from '@angular/platform-browser';
import { AddEditTaskComponent } from '../../modals/add-edit-task/add-edit-task.component';
import { complet, remove } from 'src/app/state/actions/tasks.actions';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  const taskMock: Task = new Task("Test");
  let mockModalsService: jasmine.SpyObj<ModalsService> = jasmine.createSpyObj('ModalsService', ['pushModal']);
  let mockStore: MockStore<AppState>;
  const initialState: Pick<AppState, 'tasks'> = {
    tasks: []
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatSlideToggleModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        provideMockStore({ initialState }),
        ModalsService
      ],
      declarations: [ItemComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.task = taskMock;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
    mockModalsService = TestBed.inject(ModalsService) as jasmine.SpyObj<ModalsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not delete any task since the user click cancel', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });
    const pushModalSpy = spyOn(mockModalsService, 'pushModal').and.returnValue(dialogRefSpyObj);

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.delete();
    tick();
    expect(pushModalSpy).toHaveBeenCalledWith(ModalsKeys.confirmation, metadata.message);
    expect(dispatchSpy).not.toHaveBeenCalled();
  }));

  it('should delete the current task since the user click confirm', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    const pushModalSpy = spyOn(mockModalsService, 'pushModal').and.returnValue(dialogRefSpyObj);

    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.delete();
    tick();
    expect(pushModalSpy).toHaveBeenCalledWith(ModalsKeys.confirmation, metadata.message);
    expect(dispatchSpy).toHaveBeenCalledWith(remove({ id: taskMock.id }));
  }));

  it('should display edit modal', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    const pushModalSpy = spyOn(mockModalsService, 'pushModal').and.returnValue(dialogRefSpyObj);
    component.edit();
    tick();
    expect(pushModalSpy).toHaveBeenCalledWith(ModalsKeys.addEditTask, taskMock);
    const addEditTask = fixture.debugElement.query(By.directive(AddEditTaskComponent));
    expect(addEditTask).toBeDefined();
  }));

  it('should dispatch complet acction since user checked the task', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.check.setValue(true);
    expect(dispatchSpy).toHaveBeenCalledWith(complet({ id: taskMock.id }));
  });
});
