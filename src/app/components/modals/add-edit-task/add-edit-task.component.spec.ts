import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditTaskComponent } from './add-edit-task.component';
import { ModalsService } from 'src/app/services/modals.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducer';
import { Task } from 'src/app/models/task';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { add, edit } from 'src/app/state/actions/tasks.actions';
import metadata from './add-edit-task.metadata.json';

describe('AddEditTaskComponent', () => {
  let component: AddEditTaskComponent;
  let fixture: ComponentFixture<AddEditTaskComponent>;
  let taskControl: FormControl;
  let modalService: jasmine.SpyObj<ModalsService>;
  let mockStore: MockStore<AppState>;

  const matDialogData = new Task("Test");
  const initialState: AppState = {
    tasks: [],
    sideBar: false
  }

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalsService', ['popModal']);

    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [AddEditTaskComponent],
      providers: [
        { provide: ModalsService, useValue: modalServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData },
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskControl = component.task;
    modalService = TestBed.inject(ModalsService) as jasmine.SpyObj<ModalsService>;
    mockStore = TestBed.inject(MockStore);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('taskFormComtrol should has a value', () => {
    expect(component.task.value).toBe(matDialogData.text);
  });

  it('Add method should  not add a new task', () => {
    const taskMarkAsTouched = spyOn(taskControl, 'markAsTouched');
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    taskControl.setValue(null);
    fixture.detectChanges();
    component.add();

    //spyOnProperty(component.task, 'invalid').and.returnValue(true);
    expect(taskControl.invalid).toBeTruthy();
    expect(taskMarkAsTouched).toHaveBeenCalled();

    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(modalService.popModal).not.toHaveBeenCalled();


  });


  it('Add method should add a new task', () => {
    const mockStoreSpy = spyOn(mockStore, 'dispatch');
    const taskMarkAsTouched = spyOn(taskControl, 'markAsTouched');

    component.add();
    expect(taskMarkAsTouched).toHaveBeenCalled();
    //spyOnProperty(component.task, 'invalid').and.returnValue(false);
    expect(taskControl.invalid).toBeFalsy();

    expect(mockStoreSpy).toHaveBeenCalledWith(add({ text: matDialogData.text }));
    expect(modalService.popModal).toHaveBeenCalled();

  });


  it('Task control validators should work', () => {
    taskControl.setValue(null);
    fixture.detectChanges();
    expect(taskControl.hasError('required')).toBeTruthy();
    taskControl.setValue("Test");
    fixture.detectChanges();
    expect(taskControl.hasError('required')).toBeFalsy();
  });

  it('Should return new o edit string', () => {
    component.data = undefined;
    expect(component.text).toBe(metadata.new);
    component.data = matDialogData;
    expect(component.text).toBe(metadata.edit);
  });

  it('Should not update the task', () => {
    const markAsTouched = spyOn(taskControl, 'markAsTouched');

    taskControl.setValue(null);
    component.update();
    expect(taskControl.invalid).toBeTruthy();
    expect(markAsTouched).toHaveBeenCalled();
    expect(modalService.popModal).not.toHaveBeenCalled();

    taskControl.setValue(component.data?.text);
    component.update();
    expect(component.sameValue).toBeTruthy();
    expect(modalService.popModal).not.toHaveBeenCalled();

  });


  it('Should update the task', () => {
    const mockStoreSpy = spyOn(mockStore, 'dispatch');
    taskControl.setValue("Task updated");
    component.update();
    expect(taskControl.invalid).toBeFalsy();
    expect(modalService.popModal).toHaveBeenCalled();
    expect(mockStoreSpy).toHaveBeenCalledWith(edit({ id: matDialogData.id, text: taskControl.value }));
  });

});
