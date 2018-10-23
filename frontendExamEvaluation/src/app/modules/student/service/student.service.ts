import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../../common/services/host.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private configService: ConfigService, private http: HttpClient) {}

  validateTokenandGetQuestions(token:string){
    return this.http.get(this.configService.BASE_API_URL+'questions/validatetokenandgetquestions/'+token);
  }
  submitExamService(report){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.patch(this.configService.BASE_API_URL +"student/"+report.studentid, {date:Date.now(), questions:report.questions}, httpOptions)
  }
}
