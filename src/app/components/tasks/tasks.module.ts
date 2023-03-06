import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddComponent } from './add/add.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';

import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    AddComponent,
    ItemComponent,
    ListComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AddComponent,
    ItemComponent,
    ListComponent,
    InfoComponent
  ]
})
export class TasksModule { }
