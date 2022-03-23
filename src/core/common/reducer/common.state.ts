/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';
import { ProfileModel } from '../models/profile.model';

export interface CommonState extends Map<string, any> {
  wishlistCount: number;
  profile: ProfileModel;
  languageList: any;

  wishlistCountLoading: boolean;
  wishlistCountLoaded: boolean;
  wishlistCountFailed: boolean;

  getProfileLoading: boolean;
  profileValid: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;

  getlanguageLoading: boolean;
  getlanguageLoaded: boolean;
  getlanguageFailed: boolean;

  customerLogOut: any;
  customerLogOutLoading: boolean;
  customerLogOutLoaded: boolean;
  customerLogOutFailed: boolean;
  getLogo: any;
}

export const CommonRecord = Record({
  wishlistCount: 0,
  profile: null,
  languageList: {},

  wishlistCountLoading: false,
  wishlistCountLoaded: false,
  wishlistCountFailed: false,

  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  getlanguageLoading: false,
  getlanguageLoaded: false,
  getlanguageFailed: false,

  customerLogOut: [],
  customerLogOutLoading: false,
  customerLogOutLoaded: false,
  customerLogOutFailed: false,
  getLogo: {},
});
