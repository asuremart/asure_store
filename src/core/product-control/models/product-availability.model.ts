/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductAvailabilityModel {
    public productId: any;
    public pincode: any;
    constructor(registerRequest: any) {
      this.productId = registerRequest.productId || '';
      this.pincode = registerRequest.pincode || '';
    }
  }
