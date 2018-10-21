import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminHomeComponent, HeaderAdminComponent, FooterAdminComponent]
})
export class AdminModule { }
