import { Injectable } from "@angular/core";
import { ConfigService } from "src/app/common/services/host.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class StaffService {
    constructor(private config: ConfigService, private http: HttpClient){}
    
    getStaffMembers(){
        return this.http.get(this.config.BASE_API_URL+"staff");
    }
    getStaffMember(id:string){
        return this.http.get(this.config.BASE_API_URL+"staff/"+id);
    }
    updateStaffMember(id, body) {
        return this.http.patch(this.config.BASE_API_URL+"staff/"+id, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    addStaffMember(body) {
        return this.http.post(this.config.BASE_API_URL+"staff", body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}