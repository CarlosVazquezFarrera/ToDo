import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    AddEditTaskComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[AddEditTaskComponent]
})
export class ModalsModule { }
