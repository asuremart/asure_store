/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class AddresslistModel {
  public limit: number;
  public offset: number;
  public count: number;

  constructor(addresslistresponse: any) {
    this.limit = addresslistresponse.limit || 0;
    this.offset = addresslistresponse.offset || 0;
    this.count = addresslistresponse.count || 0;
  }
}
