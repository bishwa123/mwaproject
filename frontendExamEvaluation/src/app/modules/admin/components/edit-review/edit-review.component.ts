import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare let swal: any;

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  reviewForm: FormGroup;
  control: any;
  review_id: any;
  review: any;
  subscriber_1: any;
  subscriber_2: any;
  subscriber_3: any;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: ReviewService) {
    this.reviewForm = fb.group({
      'question1': ['', Validators.required],
      'question2': ['', Validators.required],
      'question3': ['', Validators.required],
      'result': ['', Validators.required],
      'publish': ['', Validators.required]
    });
    this.control = this.reviewForm.controls;
  }

  ngOnInit() {
      this.subscriber_1 = this.route.params.subscribe(params => {
        this.review_id = params['id'];
      });
      if(this.review_id) {
        this.subscriber_2 = this.service.getStudentReport(this.review_id)
          .subscribe( (response:any) => {
              if(response.status == 200) {
                  this.review = response.data[0];
                  this.reviewForm.setValue({
                    question1: this.review.reports[0].questions[0].accepted,
                    question2: this.review.reports[0].questions[1].accepted,
                    question3: this.review.reports[0].questions[2].accepted,
                    result: this.review.result,
                    publish: this.review.published,
                  });
              } else {
                  console.log(response.message);
              }
            }, (error)=>{console.log(error)}, () => {});
      }
  }

  onSubmit() {
    if(this.review_id) {
      let body = { 
        ...this.reviewForm.value, 
        report_id: this.review.reports[0]._id
      }
      this.subscriber_3 = this.service.updateStudentReport(this.review_id, JSON.stringify(body))
      .subscribe((response: any) => {
          if(response.status == 200) {
            swal("Done!", "Review submitted!", "success");
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
  }

}
