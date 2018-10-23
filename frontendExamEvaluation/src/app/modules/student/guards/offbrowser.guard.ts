import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentHomeComponent } from '../components/student-home/student-home.component';
import { ExamComponent } from '../components/exam/exam.component';
import { ExamsComponent } from '../components/exams/exams.component';

@Injectable()
export class OffbrowserGuard implements CanDeactivate<StudentHomeComponent> {
  canDeactivate(
    component: StudentHomeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    console.log("guard");
    return confirm('Are you sure');
  }
}
