import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './components/connect/connect.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConnectComponent, HeaderHomeComponent, FooterHomeComponent]
})
export class HomeModule { }
