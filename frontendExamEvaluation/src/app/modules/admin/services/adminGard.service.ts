import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AccessSerivce } from './access.service';
import { TokenService } from 'src/app/common/services/token.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AdminGuardService implements CanActivate {
  
  constructor(private router: Router, private accessSerivce: AccessSerivce, private tokenService: TokenService) {}

  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    let access_token = { token: this.tokenService.getToken() }
    if(access_token.token) {
        return this.accessSerivce.checkAdminAccess(JSON.stringify(access_token))
            .pipe(map((response:any) => {
                    if (response.data) {
                        return true;
                    }else{
                      this.router.navigateByUrl('/staff');
                      return false;
                    }
                }));
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable()
export class AdminGuard2Service implements CanActivateChild {
  
  constructor(private router: Router, private accessSerivce: AccessSerivce, private tokenService: TokenService) {}

  canActivateChild(): Observable<boolean>|Promise<boolean>|boolean {
    let access_token = { token: this.tokenService.getToken() }
    if(access_token.token) {
        return this.accessSerivce.checkAdminAccess(JSON.stringify(access_token))
            .pipe(map((response:any) => {
                    if (response.data) {
                        return true;
                    }
                    console.log("here2");
                    this.router.navigateByUrl('/staff');
                    return false;
                }));
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}