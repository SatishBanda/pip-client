import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { tick } from '@angular/core/testing';

@Component({
  templateUrl: './introduction.component.html',
  styleUrls: [],
  providers: [],
})
export class IntroductionComponent implements OnInit {

  candidate: any;
  public introductionArr = [0, 2, 3, 5, 1, 0, 4, 2, 5];
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

  subCategories1Arr: any;
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

  constructor(
    public evalService: EvaluationService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.candidate = route.snapshot.params['candidate'];
  }

  ngOnInit() {
    this.getLabelsData();
    this.evalService.introductionError = false;
  }


  getLabelsData() {

    let labelsData = this.route.snapshot;
    this.evalService.calculateOverAllRating(labelsData.data["data"].questions);
    this.subCategories1Arr = labelsData.data["data"].questions.subcategories_1;

  }

  submitEvaluation() {
    let data = {
      "candidateId": this.globalService.decode(this.candidate),
      "questions": this.subCategories1Arr,
      "step": 1
    }
    let result = this.evalService.validateQuestions(this.subCategories1Arr);
    if (result) {
      this.evalService.saveEvaluation(data).subscribe(
        (result) => {
          if (result.status) {
            this.toasterService.success("Saved successfully");

            let sum = 0;
            this.subCategories1Arr.forEach(element => {
              sum += parseInt(element.questionValue);
            });
            this.evalService.introductionRating = (sum / this.subCategories1Arr.length).toFixed(2);
            let url: string = 'admin/candidates/' + this.candidate + '/evaluation/questions';
            //this.router.navigate([url]);

          } else {
            this.toasterService.error("Error in saving please try again later.");
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
