import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  students: any;
  private subscriber: any;
  constructor(private service: ReviewService) { }

  ngOnInit() {
      this.subscriber = this.service.getPublishedResults().subscribe(
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
