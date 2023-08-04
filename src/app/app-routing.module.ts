import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { AppRoutes } from './app-routing-key';
import { CompletedComponent } from './pages/completed/completed.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.task.route, pathMatch: 'full' },
  { path: AppRoutes.task.route, component: ActivitiesComponent },
  { path: AppRoutes.completed.route, component: CompletedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
