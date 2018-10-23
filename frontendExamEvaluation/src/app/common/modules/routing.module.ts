import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from '../../modules/home/components/connect/connect.component';
import { StudentHomeComponent } from '../../modules/student/components/student-home/student-home.component';
import { StaffHomeComponent } from 'src/app/modules/staff/components/staff-home/staff-home.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: ConnectComponent
    },
    {
        path: 'admin',
        loadChildren: '../../modules/admin/admin.module#AdminModule'
    },
    {
        path: 'staff',
        loadChildren: '../../modules/staff/staff.module#StaffModule'
    },
    {
        path: 'student',
        loadChildren: '../../modules/student/student.module#StudentModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }