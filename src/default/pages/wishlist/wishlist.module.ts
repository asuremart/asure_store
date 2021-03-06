/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WishlistComponent } from './wishlist.component';
import {ComponentsModule} from '../../shared/components/index';
// store
import {TranslateModule} from '@ngx-translate/core';


export const routes = [
  { path: '', component: WishlistComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
      ComponentsModule,
      TranslateModule.forChild()
  ],
  declarations: [
    WishlistComponent
  ],
    providers: []
})
export class WishlistModule { }
