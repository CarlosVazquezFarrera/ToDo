import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ModalsService } from 'src/app/services/modals.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalsKeys } from 'src/app/components/modals/modal-keys';
import { By } from '@angular/platform-browser';
import { AddEditTaskComponent } from 'src/app/components/modals/add-edit-task/add-edit-task.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let modalService: jasmine.SpyObj<ModalsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatDialogModule],
      providers: [
        ModalsService
      ],
      declarations: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(ModalsService) as jasmine.SpyObj<ModalsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display add or edit modal', () => {
    const pushModalSpy = spyOn(modalService, 'pushModal');
    component.addTask();
    const addEditTask = fixture.debugElement.query(By.directive(AddEditTaskComponent));
    expect(pushModalSpy).toHaveBeenCalled();
    expect(pushModalSpy).toHaveBeenCalledWith(ModalsKeys.addEditTask);
    expect(addEditTask).toBeDefined();
  });

});
