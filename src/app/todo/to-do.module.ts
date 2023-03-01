import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { InfoComponent } from './info/info.component';



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
export class ToDoModule { }
