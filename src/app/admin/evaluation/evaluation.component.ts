import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { EvaluationService } from '../../services/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
  encapsulation: ViewEncapsulation.None,
  
})
export class EvaluationComponent implements OnInit {
  starsCount:number=2.5;
  feedback3Arr: any;
  feedback2Arr: any;
  feedback1Arr: any;
  questions7Arr: any;
  questions5Arr: any;
  questions6Arr: any;
  questions4Arr: any;
  questions3Arr: any;
  questions2Arr: any;
  questions1Arr: any;
  subCategories1Arr: any;
  recommendationsArr:any;

  @ViewChild('evalTabs') evalTabs: TabsetComponent;
  public introductionArr = [0,2, 3, 5, 1, 0, 4, 2, 5];
  public QuestionTab1Arr = [5, 4, 3, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab2Arr = [4, 5, 5, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab3Arr = [2, 1, 4, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab4Arr = [3, 2, 0, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab5Arr = [5, 4, 3, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab6Arr = [2, 4, 5, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public QuestionTab7Arr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
  public recommendationsTabArr = [4, 5, 1, 5, 3, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 3, 4, 5];
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

  constructor(
    public evalService: EvaluationService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
  ) {

  }


  selectTab(tab_id: number) {
    this.evalTabs.tabs[tab_id].active = true;
  }

  ngOnInit() {
    this.getLabelsData();
    document.getElementById('test').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test').querySelector('div.tab-content').className = "tab-content col-md-11";
    document.getElementById('test1').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test1').querySelector('div.tab-content').className = "tab-content col-md-11";
  }

  getLabelsData() {
    let testData = { "candidateId": 8, "evaluationType": "start" };
    this.evalService.getQuestionLabels(testData).subscribe(
      (result) => {
        if (result.status) {
          this.subCategories1Arr = result.questions.subcategories_1;
          this.questions1Arr = result.questions.subcategories_2;
          this.questions2Arr = result.questions.subcategories_3;
          this.questions3Arr = result.questions.subcategories_4;
          this.questions4Arr = result.questions.subcategories_5;
          this.questions5Arr = result.questions.subcategories_6;
          this.questions6Arr = result.questions.subcategories_7;
          this.questions7Arr = result.questions.subcategories_8;
          this.recommendationsArr = result.questions.subcategories_9;
          this.feedback1Arr = result.questions.subcategories_10;
          this.feedback2Arr = result.questions.subcategories_11;
          this.feedback3Arr = result.questions.subcategories_12;
        }
      },
      error => {
        this.toasterService.error("Error in fetching settings details");
      }
    );
  }

  myOnChange(e, ee) {
  }
  testChange(e) {
  }
  onstartchange(e) {
  }

}
