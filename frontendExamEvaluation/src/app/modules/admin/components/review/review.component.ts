import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  students: any;
  private subscriber: any;
  constructor(private service: ReviewService) { }

  ngOnInit() {
      this.subscriber = this.service.getStudents().subscribe(
          (response: any) => {
            if(response.status == 200) {
                this.students = response.data
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
