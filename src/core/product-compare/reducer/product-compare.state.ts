/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface CompareProductState extends Map<string, any> {
  compareCount: Array<any>;
  compareAdding: boolean;
  compareList: Array<any>;
  compareError: any;
}

export const compareProductRecord = Record({
  compareAdding: false,
  compareError: {},
  compareList: [],
  compareCount: []
});
