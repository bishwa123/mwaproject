import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { Router} from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
 
  constructor(private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) { }

  ngOnInit() {

  }

}
