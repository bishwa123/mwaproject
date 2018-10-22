import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/components/footer/footer.component';

import { RoutingModule } from './common/modules/routing.module';
import { HomeModule } from './modules/home/home.module';
import { HeaderComponent } from './common/components/header/header.component';
import { StudentModule } from './modules/student/student.module';
import { StaffModule } from './modules/staff/staff.module';
import { BlurEventDirective } from './modules/student/directives/blur-event.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BlurEventDirective,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HomeModule,
    StudentModule,
    StaffModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
