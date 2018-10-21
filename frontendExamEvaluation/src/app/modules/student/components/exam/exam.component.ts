import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  isLoaded: boolean = false;
  test="bisha"
  questions = [
    {
      'id': String,
      "category": String,
      'active': String,
      'question': String,
      'created_at': Date,
      'updated_at': Date,
      'answer':''
    },
    {
      'id': String,
      "category": String,
      'active': String,
      'question': String,
      'created_at': Date,
      'updated_at': Date,
      'answer':''
    },
    {
      'id': String,
      "category": String,
      'active': String,
      'question': String,
      'created_at': Date,
      'updated_at': Date,
      'answer':''
    }
  ]
  constructor(private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(params => {
      this.studentService.validateTokenandGetQuestions(params['token']).subscribe(data => {
        if (data['status'] == '200') {
          this.isLoaded = true;
          this.questions = data['data'];
          let i =0;
          this.questions.forEach(x => {
            this.questions[i] = {
              id: x['_id'],
              category: x['category'],
              active: x['active'],
              question: x['question'],
              created_at: x['created_at'],
              updated_at: x['updated_at'],
              answer:''
            }
            i++;
          })
        }
        else {
          this.route.navigate(['/']);
        }
      });
    });
  }

}
