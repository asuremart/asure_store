/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductRatingModel {
  public productId: string;
  public limit: string;
  public offset: string;
  public count: string;

  constructor(productRatingRequest: any) {
    this.productId = productRatingRequest.productId || '';
    this.limit = productRatingRequest.limit || '';
    this.offset = productRatingRequest.offset || '';
    this.count = productRatingRequest.count || '';
  }
}
