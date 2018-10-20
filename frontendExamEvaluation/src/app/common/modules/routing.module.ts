import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from '../../modules/home/components/connect/connect.component';
import { AdminHomeComponent } from 'src/app/modules/admin/components/admin-home/admin-home.component';
import { StuffHomeComponent } from 'src/app/modules/stuff/components/stuff-home/stuff-home.component';
import { StudentHomeComponent } from 'src/app/modules/student/components/student-home/student-home.component';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: ConnectComponent
    },
    {
        path: 'admin',
        component: AdminHomeComponent
    },
    {
        path: 'stuff',
        component: StuffHomeComponent
    },
    {
        path: 'student',
        component: StudentHomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }