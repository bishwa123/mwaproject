import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { FooterStudentComponent } from './components/footer-student/footer-student.component';
import { HeaderStudentComponent } from './components/header-student/header-student.component';
import {StudentService} from './service/student.service';
import { ExamComponent } from './components/exam/exam.component';
import {FormsModule} from '@angular/forms';
import { ExamsComponent } from './components/exams/exams.component'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '../../../../node_modules/@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { OffbrowserGuard } from './guards/offbrowser.guard';
import {CodemirrorModule} from 'ng2-codemirror';

const STUDENT_ROUTES:Routes = [{
  path:'',
  component: StudentHomeComponent,
  children:[
    {
      path:':token',
      component: ExamsComponent
      
    }
  ]
}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(STUDENT_ROUTES),
    CodemirrorModule
  ],
  declarations: [StudentHomeComponent, FooterStudentComponent, HeaderStudentComponent, ExamComponent, ExamsComponent],
  providers:[StudentService, OffbrowserGuard]
})
export class StudentModule { }
