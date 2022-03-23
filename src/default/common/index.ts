/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentsModule} from '../shared/components/index';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
      CommonModule,
      ComponentsModule,
      SharedModule,
  ],
  providers: []
})
export class ContainerModule {
}
