/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ZoneCountryResponseModel {
  public addressFormat: string;
  public countryId: number;
  public createdDate: string;
  public isActive: number;
  public isoCode2: string;
  public isoCode3: string;
  public name: string;
  public postcodeRequired: string;

  constructor(state: any) {
    this.addressFormat = state.addressFormat || '';
    this.countryId = state.countryId || '';
    this.createdDate = state.createdDate || '';
    this.isActive = state.isActive || 0;
    this.isoCode2 = state.isoCode2 || '';
    this.isoCode3 = state.isoCode3 || '';
    this.name = state.name || '';
    this.postcodeRequired = state.postcodeRequired || '';
  }
}
