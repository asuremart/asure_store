/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UtilService } from './utility.service';
import { ValidationService } from './validation.service';

@NgModule()
export class UtilityModule {
  static forRoot(): ModuleWithProviders<UtilityModule> {
    return {
      ngModule: UtilityModule,

      providers: [UtilService, ValidationService]
    };
  }
}
