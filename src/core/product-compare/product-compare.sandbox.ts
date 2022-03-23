/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as compareAction from './action/product-compare.action';
import * as store from '../state.interface';
import {
  compareAdding,
  compareError,
  compareList,
  compareCount
} from './reducer/product-compare.selector';

@Injectable()
export class ProductCompareSandbox {
  public compareAdding$ = this.appState$.select(compareAdding);
  public compareError$ = this.appState$.select(compareError);
  public compareList$ = this.appState$.select(compareList);
  public compareCount$ = this.appState$.select(compareCount);

  constructor(
    protected appState$: Store<store.AppState>
  ) {
  }
  public addCompareCount(params) {
    this.appState$.dispatch(new compareAction.AddCompareCount(params));
  }
  public clearCompare(params): void {
    this.appState$.dispatch(new compareAction.ClearCompareList(params));
  }
  // compare product
  compareProducts(param) {
    this.appState$.dispatch(new compareAction.CompareProducts(param));
  }
}
