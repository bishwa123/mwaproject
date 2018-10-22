import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/common/services/token.service';
import { ConnectService } from '../../services/connect.service';

declare let swal: any;

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
 
  loginForm : FormGroup;
  control: any;
  constructor(private formBuilder: FormBuilder, private connectService: ConnectService, private tokenService: TokenService, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
    this.control = this.loginForm.controls;
  }
  ngOnInit() {
  }

  onSubmit(){
    let user = {
      username: this.control.username.value,
      password: this.control.password.value
    }

    this.connectService.login(JSON.stringify(user)).subscribe((response:any)=>{
        if(response.status == 200 && response.data) {
            this.tokenService.saveToken(response.data);
            if(response.message) {
              this.router.navigateByUrl('/admin');
            }else{
              this.router.navigateByUrl('/staff');
            }
        }else{
          swal("Sorry!", response.message, "error");
        }
    });
  }
}
