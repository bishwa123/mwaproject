import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { detect } from 'detect-browser';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer, Subscription, Observable } from 'rxjs';
import { BlurEventDirective } from '../../directives/blur-event.directive';
import { debounceTime } from 'rxjs/operators';

declare let swal: any;
@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  isLoaded: boolean = false;
  examForm: FormGroup
  time = 7200;
  hours: number;
  minutes: number;
  seconds: number;
  timerSubscriber: Subscription;
  answer1Subscriber: Subscription;
  answer2Subscriber: Subscription;
  answer3Subscriber: Subscription;
  getQuesSubsrciber: Subscription;
  
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
  constructor(private fb: FormBuilder, private currentRoute: ActivatedRoute, private studentService: StudentService,
    private route: Router) {
    this.examForm = this.fb.group({
      'answer1': ['', Validators.required],
      'question2': '',
      'question3': '',
      'question1': '',
      'answer2': ['', Validators.required],
      'answer3': ['', Validators.required]

    });
  }

  ngOnInit() {
    let browser = detect();
    if (typeof browser != "undefined" && browser.name == 'chrome') {
      this.currentRoute.params.subscribe(params => {
        console.log('param'+params['token']);
      this.getQuesSubsrciber =  this.studentService.validateTokenandGetQuestions(params['token']).subscribe(data => {
          if (data['status'] == '200') {
            this.isLoaded = true;
            this.exam.studentid = data['message'];
            let dQuestions = [...data['data']];
            this.examForm.setValue({
              'question1': dQuestions[0].question,
              'answer1': '',
              'question2': dQuestions[1].question,
              'answer2': '',
              'question3': dQuestions[2].question,
              'answer3': ''

            });
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
            this.subscribeAnswers();
          }
          else {
            swal('Oops!!',data['message'],'error');
            this.route.navigate(['/']);
          }
        });
      });
    }
    else {
      swal('Opps',"You can give exam only in chrome browser",'error');
    }
  }
  subscribeAnswers(){
   this.answer1Subscriber = this.examForm.get('answer1').valueChanges.pipe(debounceTime(2000)
    ).subscribe(x=>{
     this.exam.questions[0].snapshots.push(x);
     console.log("a "+x);
   })
   this.answer2Subscriber = this.examForm.get('answer2').valueChanges.pipe(debounceTime(2000)
   ).subscribe(x=>{
    this.exam.questions[1].snapshots.push(x);
   })
   this.answer3Subscriber =  this.examForm.get('answer3').valueChanges.pipe(debounceTime(2000)
   ).subscribe(x=>{
    this.exam.questions[2].snapshots.push(x);
   })
  }
  startTimer() {
    this.timerSubscriber = timer(0, 1000).subscribe(t => {
      let counter = this.time - t;
      this.minutes = Math.floor(counter / 60);
      this.seconds = counter % 60;
      if (counter < 0) {
        this.isLoaded = false;
        this.timerSubscriber.unsubscribe();
        swal('Oops!!', 'You ran out of time.','error');
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.exam.questions[0].answer = form.value.answer1
    this.exam.questions[1].answer = form.value.answer2
    this.exam.questions[2].answer = form.value.answer3
    console.log(this.exam);
    this.studentService.submitExamService(this.exam).subscribe((data) => {
      if(data['status'] == '200'){
        this.examForm.reset();
        this.isLoaded = false;
      swal('Congratulation','Your exam has been submitted','success');
      }
      else
      swal('Opps!!',data['message'],'error');
    });
  }
  ngOnDestroy() {
    if(this.timerSubscriber)
    this.timerSubscriber.unsubscribe();
    if(this.answer1Subscriber)
    this.answer1Subscriber.unsubscribe();
    if(this.answer2Subscriber)
    this.answer2Subscriber.unsubscribe();
    if( this.answer3Subscriber)
    this.answer3Subscriber.unsubscribe();
    if(this.getQuesSubsrciber)
    this.getQuesSubsrciber.unsubscribe();
  }
}
