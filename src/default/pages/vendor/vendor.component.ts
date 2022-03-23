/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss']
})

export class VendorComponent implements OnInit {

    public vendorForm: FormGroup;
    public policy = false;
    public submitted = false;


    constructor(public formBuilder: FormBuilder, public toaster: MatSnackBar,
                public listSandbox: ListsSandbox) { }


    ngOnInit() {
        this.initVendorForm();
    }

    initVendorForm() {
        this.vendorForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.nullValidator])],
            contactPerson: ['', Validators.compose([Validators.required, Validators.nullValidator])],
            lastName: [''],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            phone: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            confirmPassword: ['', Validators.compose([Validators.required])],
        }, {validator: matchingPasswords('password', 'confirmPassword')});
    }


    // call contact us function from sand box if the contact form is valid
    public onVendorFormSubmit(values: Object): void {
        this.submitted = true;
        if (this.vendorForm.valid && this.policy === false) {
            this.toaster.open('Please agree the privacy policy', '×', {
                panelClass: 'error',
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 3000
              });
           return;
        }
        if (this.vendorForm.valid) {
            this.submitted = false;
            const params: any = {};
            params.firstName = this.vendorForm.value['name'];
            params.lastName = this.vendorForm.value['lastName'];
            params.contactPersonName = this.vendorForm.value['contactPerson'];
            params.password = this.vendorForm.value['password'];
            params.confirmPassword = this.vendorForm.value['confirmPassword'];
            params.emailId = this.vendorForm.value['email'];
            params.phoneNumber = this.vendorForm.value['phone'];

            this.listSandbox.vendorSignup(params);
        }
    }


    onKeyPress(e, field) {
        const val = this.vendorForm.controls[field].value;
        const string = val.replace(/  +/g, ' ');
        this.vendorForm.controls[field].setValue(string);
    }

}
