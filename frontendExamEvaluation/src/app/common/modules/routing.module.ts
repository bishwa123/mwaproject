import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from '../../modules/home/components/connect/connect.component';
import { AdminHomeComponent } from '../../modules/admin/components/admin-home/admin-home.component';
import { StuffHomeComponent } from '../../modules/stuff/components/stuff-home/stuff-home.component';
import { StudentHomeComponent } from '../../modules/student/components/student-home/student-home.component';

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
        path: 'stuff',
        component: StuffHomeComponent
    },
    {
        path: 'student',
        component: StudentHomeComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class RoutingModule { }