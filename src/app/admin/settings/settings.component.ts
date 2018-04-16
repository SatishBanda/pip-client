import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SettingService } from '../../services/settings.service';
import { ToastrService } from 'ngx-toastr';
import { Settings } from '../../models/settings';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingService],
})
export class SettingsComponent implements OnInit {

  public settingsList: Settings;
  public settingForm: FormGroup;
  public settingFormErrors: any;
  public settingsSubmitted: boolean;
  public phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public numberMask = [/\d/, /\d/];
  constructor(
    private title: Title,
    public settingsService: SettingService,
    public toasterService: ToastrService,
    private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    public router: Router,
  ) {
    let currentTitle = this.title.getTitle();
    this.title.setTitle('PIP | Admin | Settings');
    this.createSettings();
    this.settingForm.valueChanges
      .subscribe(data => this.setFormErrorsOnChange(this.settingForm, this.settingFormErrors, data));

  }

  ngOnInit() {
    this.getSettings();
    this._resetSettingFormErrors();
    this.settingsList = Object.assign({})
  }

  createSettings() {
    this.settingForm = this._formBuilder.group({
      twilio_phone_number: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      account_id: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      account_auth_token: ['', Validators.compose([Validators.required])],
      default_email_for_outgoing: ['', Validators.compose([Validators.required, Validators.pattern(this.globalService.emailRegx)])],
      alerts_notification_days: ['', Validators.compose([Validators.required])],
      send_grid_api: ['', Validators.compose([Validators.required])],

      //phone_extension: ['']
    });
  }
  getSettings() {
    this.settingsService.getSettings().subscribe(
      (result) => {
        this.settingsList = Object.assign({}, result.settings);
      },
      error => {
        this.toasterService.error("Error in fetching settings details");
      }
    );
  }

  /**
   * 
   * @param errorFields 
   */
  public _setCompanyUserFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this.settingFormErrors[key].valid = false;
      this.settingFormErrors[key].message = message;
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


  public isSettingValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true

    if (this.settingForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this.settingForm.controls[field].touched == true && this.settingForm.controls[field].valid == true) {
      isValid = true;

    } else if (this.settingForm.controls[field].touched == true && this.settingForm.controls[field].valid == false) {
      let control = this.settingForm.get(field);
      const messages = this.settingsValidationMessages[field];

      this.settingFormErrors[field].valid = false;
      for (const key in control.errors) {
        this.settingFormErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }

  /**
  * 
  */
  public settingsValidationMessages = {
    'twilio_phone_number': {
      'required': 'Twilio Phone Number is required.',

    },
    'account_id': {
      'required': 'Account Id is required.',

    },
    'account_auth_token': {
      'required': 'Account Auth Token is required.',

    },
    'send_grid_api': {
      'required': 'Send Grid Api is required.',

    },
    'default_email_for_outgoing': {
      'required': 'Default Email for Outgoing Emails is required.',
      'pattern': 'Invalid Email.'
    },
    'alerts_notification_days': {
      'required': 'Alerts Notification (Days) is required.',
    }
  }

  /**
   * 
   */
  private _resetSettingFormErrors(): void {
    this.settingFormErrors = {
      twilio_phone_number: { valid: true, message: '' },
      account_id: { valid: true, message: '' },
      account_auth_token: { valid: true, message: '' },
      send_grid_api: { valid: true, message: '' },
      default_email_for_outgoing: { valid: true, message: '' },
      alerts_notification_days: { valid: true, message: '' }
    };
  }

  onSettingsSubmit() {
    this.settingsService.saveSettings(this.settingsList).subscribe(
      (result) => {
        if (result.status) {
          this.toasterService.success("Settings saved successfully");
          this.getSettings();
        }else{
          this.toasterService.success("Error in settings save, please try again later");
        }
      },
      error => {
        this.toasterService.success("Error in settings save, please try again later");
      }
    );
  }
}
