import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../service/staff.service';
import { Subscription } from 'rxjs';
declare let swal;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students:any[];
  isLoaded=false;
  getStudentSubscriber: Subscription;
  constructor(private staffService: StaffService) { }

  ngOnInit() {
  this.getStudentSubscriber =  this.staffService.getStudentsWithoutInvitations().subscribe(data =>{
      console.log('as: ',data);
      if(data['status'] ==200){
        this.isLoaded = true;
        this.students = data['data'];
      }
      else{
        swal('Opps!!',data['message'],'error');
      }
    })
  }
  sendInvitation(id){
   let student = this.students.filter(stu => stu._id == id);
   if(student){
     let reqBody ={
        student_id: student[0]._id,
        name: student[0].name,
        entry: student[0].entry,
        date_of_birth: student[0].date_of_birth
     }
     this.staffService.sendInvitation(reqBody).subscribe(data=>{
       if(data['status'] ==200){
        swal('Success','Invitation sent for '+ data['message'],'success');
       }
       else{
        swal('Opps',data['message'],'error');
       }
     });
   }
   else{
     swal('Opps!!',"No id for student",'error');
   }
  }
ngOnDestroy(){
  if(this.getStudentSubscriber)
  this.getStudentSubscriber.unsubscribe();
}
}
