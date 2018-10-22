import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/components/footer/footer.component';

import { RoutingModule } from './common/modules/routing.module';
import { HomeModule } from './modules/home/home.module';
import { HeaderComponent } from './common/components/header/header.component';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { StuffModule } from './modules/stuff/stuff.module';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';
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
    AdminModule,
    StuffModule,
    StudentModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
