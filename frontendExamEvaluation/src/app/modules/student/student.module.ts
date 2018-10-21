import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { FooterStudentComponent } from './components/footer-student/footer-student.component';
import { HeaderStudentComponent } from './components/header-student/header-student.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StudentHomeComponent, FooterStudentComponent, HeaderStudentComponent]
})
export class StudentModule { }
