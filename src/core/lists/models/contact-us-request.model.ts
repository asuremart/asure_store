/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ContactUsRequestModel {
  public name: string;
  public email: string;
  public phoneNumber: string;
  public message: string;

  constructor(contactRequest: any) {
    this.name = contactRequest.name || '';
    this.email = contactRequest.email || '';
    this.phoneNumber = contactRequest.phone || '';
    this.message = contactRequest.message || '';
  }
}
