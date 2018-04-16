import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordChange } from '../../models/password-change';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../services/global.service';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  passwordSubmitted: boolean;
  public passwordChange: PasswordChange;
  public passwordChangeForm: FormGroup;
  public passwordChangeFormErrors: any;

  @ViewChild('changePasswordModal') public changePasswordModal: ModalDirective;

  constructor(
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public authService: AuthenticationService
  ) {
    this.passwordChangeSet();
    this.passwordChangeForm.valueChanges
      .subscribe(data => this.setFormErrorsOnChange(this.passwordChangeForm, this.passwordChangeFormErrors, data));
  }

  ngOnInit() {
    this._resetSettingFormErrors();
    this.passwordChange = Object.assign({})
  }

  passwordChangeSet() {
    this.passwordChangeForm = this._formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      current_password: ['', Validators.compose([Validators.required])],
      new_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_new_password: ['', Validators.compose([Validators.required, this.MatchPassword])],
    });
  }


  MatchPassword(AC: AbstractControl) {
    const formGroup = AC.parent;
    if (formGroup) {
      const passwordControl = formGroup.get('new_password'); // to get value in input tag
      const confirmPasswordControl = formGroup.get('confirm_new_password'); // to get value in input tag

      if (passwordControl && confirmPasswordControl) {
        const password = passwordControl.value;
        const confirmPassword = confirmPasswordControl.value;
        if (password !== confirmPassword) {
          return { matchPassword: true };
        } else {
          return null;
        }
      }
    }

    return null;
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
  changePassword() {
    this.passwordChange.username = localStorage.getItem('useremail');
    this.passwordChange.current_password = '';
    this.passwordChange.new_password = '';
    this.passwordChange.confirm_new_password = '';
    this.changePasswordModal.show();
  }

  closeChangePassword() {
    this.changePasswordModal.hide();
  }
  public isPasswordChangeValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true

    if (this.passwordChangeForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this.passwordChangeForm.controls[field].touched == true && this.passwordChangeForm.controls[field].valid == true) {
      isValid = true;

    } else if (this.passwordChangeForm.controls[field].touched == true && this.passwordChangeForm.controls[field].valid == false) {
      let control = this.passwordChangeForm.get(field);
      const messages = this.settingsValidationMessages[field];

      this.passwordChangeFormErrors[field].valid = false;
      for (const key in control.errors) {
        this.passwordChangeFormErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }

  /**
  * 
  */
  public settingsValidationMessages = {
    'new_password': {
      'required': 'New Password required.',
      'minlength': 'Password should be 6 digits length.'
    },
    'current_password': {
      'required': 'Current Password required.',
    },
    'confirm_new_password': {
      'required': 'Confirm Password is required.',
      'matchPassword': "Confirm password mismatched"
    },
  }

  /**
   * 
   */
  private _resetSettingFormErrors(): void {
    this.passwordChangeFormErrors = {
      username: { valid: true, message: '' },
      current_password: { valid: true, message: '' },
      new_password: { valid: true, message: '' },
      confirm_new_password: { valid: true, message: '' },
    };
  }

  onPasswordSubmit() {
    if (this.passwordChangeForm.dirty && this.passwordChangeForm.valid) {
      if (this.passwordChangeForm.value.new_password == this.passwordChangeForm.value.confirm_new_password) {
        this.authService.changePassword(
          this.passwordChange.username, this.passwordChangeForm.value.current_password, this.passwordChangeForm.value.new_password, this.passwordChangeForm.value.confirm_new_password).subscribe(
            result => {
              if (result.success) {
                this.toasterService.success('Password changed successfully!');
                this.closeChangePassword();
              } else {
                this.toasterService.error('Error in password change, please try again later.');
              }
            },
            error => {
              this.passwordSubmitted = false;
              // Validation error
              if (error.status == 422) {
                this._resetSettingFormErrors();
                // this._errorMessageChngPwd = "There was an error on submission. Please check again.";
                let errorFields = JSON.parse(error.data.message);
                this._setFormErrors(errorFields);
              } else {
                this.toasterService.error('Error in password change, please try again later.');
              }
            });
      } else {
        this.toasterService.error('Error in password change, please try again later.');
        this.passwordSubmitted = false;
      }
    }

  }

  private _setFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this.passwordChangeFormErrors[key].valid = false;
      this.passwordChangeFormErrors[key].message = message;
    }
  }

}
