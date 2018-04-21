import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsDatepickerConfig } from "ngx-bootstrap";
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { CandidateUser } from '../../models/candidate-user';
import { CandidateUserService } from '../../services/candidate-user.service';
import { EvaluationService } from '../../services/evaluation.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css'],
  providers: [CandidateUserService]
})
export class CandidatesComponent implements OnInit {

  minDate = new Date(2010, 0, 1);
  maxDate = new Date(2050, 12, 31);
  colorTheme = 'theme-blue';
  public bsConfig: Partial<BsDatepickerConfig>;

  @ViewChild('candidatesModal') public candidatesModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('candidatesHistoryModal') public candidatesHistoryModal: ModalDirective;

  public candidateUserFormErrors: any;
  public candidateUserForm: FormGroup;
  public candidateUserErrorMessage: string;
  public candidateUserSubmitted: boolean;
  public candidateUser: CandidateUser;
  public filterQuery = "";
  public sortOrder = "asc";
  public rowsOnPage = 10;
  public sortBy = "";
  public candidateTitle: string = '';
  public candidateEvaluationTitle: string = '';
  public candidateEvaluationHistoryData: any;
  public selectedCandidate: any;

  public mask = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  public candidatesData = []

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public router: Router,
    public globalService: GlobalService,
    private toastrService: ToastrService,
    public candidateUserService: CandidateUserService,
    public evalService: EvaluationService,
    private title: Title
  ) {

    this.title.setTitle('PIP | Admin | Candidates');
    this.createCompanyUserForm();
    this.candidateUserForm.valueChanges
      .subscribe(data => this.setFormErrorsOnChange(this.candidateUserForm, this.candidateUserFormErrors, data));

      
  }

  /**
   * 
   */
  public createCompanyUserForm() {
    this.candidateUserForm = this._formBuilder.group({
      first_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      last_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern(this.globalService.emailRegx)])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
      status: ['', Validators.compose([Validators.required])],
      //phone_extension: ['']
    });
  }


  /**
   *  Initialiazes component
   */
  ngOnInit() {
    this.evalService.introductionError = false;
    this.evalService.questionError = false;
    this.evalService.recommendationError = false;
    this.evalService.feedbackError = false;
    console.log(this.evalService.questionError);
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });
    this.getCandidatesList();
    this._resetCompanyUserFormErrors();
    this.candidateUser = Object.assign({})

  }


  /*getting products from service*/
  private getCandidatesList() {
    this.candidateUserService.getCandidates()
      .subscribe((candidates) => {
        this.candidatesData = candidates;
      },
        error => { }
      );
  }

  /**
   * 
   */
  public createCompanyUser() {
    this.candidateUserForm.reset();
    this.candidateUser = this.createCompanyUserModel();
    this._resetCompanyUserFormErrors();
    this.candidateTitle = "Add Candidate";
    this.candidatesModal.show();
  }

  /*To delete a particular product*/
  public deleteCandidate(candidate) {
    this.selectedCandidate = candidate.user_id;
    this.deleteModal.show();
  }

  public showCandidateEvaluationHistory(candidate) {
    this.candidateEvaluationTitle = candidate.name + ': Evaluation History';
    this.candidateEvaluationHistoryData = candidate.evaluationHistory;
    this.candidatesHistoryModal.show();
  }
  public okDelete() {
    this.candidateUserService.deleteCandidate(this.selectedCandidate)
      .subscribe((result) => {
        if (result.status) {
          this.getCandidatesList();
          this.toastrService.success('Candidate Deleted Succesfully .');
          this.deleteModal.hide();
        } else {
          this.toastrService.success('Error in candidate delettion, Please try again later .');
          this.deleteModal.hide();
        }

      },
        error => {
          this.toastrService.error(error.data.message);
          this.deleteModal.hide();
        });
  }
  /**
   * 
   * @param field 
   */
  public isCandidateUserValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true

    if (this.candidateUserForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this.candidateUserForm.controls[field].touched == true && this.candidateUserForm.controls[field].valid == true) {
      isValid = true;

    } else if (this.candidateUserForm.controls[field].touched == true && this.candidateUserForm.controls[field].valid == false) {
      let control = this.candidateUserForm.get(field);
      const messages = this.companyUserValidationMessages[field];

      this.candidateUserFormErrors[field].valid = false;
      for (const key in control.errors) {
        this.candidateUserFormErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }

  /**
  * 
  */
  public companyUserValidationMessages = {
    'first_name': {
      'required': 'First Name is required.',
      'pattern': 'No special characters are allowed other than & -',
      'minlength': 'First Name should be a minimum 2 chars.',
    },
    'last_name': {
      'required': 'Last Name is required.',
      'pattern': 'No special characters are allowed other than & -',
      'minlength': 'Last Name should be a minimum 2 chars.',
    },
    'username': {
      'required': 'Email Address is required.',
      'pattern': 'Invalid Email Address.'
    },
    'mobile': {
      'required': 'Phone is required.',
      'minlength': 'Phone should be 10 digit length.',
    },
    'status': {
      'required': 'Status is required.',
    },
    /*'phone_extension': {
    }*/
  }
  /**
   * 
   */
  private createCompanyUserModel() {
    // Create a new Candidate
    let user: CandidateUser = {
      user_id: 0,
      first_name: '',
      last_name: '',
      status: '',
      mobile: '',
      //phone_extension: '',
    }
    return user;
  }
  /**
   * 
   */
  private _resetCompanyUserFormErrors(): void {
    this.candidateUserFormErrors = {
      first_name: { valid: true, message: '' },
      last_name: { valid: true, message: '' },
      username: { valid: true, message: '' },
      mobile: { valid: true, message: '' },
      //phone_extension: { valid: true, message: '' },
      status: { valid: true, message: '' }
    };
  }

  /**
   * 
   */
  onCandidateUserSubmit(type: string) {
    this.candidateUserSubmitted = true;
    this.candidateUserService.saveCandidateUser(this.candidateUser).subscribe(
      result => {
        if (result.status) {
          this.closeCandidateModal();
          this.candidateUserSubmitted = false;
          this.toastrService.success('Candidate saved successfully.');
          if (type == 'evaluate') {
            this.redirectToEvaluation(result.userInformation.user_id);
          } else {
            this.getCandidatesList();
          }

        } else {
          this.candidateUserSubmitted = false;
        }
      },
      error => {
        this.candidateUserSubmitted = false;
        if (error.status == 422) {
          this._resetCompanyUserFormErrors();
          let errorFields = JSON.parse(error.data.message);
          if (typeof errorFields == 'string') {
            this.toastrService.error(errorFields);
          } else {
            this._setCompanyUserFormErrors(errorFields);
          }
        }
      });
  }

  /*updating product*/
  public updateCandidate(candidate: CandidateUser) {
    this.candidateUser = Object.assign({}, candidate);
    this.candidateUserSubmitted = false;
    this.candidateTitle = "Edit Candidate";
    this.candidatesModal.show();
  }

  /**
   * 
   */
  public closeCandidateModal() {
    this.candidatesModal.hide();
    this._resetCompanyUserFormErrors();
  }
  /**
   * 
   * @param errorFields 
   */
  public _setCompanyUserFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this.candidateUserFormErrors[key].valid = false;
      this.candidateUserFormErrors[key].message = message;
    }
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

  public changeCandidateStatus(candidate: CandidateUser) {
    this.candidateUserService.changeCandidateStatus(candidate.user_id).subscribe(
      result => {
        if (result.success) {
          this.toastrService.success('Status Updated Succesfully.');
          this.getCandidatesList()
        } else {
          this.toastrService.error('Error in status update.');
        }
      },
      error => {
        //this._errorMessage = error.data;
      });
  }
  /**
   * 
   * @param candiate 
   */
  redirectToEvaluation(user_id) {
    let url: string = 'admin/candidates/' + this.globalService.encode(user_id) + '/evaluation';
    this.router.navigate([url]);
  }
}
