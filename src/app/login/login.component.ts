import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap";
import { CookieService } from "ngx-cookie";
import { GlobalService } from '../services/global.service';
import { AuthenticationService } from '../services/authentication.service';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    redirect_uri: any;

    @ViewChild('forgotPwdModal') public forgotPwdModal: ModalDirective;

    loading = false;

    model: any = {};

    valueChangedForm: any;
    public _loginForm: FormGroup;
    public _forgotPwdForm: FormGroup;
    public _clearFormErrors: any;
    public _formErrors: any;
    public _forgotPwdFormErrors: any;
    public _submitted: boolean = false;
    public _errorMessage: string = '';
    public _errorMessageForgotPwd: string = '';

    public maxApplicableYear: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _formBuilder: FormBuilder,
        private toastrService: ToastrService,
        private globalService: GlobalService,
        private _cookieService: CookieService) {

        /* login form */
        this._loginForm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            rememberMe: [false]
        });

        this._loginForm.valueChanges
            .subscribe(data => this.onValueChanged('_loginForm', data));
        /* ./login form */

        /* forgot password form */
          this._forgotPwdForm = _formBuilder.group({
              username: ['', [Validators.required, Validators.pattern(this.globalService.emailRegx) ]]
          });

        this._forgotPwdForm.valueChanges
            .subscribe(data => this.onValueChanged('_forgotPwdForm', data));

        /* ./forgot password form */
    }

    ngOnInit() {

        this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.redirect_uri = params['r'];
            });

        this._resetFormErrors();
        let authToken = '';//this.globalService.getToken();
        if (this._cookieService.get('rememberMe') || authToken) {

            let userType: any = localStorage.getItem("usertype");
            if (userType) {
                this.router.navigate(['/dashboard']);
            } else {
                this.authenticationService.logout();
            }

        } else {
            this.authenticationService.logout();
        }

        //this.authenticationService.logout();

        if (localStorage.getItem("toastr_success") !== null) {
            this.toastrService.success(localStorage.getItem("toastr_success"));
            localStorage.removeItem("toastr_success");
        }

        if (localStorage.getItem("toastr_error") !== null) {
            this.toastrService.error(localStorage.getItem("toastr_error"));
            localStorage.removeItem("toastr_error");
        }

    }

    
    private _setFormErrors(form, errorFields: any): void {
        if (form == '_loginForm') {
            for (let key in errorFields) {
                // skip loop if the property is from prototype
                if (!errorFields.hasOwnProperty(key)) continue;

                let message = errorFields[key];
                this._formErrors[key].valid = false;
                this._formErrors[key].message = message;
            }
        } else if (form == '_forgotPwdForm') {
            for (let key in errorFields) {
                // skip loop if the property is from prototype
                if (!errorFields.hasOwnProperty(key)) continue;

                let message = errorFields[key];
                this._forgotPwdFormErrors[key].valid = false;
                this._forgotPwdFormErrors[key].message = message;
            }
        }
    }

    private _resetFormErrors(): void {
        this._formErrors = {
            username: { valid: true, message: '' },
            password: { valid: true, message: '' },
        };
        this._forgotPwdFormErrors = {
            username: { valid: true, message: '' },
        };
        this._errorMessage = '';
        this._errorMessageForgotPwd = '';
    }

    public _isValid(form, field): boolean {
        let isValid: boolean = false;

        if (form == '_loginForm') {
            // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
            if (this._loginForm.controls[field].touched == false) {
                isValid = true;
            }
            // If the field is touched and valid value, then it is considered as valid.
            else if (this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
                isValid = true;
            }
        } else if (form == '_forgotPwdForm') {
            // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
            if (this._forgotPwdForm.controls[field].touched == false) {
                isValid = true;
            }
            // If the field is touched and valid value, then it is considered as valid.
            else if (this._forgotPwdForm.controls[field].touched == true && this._forgotPwdForm.controls[field].valid == true) {
                isValid = true;
            }
        }
        return isValid;
    }

    public onValueChanged(form, data?: any) {

        this._errorMessage = '';
        this._errorMessageForgotPwd = '';

        if (form == '_loginForm') {
            this.valueChangedForm = this._loginForm;
            this._clearFormErrors = this._formErrors;

        } else if (form == '_forgotPwdForm') {
            this.valueChangedForm = this._forgotPwdForm;
            this._clearFormErrors = this._forgotPwdFormErrors;
        }

        if (this.valueChangedForm) {
            for (let field in this._clearFormErrors) {
                // clear previous error message (if any)
                let control = this.valueChangedForm.get(field);
                if (control && control.dirty) {
                    this._clearFormErrors[field].valid = true;
                    this._clearFormErrors[field].message = '';
                }
            }
        }
        return;
    }

    public onSubmit(elementValues: any) {
        this.loading = true;
        this._submitted = true;
        this.authenticationService.login(elementValues.username, elementValues.password, elementValues.rememberMe).subscribe(
            result => {
                if (result.success) {
                    this.router.navigate(['/admin/dashboard']);
                   /* if (this.redirect_uri) {
                        this.router.navigate([this.redirect_uri]);
                    } else {
                        if (result.data.user_type == 1 || result.data.user_type == 2) {
                            this.globalService.getPermissions();
                            if (this.globalService.financial_permission) {
                                this.router.navigate(['/admin/dashboard']);
                            } else {
                                this.router.navigate(['/admin/dashboard']);
                            }
                        } else if (result.data.user_type == 3 || result.data.user_type == 4) {
                            this.navigateUser(result.data.user_type);
                        }
                    }*/
                } else {
                    this._errorMessage = 'Incorrect Username Or Password.';
                    this._submitted = false;
                }
            },
            error => {
                this._submitted = false;
                // Validation error
                if (error.status == 422) {
                    this._resetFormErrors();
                    // this._errorMessage = "There was an error on submission. Please check again.";
                    let errorFields = JSON.parse(error.data.message);
                    this._setFormErrors('_loginForm', errorFields);
                } else {
                    //  this._errorMessage = error.data;
                    this._errorMessage = "There was an error on submission. Please check again.";
                }
            });
    }


    forgotPwd() {
         if (this._forgotPwdForm.dirty && this._forgotPwdForm.valid) {
              this.authenticationService.passwordResetRequest(
                  this._forgotPwdForm.value.username).subscribe(
                  result => {
                      if (result.success) {
                          this.toastrService.success('Password reset token has been sent to your mail. Please check your mail for further instructions.');
                          this.forgotPwdModalDismiss();
                      } else {
                          this._errorMessageForgotPwd = 'Trouble resetting the password. Please try later.';
                          this._submitted = false;
                      }
                  },
                  error => {
                      this._submitted = false;
                      // Validation error
                      if (error.status == 422) {
                          this._resetFormErrors();
                          // this._errorMessageForgotPwd = "There was an error on submission. Please check again.";
                          let errorFields = JSON.parse(error.data.message);
                          this._setFormErrors('_forgotPwdForm', errorFields);
                      } else {
                          //this._errorMessageForgotPwd = error.data;
                          this._errorMessageForgotPwd = "There was an error on submission. Please check again.";
                      }
                  });
  
          }
    }

    forgotPwdModalDismiss() {
        this.forgotPwdModal.hide();
        this._errorMessageForgotPwd = '';
        this._forgotPwdForm.reset();
        this._resetFormErrors();
    }
    /**
     * Redirecting User
     */
    navigateUser(userType) {
        let action = 'dashboard';
        let products = '';
        if (products && products != null && products != 'null' && products != '') {
            let productsList = Object.keys(products).map(function (key) {
                return products[key]
            })
            let product;
            productsList.forEach(element => {
                if (element.applicable_year > this.maxApplicableYear) {
                    this.maxApplicableYear = element.applicable_year
                    product = element;
                }
            });

            if (productsList.length == 1 && product.product_name.toLowerCase() == 'vht') {
                action = 'vhtdashboard';
            }

            let clientKeys: any[] = Object.keys(product.clients);
            let client = product['clients'][clientKeys[0]];



            //is.router.navigate(['/client/' + productId + '/' + clientId + '/' + action]);
        } else {
            //this.router.navigate(['/products-not-exists']);
        }
    }
}
