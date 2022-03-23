/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { SocialUser } from './user';

export interface LoginProvider {
  initialize(): Promise<SocialUser>;
  signIn(): Promise<SocialUser>;
  signOut(): Promise<any>;
}

