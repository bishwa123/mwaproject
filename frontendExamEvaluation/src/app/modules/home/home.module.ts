import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './components/connect/connect.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';
import {  ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@Angular/common/http';

@NgModule({
  imports: [
   CommonModule, 
   ReactiveFormsModule,
   HttpClientModule  

  ],
  declarations: [ConnectComponent, HeaderHomeComponent, FooterHomeComponent],
  providers:[]
})
export class HomeModule { }
