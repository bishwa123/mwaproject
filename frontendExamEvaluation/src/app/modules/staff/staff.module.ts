import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import { HeaderStaffComponent } from './components/header-staff/header-staff.component';
import { FooterStaffComponent } from './components/footer-staff/footer-staff.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StaffHomeComponent, HeaderStaffComponent, FooterStaffComponent]
})
export class StaffModule { }
