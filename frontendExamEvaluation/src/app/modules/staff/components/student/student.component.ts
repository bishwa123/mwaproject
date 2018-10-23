import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';

declare let swal;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students:any;
  isLoaded=false;
  constructor(private staffService: StaffService) { }

  ngOnInit() {
    this.staffService.getStudents().subscribe(data =>{
      console.log(data);
      if(data['status'] ==200){
        this.isLoaded = true;
        this.students = data['data'];
      }
      else{
        swal('Opps!!',data['message'],'error');
      }
    })
  }

}
