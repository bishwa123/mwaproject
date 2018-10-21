import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token:string ='12';
  constructor() { }

  validateToken(token:string){
    const validatePromise = new Promise((resolve, reject)=>{
      console.log(this.token);
      if(token === this.token)
      resolve(true);
      else
      reject(false);
    });
    return validatePromise;
  }
}
