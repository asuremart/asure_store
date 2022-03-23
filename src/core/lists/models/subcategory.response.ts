/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class SubcategoryResponseModel {
  public categoryId: number;
  public parentInt: number;
  public sortOrder: number;
  public levels: Array<any>;
  public children: Array<any>;
  public image: string;
  public imagePath: string;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public name: string;
  public categorySlug: string;

  constructor(subcategoryresponse: any) {
    this.categoryId = subcategoryresponse.categoryId || '';
    this.parentInt = subcategoryresponse.parentInt || '';
    this.sortOrder = subcategoryresponse.sortOrder || '';
    this.levels = subcategoryresponse.levels || [];
    this.children = subcategoryresponse.children || [];
    this.image = subcategoryresponse.image || '';
    this.imagePath = subcategoryresponse.imagePath || '';
    this.metaTagDescription = subcategoryresponse.metaTagDescription || '';
    this.metaTagKeyword = subcategoryresponse.metaTagKeyword || '';
    this.name = subcategoryresponse.name || '';
    this.categorySlug = subcategoryresponse.categorySlug || '';
  }
}
