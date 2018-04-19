import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';

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
  }


  getLabelsData() {
    let testData = { "candidateId": 8, "evaluationType": "start" };
    this.evalService.getQuestionLabels(testData).subscribe(
      (result) => {
        if (result.status) {
          this.subCategories1Arr = result.questions.subcategories_1;
        }
      },
      error => {
        this.toasterService.error("Error in fetching settings details");
      }
    );
  }

}
