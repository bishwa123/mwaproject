import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { QuestionComponent } from './components/question/question.component';
import { StuffListComponent } from './components/stuff-list/stuff-list.component';
import { AddStuffComponent } from './components/add-stuff/add-stuff.component';
import { ReviewComponent } from './components/review/review.component';
import { ResultComponent } from './components/result/result.component';
import { QuestionsService } from './services/questions.service';

const ADMIN_ROUTES: Routes = [
  {
      path: '',
      component: AdminHomeComponent,
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
            path: "stuff_list", 
            component: StuffListComponent 
          },
          { 
            path: "add_stuff", 
            component: AddStuffComponent 
          },
          { 
            path: "review", 
            component: ReviewComponent 
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
    StuffListComponent,
    AddStuffComponent,
    ReviewComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ],
  providers: [QuestionsService]
})
export class AdminModule { }
