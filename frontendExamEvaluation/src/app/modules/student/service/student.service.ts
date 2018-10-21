import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  token:string ='12';
  validateTokenAndGetQuestionsUrl:string ='http://localhost:3001/api/v1/questions/validatetokenandgetquestions'
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
    console.log(token)
    return this.http.get(this.validateTokenAndGetQuestionsUrl+"/"+token);
  }
}
