/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductRatingResponseModel {
  public avatar: string;
  public avatarPath: string;
  public createdDate: string;
  public firstName: string;
  public lastName: string;
  public rating: number;
  public review: string;

  constructor(productRatingResponse: any) {
    this.avatar = productRatingResponse.avatar || '';
    this.avatarPath = productRatingResponse.avatarPath || '';
    this.createdDate = productRatingResponse.createdDate || '';
    this.firstName = productRatingResponse.firstName || '';
    this.lastName = productRatingResponse.lastName || '';
    this.rating = productRatingResponse.rating || 0;
    this.review = productRatingResponse.review || '';
  }
}
