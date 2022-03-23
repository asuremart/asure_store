/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../shared/components/index';
import {VendorDetailComponent} from './vendor-detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {NumberAcceptModule} from '../../shared/validation-directives/onlyNumber.module';



export const routes = [
    {path: 'detail/:id', component: VendorDetailComponent}
];

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        ComponentsModule,
        TranslateModule.forChild(),
        NumberAcceptModule,
    ],
    declarations: [
        VendorDetailComponent
    ],
})
export class VendorDetailModule {
}
