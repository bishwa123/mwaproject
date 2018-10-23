import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from "../../../common/services/host.service";



@Injectable()
export class ReviewService {
    constructor(private config: ConfigService, private http: HttpClient){}
    getStudents(){
        return this.http.get(this.config.BASE_API_URL+"student/unpublished");
    }
    getStudentReport(id:string){
        return this.http.get(this.config.BASE_API_URL+"student/"+id);
    }
    updateStudentReport(id, body) {
        return this.http.patch(this.config.BASE_API_URL+"student/edit/"+id, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    getPublishedResults() {
        return this.http.get(this.config.BASE_API_URL+"student/published");
    }
}