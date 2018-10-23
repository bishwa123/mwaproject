import { Injectable } from '@angular/core';
import { ConfigService } from '../../../common/services/host.service';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private configService: ConfigService, private http: HttpClient) {

   }
   getStudents(){
    return this.http.get(this.configService.BASE_API_URL+'student');
   }
}
