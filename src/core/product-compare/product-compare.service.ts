/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Api } from '../providers/api/api';

@Injectable()
export class ProductCompareService extends Api {
  private base = this.getBaseUrl();
  /* compare product list api*/
  compareProducts(param) {
    return this.http.get(this.base + 'product-store/product-compare', {
      params: param
    });
  }
}
