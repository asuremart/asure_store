/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// shared modules
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../shared/components/index';
import { NumberAcceptModule } from './../../shared/validation-directives/onlyNumber.module';

// components
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { MyordersComponent } from './myorders/myorders.component';
import { BuyAgainComponent } from './buyagain/buyagain.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ReviewComponent } from './review/review.component';
import { TrackComponent } from './track/track.component';

import { QuotationListComponent } from './quotation-list/quotation-list.component';
// store services
import { EffectsModule } from '@ngrx/effects';
import { CommonEffect } from '../../../core/common/effects/common.effect';
import { AccountEffect } from '../../../core/account/effect/account.effect';
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { AccountSandbox } from '../../../core/account/account.sandbox';
import { CommonService } from '../../../core/common/common.service';
import { TranslateModule } from '@ngx-translate/core';
import { AddressesComponent } from './addresses/addresses.component';
import { AddaddressesComponent } from './addaddresses/addaddresses.component';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ListsService } from '../../../core/lists/lists.service';
import { ListsEffect } from '../../../core/lists/effects/lists.effect';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';


export const routes = [
    {
        path: '',
        component: AccountComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard', urls: [{ title: 'Account' }, { title: 'Account Dashboard' }] } },
            { path: 'information', component: InformationComponent, data: { breadcrumb: 'Information', urls: [{ title: 'Account' }, { title: 'Account Information' }] } },
            { path: 'addresses', component: AddressesComponent, data: { breadcrumb: 'Addresses', urls: [{ title: 'Account' }, { title: 'Address' }] } },
            { path: 'addaddresses', component: AddaddressesComponent, data: { breadcrumb: 'Add Address', urls: [{ title: 'Account' }, { title: 'Address' }, { title: 'Add Address' }] } },
            {
                path: 'addaddresses_edit/:id',
                component: AddaddressesComponent,
                data: {
                    urls: [{ title: 'Account' }, { title: 'Address' }, { title: 'Add Address' }]
                }
            },
            { path: 'myorders', component: MyordersComponent, data: { breadcrumb: 'My Orders', urls: [{ title: 'Account' }, { title: 'Order History' }] } },
            { path: 'buyagain', component: BuyAgainComponent, data: { breadcrumb: 'Buy Again' } },
            { path: 'order-details', component: OrderDetailsComponent, data: { breadcrumb: 'Order Details' } },
            { path: 'order-details/:id', component: OrderDetailsComponent, data: { breadcrumb: 'Order Details', urls: [{ title: 'Account' }, { title: 'Order History' }, { title: 'Order Details' }] } },
            { path: 'review', component: ReviewComponent, data: { breadcrumb: 'Review' } },
            { path: 'review/:id', component: ReviewComponent, data: { breadcrumb: 'Review', urls: [{ title: 'Account' }, { title: 'Order History' }, { title: 'Order Details' }, { title: 'Review this product' }] } },
            { path: 'track', component: TrackComponent, data: { breadcrumb: 'Track' } },
            { path: 'track/:id', component: TrackComponent, data: { breadcrumb: 'Track', urls: [{ title: 'Account' }, { title: 'Order History' }, { title: 'Track Order' }] } },
            { path: 'quotation-list', component: QuotationListComponent, data: { breadcrumb: 'Quotation Request List', urls: [{ title: 'Account' }, { title: 'Quotation Request List' }] } },
            { path: 'cancel-order/:id', component: CancelOrderComponent, data: { breadcrumb: 'cancel Order', urls: [{ title: 'Account' }, { title: 'Order History' }, { title: 'Cancel History' }] } },

        ]
    }
];



@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        ComponentsModule,
        EffectsModule.forFeature([AccountEffect, CommonEffect, ListsEffect]),
        TranslateModule.forChild(),
        NumberAcceptModule,
        FormsModule, NgSelectModule
    ],
    declarations: [
        AccountComponent,
        DashboardComponent,
        InformationComponent,
        AddressesComponent,
        AddaddressesComponent,
        MyordersComponent,
        BuyAgainComponent,
        OrderDetailsComponent,
        ReviewComponent,
        TrackComponent,
        CancelOrderComponent,
        QuotationListComponent
    ],
    providers: [CommonSandbox,
        AccountSandbox,
        CommonService,
        ListsSandbox,
        ListsService
    ],
    entryComponents: [
    ]
})
export class AccountModule {
}
