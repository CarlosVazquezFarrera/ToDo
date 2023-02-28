import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { FooterComponent } from './footer/footer.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AddComponent,
    FooterComponent,
    ItemComponent,
    ListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToDoModule { }
