import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddTaskComponent } from './add-task/add-task.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[AddTaskComponent]
})
export class ModalsModule { }
