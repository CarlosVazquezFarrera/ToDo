import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';

import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompletedItemComponent } from './completed-item/completed-item.component';


@NgModule({
  declarations: [
    ItemComponent,
    ListComponent,
    InfoComponent,
    CompletedItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ItemComponent,
    ListComponent,
    InfoComponent,
    CompletedItemComponent
  ]
})
export class TasksModule { }
