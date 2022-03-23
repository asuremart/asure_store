/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as commonAction from './action/common.action';
import * as store from '../state.interface';
import {
  getLanguage,
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading,
  wishlistCount,
  wishlistCountFailed,
  wishlistCountLoaded,
  wishlistCountLoading,
  getProfileValid,
  customerLogOut,
  customerLogOutLoaded,
  customerLogOutLoading,
  customerLogOutFailed,
  getLogo
} from './reducer/common.selector';

@Injectable()
export class CommonSandbox {
  /* get wishlist count status*/
  public wishlistCount$ = this.appState$.select(wishlistCount);
  public wishlistCountLoading$ = this.appState$.select(wishlistCountLoading);
  public wishlistCountLoaded$ = this.appState$.select(wishlistCountLoaded);
  public wishlistCountFailed$ = this.appState$.select(wishlistCountFailed);
  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);


  /* sign out*/
  public customerLogOut$ = this.appState$.select(customerLogOut);
  public customerLogOutLoading$ = this.appState$.select(customerLogOutLoading);
  public customerLogOutLoaded$ = this.appState$.select(customerLogOutLoaded);
  public customerLogOutFailed$ = this.appState$.select(customerLogOutFailed);

  /* get logo*/
  public getLogo$ = this.appState$.select(getLogo);

  public getLanguageList$ = this.appState$.select(getLanguage);

  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
  }

  public getWishlistCounts(params): void {
    this.appState$.dispatch(new commonAction.GetWishlistCount(params));
  }

  public doGetProfile(): void {
    this.appState$.dispatch(new commonAction.GetProfile());
  }

  public doSignout(): void {
    this.appState$.dispatch(new commonAction.DoSignOut());
  }

  public getLanguageList(params) {
    this.appState$.dispatch(new commonAction.GetLanguage(params));
  }

  public customerLogOut(): void {
    this.appState$.dispatch(new commonAction.CustomerLogOut());
  }

  public getLogo(params): void {
    this.appState$.dispatch(new commonAction.GetLogo(params));
  }


  public registerEvents() {}
}
