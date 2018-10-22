import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from "src/app/common/services/host.service";

@Injectable({
    providedIn: 'root'
  })
  export class ConnectService {
    constructor(private http: HttpClient, private config: ConfigService) { }

    login(body) {
        return this.http.post(this.config.BASE_API_URL+"auth/login", body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
  }