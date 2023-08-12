import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponent } from './confirmation.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ModalsService } from 'src/app/services/modals.service';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;
  let debugElement: DebugElement;
  const matDialogData: string = 'Test text example';
  let text: HTMLElement;
  let modalService: jasmine.SpyObj<ModalsService> = jasmine.createSpyObj('ModalsService', ['popModal']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: matDialogData },
        { provide: ModalsService, useValue: modalService }
      ],
      declarations: [ConfirmationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the text accordingly', () => {
    expect(component).toBeTruthy();
    text = fixture.nativeElement.querySelector('.text');
    expect(text).toBeDefined();
    expect(text.textContent).toContain(matDialogData);
  });

  it('should confirm', () => {
    component.confirm();
    expect(modalService.popModal).toHaveBeenCalledWith(true);
  });
  it('should cancel', () => {
    component.cancel();
    expect(modalService.popModal).toHaveBeenCalledWith(false);
  });
});
