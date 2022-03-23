/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator } from '../../../theme/utils/app-validators';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

    public forgotForm: FormGroup;
    public submitted = false;
    public isFormOpen = false;
    private subscriptions: Array<Subscription> = [];
    constructor(public formBuilder: FormBuilder,
        public router: Router,
        public snackBar: MatSnackBar,
        public authSandbox: AuthSandbox) { }


    ngOnInit() {
        this.forgotForm = this.formBuilder.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])]
        });
    }


    /**  calls authSandbox doRecover with values from forgotForm.
     * Then calls resetAllFormFields to reset all fields.
     *
     * */
    public onForgotFormSubmit(values: Object): void {
        if (this.forgotForm.valid) {
            this.authSandbox.doRecover(this.forgotForm.value);
            this.submitted = false;
            this.forgotForm.reset();
            this.forgotForm.clearValidators();
        } else if (!this.forgotForm.valid) {
            this.submitted = true;
        }
        this.resetAllFormFields();
    }

    // reset reactive form fields
    resetAllFormFields() {

        this.subscriptions.push(this.authSandbox.userToken$.subscribe(success => {
            if (success && success?.status === 1) {
                this.isFormOpen = true;
                this.forgotForm.reset();
            }
        }));
    }

    // validate reactive form fields
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
