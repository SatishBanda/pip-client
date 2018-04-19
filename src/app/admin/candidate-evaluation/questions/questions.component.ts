import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  templateUrl: './questions.component.html',
  styleUrls: [],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionsComponent implements OnInit {

  candidate: any;
  questions7Arr: any;
  questions5Arr: any;
  questions6Arr: any;
  questions4Arr: any;
  questions3Arr: any;
  questions2Arr: any;
  questions1Arr: any;

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
      max: 5
    }
  }


  constructor(
    public route: ActivatedRoute,
    public evalService: EvaluationService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
  ) {

    this.candidate = route.snapshot.params['candidate'];
  }

  ngOnInit() {
    this.getLabelsData();
    document.getElementById('test').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test').querySelector('div.tab-content').className = "tab-content col-md-11";
  }


  getLabelsData() {

    let labelsData = this.route.snapshot;
    let result = labelsData.data["data"].questions;
    this.questions1Arr = result.subcategories_2;
    this.questions2Arr = result.subcategories_3;
    this.questions3Arr = result.subcategories_4;
    this.questions4Arr = result.subcategories_5;
    this.questions5Arr = result.subcategories_6;
    this.questions6Arr = result.subcategories_7;
    this.questions7Arr = result.subcategories_8;
  }
}
