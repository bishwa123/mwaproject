import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../../services/questions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let swal: any;

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question_id: string;
  questionForm: FormGroup;
  control: any;
  private subscriber_1: any;
  private subscriber_2: any;
  private subscriber_3: any;
  private subscriber_4: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: QuestionsService, private router: Router) {
      this.questionForm = fb.group({
          'category': ['', Validators.required],
          'question': ['', Validators.required],
          'active': ['', Validators.required]
      });
      this.control = this.questionForm.controls;
  }

  ngOnInit() {
    this.subscriber_1 = this.route.params.subscribe(params => {
      this.question_id = params['id'];
    });
    if(this.question_id) {
      this.subscriber_2 = this.service.getQuestion(this.question_id).
        subscribe( (response:any) => {
          if(response.status == 200) {
              response.data = response.data[0];
              this.questionForm.setValue({
                category: response.data.category,
                question: response.data.question,
                active: response.data.active
              });
          } else {
              console.log(response.message);
          }
        }, (error)=>{console.log(error)}, () => {});
    }
  }

  onSubmit() {
    if(this.question_id) {
      this.subscriber_3 = this.service.updateQuestion(this.question_id, JSON.stringify(this.questionForm.value))
      .subscribe((response: any) => {
          if(response.status == 200) {
            swal("Done!", "Question updated!", "success");
            this.router.navigate(['/admin/questions_list']);
          }else{
            swal("Sorry!", "An error occured", "error");
          }
        },
        (error) => { console.log(error), () => {}}
      );
    }else{
      this.subscriber_4 = this.service.addQuestion(JSON.stringify(this.questionForm.value))
      .subscribe((response: any) => {
          if(response.status == 200) {
            swal("Done!", "The question has been added!", "success");
            this.router.navigate(['/admin/questions_list']);
          }else{
            swal("Sorry!", "An error occured", "error");
          }
        },
        (error) => { console.log(error), () => {}}
      );
    }
  }

  ngOnDestroy() {
    if(this.subscriber_1) this.subscriber_1.unsubscribe();
    if(this.subscriber_2) this.subscriber_2.unsubscribe();
    if(this.subscriber_3) this.subscriber_3.unsubscribe();
    if(this.subscriber_4) this.subscriber_4.unsubscribe();
  }
}
