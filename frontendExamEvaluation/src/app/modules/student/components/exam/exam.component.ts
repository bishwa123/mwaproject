import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { detect } from 'detect-browser';
import {NgForm} from '@angular/forms';

import { timer, Subscription } from 'rxjs';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  time = 7200;
  hours:number;
  minutes:number;
  seconds:number;
  isLoaded: boolean = false;
  timerSubscriber:Subscription;
  exam = {
    'studentid': String,
    questions: [
      {
        // 'id': String,
        "category": String,
        'question': String,
        'answer': '',
        'timespent': '',
        'timeoffbrowser': '',
        'snapshots': [],
        'accepted': false

      },
      {
        // 'id': String,
        "category": String,
        'question': String,
        'answer': '',
        'timespent': '',
        'timeoffbrowser': '',
        'snapshots': [],
        'accepted': false
      },
      {
        // 'id': String,
        "category": String,
        'question': String,
        'answer': '',
        'timespent': '',
        'timeoffbrowser': '',
        'snapshots': [],
        'accepted': false
      }
    ]
  }
  constructor(private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) { }


  ngOnInit() {
    let browser = detect();
    if (typeof browser != "undefined" && browser.name == 'chrome') {
      this.currentRoute.params.subscribe(params => {
        this.studentService.validateTokenandGetQuestions(params['token']).subscribe(data => {
          if (data['status'] == '200') {
            this.isLoaded = true;
            this.exam.studentid = data['message'];
            let i = 0;
            data['data'].forEach(x => {
              this.exam.questions[i] = {
                category: x['category'],
                question: x['question'],
                answer: '',
                timespent: '',
                timeoffbrowser: '',
                snapshots: [],
                accepted: false

              }
              i++;
            })
           // let timer = Observable.timer(2000,1000);
           this.startTimer();
          }
          else {
            this.route.navigate(['/']);
          }
        });
      });
    }
    else {
      alert("You can give exam only in chrome browser");
    }
  }
startTimer(){
 this.timerSubscriber = timer(0,1000).subscribe(t=>{
    let counter = this.time-t;
    this.minutes =Math.floor(counter/60);
    this.seconds = counter%60;
    if(counter<0){
      this.isLoaded = false;
      this.timerSubscriber.unsubscribe();
      alert('Oops!! You ran out of time.')
    }
  });
}
  submitExam(form:NgForm) {
    console.log(form);
    this.studentService.submitExamService(this.exam).subscribe(data => {
      console.log(data);
    });
  }
  ngOnDestroy(){
    this.timerSubscriber.unsubscribe();
  }

}
