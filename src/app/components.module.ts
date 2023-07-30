import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { MenuComponent } from './shared/menu/menu.component';
import { SharedModule } from './shared.module';
import { CompletedComponent } from './pages/completed/completed.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActivitiesComponent,
    MenuComponent,
    CompletedComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActivitiesComponent,
    MenuComponent,
    CompletedComponent
  ]
})
export class ComponentsModule { }
