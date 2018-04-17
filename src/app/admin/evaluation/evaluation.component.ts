import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EvaluationComponent implements OnInit {
  @ViewChild('evalTabs') evalTabs: TabsetComponent;
  public introductionArr = [2, 3, 5, 1, 0, 4, 2, 1];
  public QuestionTab1Arr = [5, 4, 3, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab2Arr = [4, 5, 5, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab3Arr = [2, 1, 4, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab4Arr = [3, 2, 0, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab5Arr = [5, 4, 3, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab6Arr = [2, 4, 5, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab7Arr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public recommendationsArr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public feedbackTab1Arr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public feedbackTab2Arr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public feedbackTab3Arr = [4, 5];
  someValue = 0;
  someKeyboardConfig: any = {
    connect: [true, false],
    start: 1,
    keyboard: true,  // same as [keyboard]="true"
    step: 1, // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 5
    }
  }

  public rating1Text = "Very Dissatisfied";
  public rating2Text = "Neutral";
  public rating3Text = "Good";
  public rating4Text = "Satisfied";
  public rating5Text = "Very Satisfied";
  public rating0Text = "None";

  public rating1Color = "red-bar";
  public rating2Color = "yellow-bar";
  public rating3Color = "blue-bar";
  public rating4Color = "orange-bar";
  public rating5Color = "green-bar";

  selectTab(tab_id: number) {
    this.evalTabs.tabs[tab_id].active = true;
  }

  ngOnInit() {
    document.getElementById('test').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test').querySelector('div.tab-content').className = "tab-content col-md-11";
    document.getElementById('test1').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test1').querySelector('div.tab-content').className = "tab-content col-md-11";
  }

  myOnChange(e, ee) {
  }
  testChange(e) {
  }
  onstartchange(e) {
  }

}
