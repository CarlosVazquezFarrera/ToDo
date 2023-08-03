import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTaskPipe } from './filter-task.pipe';



@NgModule({
  declarations: [FilterTaskPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterTaskPipe]
})
export class PipesModule { }
