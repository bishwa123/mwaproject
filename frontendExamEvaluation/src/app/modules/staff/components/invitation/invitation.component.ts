import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { Subscription } from 'rxjs';
declare let swal;
@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  students:any[];
  isLoaded=false;
  subscriberInvitation:Subscription = null;
  constructor(private staffService: StaffService) { }

  ngOnInit() {
     this.staffService.getStudentsWithInvitations().subscribe(data =>{
      console.log('ttt: ', data);
      if(data['status'] ==200){
        this.isLoaded = true;
        this.students = data['data'];
      }
      else{
        swal('Opps!!',data['message'],'error');
      }
    })
  }
ngOnDestroy(){
  if(this.subscriberInvitation)
  this.subscriberInvitation.unsubscribe();
}
}
