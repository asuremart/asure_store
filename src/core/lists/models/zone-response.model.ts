/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ZoneCountryResponseModel } from './zonecountry-response.model';

export class ZoneResponseModel {
  public code: string;
  public isActive: number;
  public name: string;
  public zoneId: string;
  public country: ZoneCountryResponseModel;

  constructor(state: any) {
    this.code = state.code || '';
    this.isActive = state.isActive || 0;
    this.name = state.name || '';
    this.country = new ZoneCountryResponseModel(state.country);
    this.zoneId = state.zoneId || '';
  }
}
