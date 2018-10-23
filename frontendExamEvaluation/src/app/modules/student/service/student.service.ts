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
    return this.http.get(this.validateTokenAndGetQuestionsUrl+"/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiOTg5NzYiLCJuYW1lIjoiTWljaGVhbCIsImVudHJ5IjoiT2N0b2JlciIsImRhdGVfb2ZfYmlydGgiOiIxOTg5LTEwLTIwVDE5OjAxOjI0LjIyNFoiLCJpYXQiOjE1NDAzMTI0NDYsImV4cCI6MTU0MDM5ODg0Nn0.Eo46E53q-LYx5AGzTRo_I-CYIvh7vFkNhPAAChkw1zo");
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
