import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { QuestionComponent } from './components/question/question.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffComponent } from './components/staff/staff.component';
import { ReviewComponent } from './components/review/review.component';
import { ResultComponent } from './components/result/result.component';
import { QuestionsService } from './services/questions.service';
import { StaffService } from './services/staff.service';
import { AdminGuardService, AdminGuard2Service } from './services/adminGard.service';
import { AccessSerivce } from './services/access.service';
import { ReviewService } from './services/review.service';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { JwtInterceptor } from 'src/app/common/services/interceptor.service';

const ADMIN_ROUTES: Routes = [
  {
      path: '',
      component: AdminHomeComponent,
      canActivate: [AdminGuardService],
      canActivateChild: [AdminGuard2Service],
      children: [
          { 
            path: "questions_list", 
            component: QuestionsListComponent 
          },
          { 
            path: "question", 
            component: QuestionComponent 
          },
          { 
            path: "question/:id", 
            component: QuestionComponent 
          },
          { 
            path: "staff_list", 
            component: StaffListComponent 
          },
          { 
            path: "staff", 
            component: StaffComponent 
          },
          { 
            path: "staff/:id", 
            component: StaffComponent 
          },
          { 
            path: "review", 
            component: ReviewComponent 
          },
          { 
            path: "review/:id", 
            component: EditReviewComponent 
          },
          { 
            path: "result", 
            component: ResultComponent 
          }
      ]
  }
];

@NgModule({
  declarations: [
    AdminHomeComponent, 
    HeaderAdminComponent, 
    FooterAdminComponent,
    QuestionsListComponent,
    QuestionComponent,
    StaffListComponent,
    StaffComponent,
    ReviewComponent,
    EditReviewComponent,
    ResultComponent,
    EditReviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  providers: [
    QuestionsService, 
    StaffService, 
    AdminGuardService, 
    AdminGuard2Service, 
    AccessSerivce,
    ReviewService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AdminModule { }
