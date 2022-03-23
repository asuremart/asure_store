/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';

import * as fromList from './product-compare.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.compare;
export const compareAdding = createSelector(getState, fromList.getCompareAdding);
export const compareError = createSelector(getState, fromList.getCompareError);
export const compareList = createSelector(getState, fromList.getCompareList);
export const compareCount = createSelector(getState, fromList.getCompareCount);
