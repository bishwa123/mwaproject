import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';

declare let swal: any;

@Component({
  selector: 'staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff_id: string;
  staffForm: FormGroup;
  control: any;
  private subscriber_1: any;
  private subscriber_2: any;
  private subscriber_3: any;
  private subscriber_4: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: StaffService, private router: Router) { 
    this.staffForm = fb.group({
        'username': ['', Validators.required],
        'name': ['', Validators.required],
        'password': ['', Validators.required],
        'active': ['', Validators.required],
        'is_admin': ['', Validators.required]
    });
    this.control = this.staffForm.controls;
  }

  ngOnInit() {
    this.subscriber_1 = this.route.params.subscribe(params => {
      this.staff_id = params['id'];
    });
    if(this.staff_id) {
      this.subscriber_2 = this.service.getStaffMember(this.staff_id).
        subscribe( (response:any) => {
          if(response.status == 200) {
              this.staffForm.controls["username"].disable();
              this.staffForm.setValue({
                username: response.data.username,
                name: response.data.name,
                password: response.data.password,
                active: response.data.active,
                is_admin: response.data.is_admin
              });
          } else {
              console.log(response.message);
          }
        }, (error)=>{console.log(error)}, () => {});
    }
  }

  onSubmit() {
    if(this.staff_id) {
      this.subscriber_3 = this.service.updateStaffMember(this.staff_id, JSON.stringify(this.staffForm.value))
      .subscribe((response: any) => {
          if(response.status == 200) {
            swal("Done!", "Staff Memeber's data updated!", "success");
            this.router.navigate(['/admin/staff_list']);
          }else{
            swal("Sorry!", "An error occured", "error");
          }
        },
        (error) => { console.log(error), () => {}}
      );
    }else{
      this.subscriber_4 = this.service.addStaffMember(JSON.stringify(this.staffForm.value))
      .subscribe((response: any) => {
          if(response.status == 200) {
            swal("Done!", "The Staff Memeber has been added!", "success");
            this.router.navigate(['/admin/staff_list']);
          }else{
            swal("Sorry!", "An error occured", "error");
          }
        },
        (error) => { console.log(error), () => {}}
      );
    }
  }

  ngOnDestroy(): void {
    if(this.subscriber_1) this.subscriber_1.unsubscribe();
    if(this.subscriber_2) this.subscriber_2.unsubscribe();
    if(this.subscriber_3) this.subscriber_3.unsubscribe();
    if(this.subscriber_4) this.subscriber_4.unsubscribe();
  }
}
