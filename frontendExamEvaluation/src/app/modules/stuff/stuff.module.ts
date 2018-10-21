import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuffHomeComponent } from './components/stuff-home/stuff-home.component';
import { HeaderStuffComponent } from './components/header-stuff/header-stuff.component';
import { FooterStuffComponent } from './components/footer-stuff/footer-stuff.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StuffHomeComponent, HeaderStuffComponent, FooterStuffComponent]
})
export class StuffModule { }
