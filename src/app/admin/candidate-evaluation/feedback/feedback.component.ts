import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { TabsetComponent } from 'ngx-bootstrap';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FinishEmail } from '../../../models/finish-email-compose';

@Component({
  templateUrl: './feedback.component.html',
  styleUrls: [],
  providers: [],
})
export class FeedbackComponent implements OnInit {

  finishEmailComposeFormErrors: any;
  candidate: any;
  feedback3Arr: any;
  feedback2Arr: any;
  feedback1Arr: any;
  public finishEmailComposeForm: FormGroup;
  public mailCompose: FinishEmail;
  public composeFormSubmitted: boolean = true;

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

  modalRef: BsModalRef;
  @ViewChild('finishMailModal') public finishMailModal: ModalDirective;

  constructor(
    public evalService: EvaluationService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
  ) {

    this.candidate = route.snapshot.params['candidate'];
    this.createFinishEmailComposeForm();
    this.finishEmailComposeForm.valueChanges.subscribe(
      data => this.setFormErrorsOnChange(this.finishEmailComposeForm, this.finishEmailComposeFormErrors, data)
    );
  }

  setFormErrorsOnChange(form, formErrors, data?: any) {
    if (!form) { return; }
    for (let field in formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        formErrors[field].valid = true;
        formErrors[field].message = '';
      }
    }
  }

  /**
  * 
  */
  public composeFormValidationMessages = {
    'to': {
      'required': 'First Name is required.',
      'pattern': 'No special characters are allowed other than & -',
      'minlength': 'First Name should be a minimum 2 chars.',
    },
    'cc': {
      'required': 'CC is required.',
      'pattern': 'No special characters are allowed other than & -',
      'minlength': 'CC should be a minimum 2 chars.',
    },
    'bcc': {
      'required': 'BCC Address is required.',
      'pattern': 'Invalid BCC Address.'
    },
    'subject': {
      'required': 'Subject is required.',
      'minlength': 'Subject should be 10 digit length.',
    },
    'message': {
      'required': 'Message is required.',
    }
  }

  /**
   * 
   */
  private createFinishEmailComposeModel() {
    // Create a new Candidate
    let composeForm: FinishEmail = {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      message: '',
      //phone_extension: '',
    }
    return composeForm;
  }

  /**
  * 
  */
  public createFinishEmailComposeForm() {
    this.finishEmailComposeForm = this._formBuilder.group({
      to: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      cc: ['', Validators.compose([Validators.minLength(2), Validators.pattern(this.globalService.emailRegx)])],
      bcc: ['', Validators.compose([Validators.minLength(2), Validators.pattern(this.globalService.emailRegx)])],
      subject: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])]
    });
  }

  editor;
  ngOnInit() {
    document.getElementById('test1').querySelector('ul').className = "nav nav-stacked flex-column nav-pills col-md-1";
    document.getElementById('test1').querySelector('div.tab-content').className = "tab-content col-md-11";

    this.getLabelsData();
    this.mailCompose = Object.assign({});
    this._resetComposerFormErrors();
  }

  closeModal() {
    this.finishMailModal.hide();
  }


  getLabelsData() {

    let labelsData = this.route.snapshot;
    let result = labelsData.data["data"].questions;

    this.feedback1Arr = result.subcategories_10;
    this.feedback2Arr = result.subcategories_11;
    this.feedback3Arr = result.subcategories_12;

    this.evalService.calculateOverAllRating(result);

  }

  /**
     * 
     * @param field 
     */
  public isComposeFormValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true

    if (this.finishEmailComposeForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this.finishEmailComposeForm.controls[field].touched == true && this.finishEmailComposeForm.controls[field].valid == true) {
      isValid = true;

    } else if (this.finishEmailComposeForm.controls[field].touched == true && this.finishEmailComposeForm.controls[field].valid == false) {
      let control = this.finishEmailComposeForm.get(field);
      const messages = this.composeFormValidationMessages[field];

      this.finishEmailComposeFormErrors[field].valid = false;
      for (const key in control.errors) {
        this.finishEmailComposeFormErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }

  /**
 * 
 */
  private _resetComposerFormErrors(): void {
    this.finishEmailComposeFormErrors = {
      to: { valid: true, message: '' },
      cc: { valid: true, message: '' },
      bcc: { valid: true, message: '' },
      subject: { valid: true, message: '' },
      message: { valid: true, message: '' }
    };
  }

  selectTab(tab_id: number) {
    this.evalTabs.tabs[tab_id].active = true;
  }

  submitEvaluation(questionData, type, nextTab) {
    if (type == "email") {
      this.finishMailModal.show();
      return false;
    }
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
