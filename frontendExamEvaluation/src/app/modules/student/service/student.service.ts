import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  token:string ='12';
  configUrl:string ='http://localhost:3001/api/v1';
  validateTokenAndGetQuestionsUrl:string =this.configUrl+'/questions/validatetokenandgetquestions'
  addExamReportUrl:string = this.configUrl+'/student/'
  constructor(private http: HttpClient) { }

  validateTokenandGetQuestions(token:string){
    // const validatePromise = new Promise((resolve, reject)=>{
    //   console.log(this.token);
    //   if(token === this.token)
    //   resolve(true);
    //   else
    //   reject(false);
    // });
    // return validatePromise;
    return this.http.get(this.validateTokenAndGetQuestionsUrl+"/"+12);
  }
  submitExamService(report){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.patch(this.addExamReportUrl+report.studentid, {date:Date.now(), questions:report.questions}, httpOptions)
  }
}
