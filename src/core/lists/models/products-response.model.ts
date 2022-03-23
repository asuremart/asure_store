/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ProductsResponseModel {
  public condition: string;
  public dateAvailable: string;
  public discount: string;
  public metaTagDescription: string;
  public description: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public name: string;
  public price: string;
  public flag: any;
  public pricerefer: any;
  public productId: string;
  // public Images: object;
  public containerName: any;
  public image: any;
  public quantity: string;
  public shipping: number;
  public sku: string;
  public sortOrder: string;
  public stockStatusId: number;
  public subtractStock: number;
  public wishListStatus: number;
  public option: Array<any>;
  public optionRequired: number;
  public productSlug: string;
  public taxType: number;
  public taxValue: number;
  public rating: number;
  public ratingCount: number;
  public reviewCount: number;
  public defaultImage: any;

  constructor(listResponse: any) {
    this.condition = listResponse.condition || '';
    this.description = listResponse.description || '';
    this.dateAvailable = listResponse.dateAvailable || '';
    this.discount = listResponse.discount || '';
    this.metaTagDescription = listResponse.metaTagDescription || '';
    this.metaTagKeyword = listResponse.metaTagKeyword || '';
    this.metaTagTitle = listResponse.metaTagTitle || '';
    this.name = listResponse.name || '';
    this.price = listResponse.price || '';
    if (listResponse.flag === 0) {
      this.flag = listResponse.flag;
    } else if (listResponse.flag === 1) {
      this.flag = listResponse.flag;
    } else {
      this.flag = listResponse.flag;
    }
    this.pricerefer = listResponse.pricerefer || '';
    this.productId = listResponse.productId || '';
    this.containerName = listResponse.containerName || '';
    this.image = listResponse.image || '';
    this.quantity = listResponse.quantity || '';
    this.shipping = listResponse.shipping || 0;
    this.sku = listResponse.sku || '';
    this.sortOrder = listResponse.sortOrder || '';
    this.stockStatusId = listResponse.stockStatusId || 0;
    this.subtractStock = listResponse.subtractStock || 0;
    this.wishListStatus = listResponse.wishListStatus || 0;
    this.optionRequired = listResponse.optionRequired || 0;
    this.option = listResponse.option || [];
    this.productSlug = listResponse.productSlug || '';
    this.taxType = listResponse.taxType || 0;
    this.taxValue = listResponse.taxValue || 0;
    this.rating = listResponse.rating || 0;
    this.ratingCount = listResponse.ratingCount || 0;
    this.reviewCount = listResponse.reviewCount || 0;
    this.defaultImage = listResponse.defaultImage || '';

  }
}
