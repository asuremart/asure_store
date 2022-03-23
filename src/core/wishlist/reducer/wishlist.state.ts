/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface WishlistState extends Map<string, any> {
  newPassword: any;
  wishlist: any;
  wishlistLoading: any;
  wishlistLoaded: any;
  wishlistFailed: any;

  deleteWishlist: any;
}

export const wishlistRecord = Record({
  newPassword: {},
  wishlist: [],
  wishlistLoading: false,
  wishlistLoaded: false,
  wishlistFailed: false,

  deleteWishlist: [],
});
