/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductOptionValueDetailMandatoryResponseModel {
  public optionId: number;
  public optionValueId: number;
  public optionValueName: string;
  public price: number;
  public pricePrefix: number;
  public productOptionId: number;
  public quantity: number;
  public subtractStock: number;

  constructor(listOptionValueResponse: any) {
    this.optionId = listOptionValueResponse.optionId || 0;
    this.optionValueId = listOptionValueResponse.optionValueId || 0;
    this.optionValueName = listOptionValueResponse.optionValueName || '';
    this.price = listOptionValueResponse.price || 0;
    this.pricePrefix = listOptionValueResponse.pricePrefix || 0;
    this.productOptionId = listOptionValueResponse.productOptionId || 0;
    this.quantity = listOptionValueResponse.quantity || 0;
    this.subtractStock = listOptionValueResponse.subtractStock || 0;
  }
}
