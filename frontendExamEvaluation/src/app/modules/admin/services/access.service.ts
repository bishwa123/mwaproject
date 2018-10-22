import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "src/app/common/services/host.service";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class AccessSerivce {
    constructor(private http: HttpClient, private configService: ConfigService){}
    checkAdminAccess(body) {
        return this.http.post(this.configService.BASE_API_URL+"auth/admincheck", body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}