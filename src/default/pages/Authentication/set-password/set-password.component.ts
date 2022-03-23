/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { CustomValidators } from '../../../../default/shared/password-validation/custom-password-validation';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  public setPasswordForm: FormGroup;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  submitted = false;
  key: any;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              public authSandbox: AuthSandbox) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(token => {
      const params: any = {};
      params.userIdToken = token.id;
      params.key = token.id;
      this.key = token.id;
      this.authSandbox.verification(params);
    });
  }
  public initForm(): void {
    this.setPasswordForm = this.fb.group({
      newPassword: ['',  Validators.compose([Validators.required, Validators.minLength(8),
        CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })])],
      confirmPassword: ['',  Validators.compose([Validators.required])],
    },  {validator: this.mismatchingPasswords('newPassword', 'confirmPassword')});
    this.newPassword = this.setPasswordForm.controls['newPassword'];
    this.confirmPassword = this.setPasswordForm.controls['confirmPassword'];
  }

  mismatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[confirmPasswordKey];
      passwordConfirmationInput.setErrors(null);
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  public recoverPassword(form) {
    this.submitted = true;
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }
    const params: any = {};
    params.key = this.key;
    params.newPassword = form.value.newPassword;
    this.authSandbox.resetPassword(params);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

  }


}
