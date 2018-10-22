import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  staffMembers: any;
  private subscriber: any;
  constructor(private service: StaffService) { }

  ngOnInit() {
    this.subscriber = this.service.getStaffMembers().subscribe(
        (response: any) => {
          if(response.status == 200) {
              this.staffMembers = response.data
          } else {
              console.log(response.message);
          }
        }
      ,(err) => { console.log(err) },() => {}
    );
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
