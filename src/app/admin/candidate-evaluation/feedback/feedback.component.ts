import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: [],
  providers: [],
})
export class FeedbackComponent implements OnInit {

  candidate: any;
  feedback3Arr: any;
  feedback2Arr: any;
  feedback1Arr: any;

  public rating1Text = "Low";
  public rating2Text = "Medium";
  public rating3Text = "High";
  public rating4Text = "Satisfied";
  public rating5Text = "Very Satisfied";
  public rating0Text = "None";

  public rating1Color = "red-bar";
  public rating2Color = "orange-bar";
  public rating3Color = "green-bar";
  public rating4Color = "orange-bar";
  public rating5Color = "green-bar";

  @ViewChild('evalTabs') evalTabs: TabsetComponent;
  subCategories1Arr: any;
  someValue = 0;
  someKeyboardConfig: any = {
    connect: [true, false],
    start: 10,
    keyboard: true,  // same as [keyboard]="true"
    step: 1, // number of page steps, defaults to 10
    range: {
      min: 0,
      max: 3
    }
  }


  constructor(
    public evalService: EvaluationService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
  ) {

    this.candidate = route.snapshot.params['candidate'];
  }

  ngOnInit() {
    this.getLabelsData();
    document.getElementById('test1').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test1').querySelector('div.tab-content').className = "tab-content col-md-11";
  }


  getLabelsData() {
    this.evalService.feedbackError = false;
    let labelsData = this.route.snapshot;
    let result = labelsData.data["data"].questions;

    this.feedback1Arr = result.subcategories_10;
    this.feedback2Arr = result.subcategories_11;
    this.feedback3Arr = result.subcategories_12;

    this.evalService.calculateOverAllRating(result);

  }

  selectTab(tab_id: number) {
    this.evalTabs.tabs[tab_id].active = true;
  }

  submitEvaluation(questionData, type, nextTab) {
    let data = {
      "candidateId": this.globalService.decode(this.candidate),
      "questions": questionData,
      "step": 4,
      'type': type
    }
    let result = this.evalService.validateQuestions(questionData);
    if (result) {
      this.evalService.saveEvaluation(data).subscribe(
        (result) => {
          if (result.status) {
            this.toasterService.success("Saved successfully");
            if (type == 'save') {
              let sum = 0;
              this.feedback1Arr.forEach(element => {
                sum += parseInt(element.questionValue);
              });

              this.feedback2Arr.forEach(element => {
                sum += parseInt(element.questionValue);
              });

              this.feedback3Arr.forEach(element => {
                sum += parseInt(element.questionValue);
              });
              let length = this.feedback1Arr.length + parseInt(this.feedback2Arr.length) + parseInt(this.feedback3Arr.length);
              this.evalService.feedbackRating = (sum / length).toFixed(2);
              if (nextTab == 'nextSection') {
                let url: string = 'admin/candidates';
                this.router.navigate([url]);
              } else {
                this.selectTab(nextTab)
              }
            } else {

            }

          } else {
            if (result.validationFailed) {
              this.toasterService.error(result.errorMessage);
              this.evalService.addErrorTagToTabs(result.failedSubTabs);
            } else {
              this.toasterService.error("Error in saving please try again later.");
            }

          }
        },
        error => {
          this.toasterService.error("Error in saving please try again later.");
        }
      );
    } else {
      this.toasterService.error("Please answer all the questions to save.");
    }

  }

}
