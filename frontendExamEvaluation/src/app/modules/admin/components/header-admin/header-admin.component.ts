import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../../../common/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor(private service: TokenService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.service.signOut();
    this.router.navigate(['/']);
  }

}
