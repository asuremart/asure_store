/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/common.action';
import { CommonState, CommonRecord } from './common.state';
import { ProfileModel } from '../models/profile.model';

export const initialState: CommonState = (new CommonRecord() as unknown) as CommonState;
export function reducer(
  state = initialState,
  { type, payload }: any
): CommonState {
  if (!type) {
    return state;
  }
  switch (type) {

// <------------ GET WISHLIST COUNT -----------> //

    case actions.ActionTypes.GET_WISHLIST_COUNT: {
      return Object.assign({}, state, {
        wishlistCountLoading: true,
        wishlistCountLoaded: false,
        wishlistCountFailed: false
      });
    }

    case actions.ActionTypes.GET_WISHLIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        wishlistCount: payload.data,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: false
      });
    }
    case actions.ActionTypes.GET_WISHLIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        wishlistCount: 0,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: true
      });
    }


// <------------ GET CUSTOMER PROFILE -----------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      let validUser = false;
      const tempProfile = new ProfileModel(payload.data);
      if (tempProfile.id) {
        validUser = true;
      } else {
        validUser = false;
      }
      return Object.assign({}, state, {
        profile: tempProfile,
        profileValid: validUser,
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true
      });
    }


// <------------ SIGN OUT -----------> //

    case actions.ActionTypes.DO_SIGN_OUT: {
      const validUser = false;
      return Object.assign({}, state, {
        profileValid: validUser,
        wishlistCount: 0,
        profile: {}
      });
    }

// <------------ GET LANGUAGE LIST-----------> //

    case actions.ActionTypes.GET_LANGUAGELIST: {
      return Object.assign({}, state, {
        getlanguageLoading: true,
        getlanguageLoaded: false,
        getlanguageFailed: false
      });
    }

    case actions.ActionTypes.GET_LANGUAGELIST_SUCCESS: {
      return Object.assign({}, state, {
        languageList: payload.data,
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: false
      });
    }
    case actions.ActionTypes.GET_LANGUAGELIST_FAIL: {
      return Object.assign({}, state, {
        getlanguageLoading: false,
        getlanguageLoaded: true,
        getlanguageFailed: true
      });
  }
      // <------------ CUSTOMER LOG OUT -----------> //

    case actions.ActionTypes.CUSTOMER_LOG_OUT: {
      return Object.assign({}, state, {
        customerLogOutLoading: true,
        customerLogOutLoaded: false,
        customerLogOutFailed: false
      });
    }

    case actions.ActionTypes.CUSTOMER_LOG_OUT_SUCCESS: {
      return Object.assign({}, state, {
        customerLogOut: payload,
        customerLogOutLoading: false,
        customerLogOutLoaded: true,
        customerLogOutFailed: false
      });
    }
    case actions.ActionTypes.CUSTOMER_LOG_OUT_FAIL: {
      return Object.assign({}, state, {
        customerLogOutLoading: false,
        customerLogOutLoaded: false,
        customerLogOutFailed: true
      });
    }

    // <------------ GET LOGO -----------> //

    case actions.ActionTypes.GET_LOGO: {
      return Object.assign({}, state, {
        getLogo: payload,
      });
    }
    default: {
      return state;
    }
  }
}

export const getWishlistCount = (state: CommonState) => state.wishlistCount;
export const getProfile = (state: CommonState) => state.profile;
export const getProfileValid = (state: CommonState) => state.profileValid;
export const getLanguages = (state: CommonState) => state.languageList;

export const getWishlistCountLoading = (state: CommonState) =>
  state.wishlistCountLoading;
export const getWishlistCountLoaded = (state: CommonState) =>
  state.wishlistCountLoaded;
export const getWishlistCountFailed = (state: CommonState) =>
  state.wishlistCountFailed;

export const getProfileLoading = (state: CommonState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: CommonState) => state.getProfileLoaded;
export const getProfileFailed = (state: CommonState) => state.getProfileFailed;

export const getLanguageLoading = (state: CommonState) =>
  state.getlanguageLoading;
export const getLanguageLoaded = (state: CommonState) =>
  state.getlanguageLoaded;
export const getLanguageFailed = (state: CommonState) =>
  state.getlanguageFailed;

  export const  customerLogOut = (state: CommonState) => state. customerLogOut;
  export const  customerLogOutLoading = (state: CommonState) =>
   state. customerLogOutLoading;
 export const  customerLogOutLoaded = (state: CommonState) =>
   state.customerLogOutLoaded;
 export const  customerLogOutFailed = (state: CommonState) =>
   state.customerLogOutFailed;
   export const  getLogo = (state: CommonState) =>
     state.getLogo;
