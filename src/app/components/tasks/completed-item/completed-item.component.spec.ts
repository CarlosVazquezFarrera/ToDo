import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedItemComponent } from './completed-item.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

describe('CompletedItemComponent', () => {
  let component: CompletedItemComponent;
  let fixture: ComponentFixture<CompletedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatIconModule],
      declarations: [ CompletedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
