/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class CountryResponseModel {
  public countryId: string;
  public isActive: string;
  public isoCode2: string;
  public isoCode3: string;
  public name: string;
  public postcodeRequired: string;

  constructor(contactRequest: any) {
    this.countryId = contactRequest.countryId || '';
    this.isActive = contactRequest.isActive || '';
    this.isoCode2 = contactRequest.isoCode2 || '';
    this.isoCode3 = contactRequest.isoCode3 || '';
    this.name = contactRequest.name || '';
    this.postcodeRequired = contactRequest.postcodeRequired || '';
  }
}
