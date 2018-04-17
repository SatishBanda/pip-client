import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  templateUrl: './introduction.component.html',
  styleUrls: [],
  providers: [],
})
export class IntroductionComponent implements OnInit {

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
    private title: Title,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
  ) {
   

  }

  ngOnInit() {
  
  }

}
