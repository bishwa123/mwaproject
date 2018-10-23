import { Injectable } from '@angular/core';
import { ConfigService } from '../../../common/services/host.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private configService: ConfigService, private http: HttpClient) {

   }
   getStudentsWithoutInvitations(){
    return this.http.get(this.configService.BASE_API_URL+'staff/student/notinvited');
   }
   sendInvitation(reqBody){
    return this.http.post(this.configService.BASE_API_URL+"staff/generatetoken", reqBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
  });
   }
   getStudentsWithInvitations(){
    return this.http.get(this.configService.BASE_API_URL+'staff/student/invited');
   }
}
