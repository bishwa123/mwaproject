import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  questions: any;
  private subscriber: any;
  constructor(private service: QuestionsService) { }

  ngOnInit() {
    this.subscriber = this.service.getQuestions().subscribe(
        (response: any) => {
          if(response.status == 200) {
              this.questions = response.data
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
