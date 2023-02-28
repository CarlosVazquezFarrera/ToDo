import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';

const routes: Routes = [
  { path: '**', redirectTo: 'activities' },
  { path: 'activities', component: ActivitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
