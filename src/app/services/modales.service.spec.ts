import { TestBed } from '@angular/core/testing';
import { ModalsService } from './modals.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalsKeys } from '../components/modals/modal-keys';
import { of } from 'rxjs';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { Task } from '../models/task';
import { AddEditTaskComponent } from '../components/modals/add-edit-task/add-edit-task.component';

describe('ModalesService', () => {
  let service: ModalsService;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalsService,
        MatDialog
      ],
      imports: [MatDialogModule]
    });
    service = TestBed.inject(ModalsService);
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should push modal', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const dialogSpy = spyOn(matDialogSpy, 'open').and.returnValue(dialogRefSpyObj);
    const testText: string = "Test service example"
    service.pushModal<string, boolean>(ModalsKeys.confirmation, testText);
    expect(service.modalCount).toBe(1);
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmationComponent, { disableClose: true, data: testText });
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should push expected modal with data', () => {
    const dialogSpy = spyOn(matDialogSpy, 'open');
    const testText: string = "Test service example"
    service.pushModal<string, boolean>(ModalsKeys.confirmation, testText);
    expect(service.modalCount).toBe(1);
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmationComponent, { disableClose: true, data: testText });
    expect(dialogSpy).toHaveBeenCalled();
    const taskMock: Task = new Task("Test");
    service.pushModal<Task, void>(ModalsKeys.addEditTask, taskMock);
    expect(dialogSpy).toHaveBeenCalledWith(AddEditTaskComponent, { disableClose: true, data: taskMock });
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should remove every modal  using popToRoot', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ close: null });
    const dialogSpy = spyOn(matDialogSpy, 'open').and.returnValue(dialogRefSpyObj);
    const modal1 = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test');
    const modal2 = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test2');
    const modal3 = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test3');
    const modal4 = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test4');
    expect(service.modalCount).toBe(4);
    expect(dialogSpy).toHaveBeenCalledTimes(4);
    service.popToRoot();
    expect(modal1.close).toHaveBeenCalled();
    expect(modal2.close).toHaveBeenCalled();
    expect(modal3.close).toHaveBeenCalled();
    expect(modal4.close).toHaveBeenCalled();
    expect(service.modalCount).toBe(0);
  });

  it('should close a single modal using popModal', () => {
    const testText: string = "Test service example"
    const modal = service.pushModal<string, boolean>(ModalsKeys.confirmation, testText);
    const close = spyOn(modal, 'close');
    service.popModal();
    expect(close).toHaveBeenCalled();
  });

  it('should close the last modal using popModal', () => {
    const fisrtMatDialogRef = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const secondMatDialogRef = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const lastMatDialogRef = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const dialogSpy = spyOn(matDialogSpy, 'open').and.returnValues(fisrtMatDialogRef, secondMatDialogRef, lastMatDialogRef);

    const firstModal = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test');
    const secondModal = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test2');
    const lastModal = service.pushModal<string, boolean>(ModalsKeys.confirmation, 'test3');

    expect(service.modalCount).toBe(3);
    expect(dialogSpy).toHaveBeenCalledTimes(3);
    service.popModal();
    expect(firstModal.close).not.toHaveBeenCalled();
    expect(secondModal.close).not.toHaveBeenCalled();
    expect(lastModal.close).toHaveBeenCalled();
    expect(service.modalCount).toBe(2);

  });

  it('Should return value', () => {
    const mockMatDialogRef = jasmine.createSpyObj({ afterClosed: of({}), close: of({}) });
    const result = true;
    service['modals'] = [mockMatDialogRef];
    mockMatDialogRef.close.and.returnValue(result);
    service.popModal();
    expect(mockMatDialogRef.close).toHaveBeenCalledTimes(1);
    expect(service.modalCount).toBe(0);
  });

  it('Should do nothing since there is not modals instanced', () => {
    const mockMatDialogRef = jasmine.createSpyObj({ afterClosed: of({}), close: of({}) });
    mockMatDialogRef.close.and.returnValue();
    service.popModal();
    expect(mockMatDialogRef.close).toHaveBeenCalledTimes(0);
    expect(service.modalCount).toBe(0);
  });
  it('should not found any component', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
    const dialogSpy = spyOn(matDialogSpy, 'open').and.returnValue(dialogRefSpyObj);
    const testText: string = "Test service example"
    service.pushModal<string, boolean>(ModalsKeys.confirmation, testText);
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmationComponent, { disableClose: true, data: testText });
    expect(dialogSpy).toHaveBeenCalled();
  });

});
