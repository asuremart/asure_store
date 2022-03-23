/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';

import * as fromWishlist from './common.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.common;
export const wishlistCount = createSelector(
  getState,
  fromWishlist.getWishlistCount
);
export const getProfile = createSelector(
  getState,
  fromWishlist.getProfile
);
export const getProfileValid = createSelector(
  getState,
  fromWishlist.getProfileValid
);
export const getLanguage = createSelector(
  getState,
  fromWishlist.getLanguages
);

export const wishlistCountLoading = createSelector(
  getState,
  fromWishlist.getWishlistCountLoading
);
export const wishlistCountLoaded = createSelector(
  getState,
  fromWishlist.getWishlistCountLoaded
);
export const wishlistCountFailed = createSelector(
  getState,
  fromWishlist.getWishlistCountFailed
);

export const profileLoading = createSelector(
  getState,
  fromWishlist.getProfileLoading
);
export const profileLoaded = createSelector(
  getState,
  fromWishlist.getProfileLoaded
);
export const profileFailed = createSelector(
  getState,
  fromWishlist.getProfileFailed
);

export const languageLoading = createSelector(
  getState,
  fromWishlist.getLanguageLoading
);
export const languageLoaded = createSelector(
  getState,
  fromWishlist.getLanguageLoaded
);
export const languageFailed = createSelector(
  getState,
  fromWishlist.getLanguageFailed
);

export const customerLogOut = createSelector(
  getState,
  fromWishlist.customerLogOut
);
export const customerLogOutLoading = createSelector(
  getState,
  fromWishlist.customerLogOutLoading
);
export const customerLogOutLoaded = createSelector(
  getState,
  fromWishlist.customerLogOutLoaded
);
export const customerLogOutFailed = createSelector(
  getState,
  fromWishlist.customerLogOutFailed
);

export const getLogo = createSelector(
  getState,
  fromWishlist.getLogo
);



