import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { FooterStudentComponent } from './components/footer-student/footer-student.component';
import { HeaderStudentComponent } from './components/header-student/header-student.component';
import {StudentService} from './service/student.service';
import { ExamComponent } from './components/exam/exam.component';
import {FormsModule} from '@angular/forms'


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [StudentHomeComponent, FooterStudentComponent, HeaderStudentComponent, ExamComponent],
  providers:[StudentService]
})
export class StudentModule { }
