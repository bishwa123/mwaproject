import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import { HeaderStaffComponent } from './components/header-staff/header-staff.component';
import { FooterStaffComponent } from './components/footer-staff/footer-staff.component';
import {Router, Routes, RouterModule} from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { InvitationComponent } from './components/invitation/invitation.component'
import { StaffService } from './service/staff.service';
import { ConfigService } from '../../common/services/host.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../common/services/interceptor.service';

const STAFF_ROUTES: Routes = [
  {
    path: '',
    component: StaffHomeComponent,
    children:[
      {
        path: 'students',
         component: StudentComponent
      },
      {
        path: 'invitations',
        component: InvitationComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(STAFF_ROUTES)
  ],
  declarations: [StaffHomeComponent, HeaderStaffComponent, FooterStaffComponent, StudentComponent, InvitationComponent],
  providers:[StaffService, ConfigService,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class StaffModule { 

}
