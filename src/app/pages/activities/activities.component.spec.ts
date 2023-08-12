import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ListComponent } from 'src/app/components/tasks/list/list.component';
import { InfoComponent } from 'src/app/components/tasks/info/info.component';
import { Store } from '@ngrx/store';
import { ModalsService } from 'src/app/services/modals.service';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;
  const storeMock = {
    select() {
      return of([])
    }
  };
  const modalService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatSlideToggleModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ModalsService, useValue: modalService }
      ],
      declarations: [ActivitiesComponent, FooterComponent, ListComponent, InfoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
