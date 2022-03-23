/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Map, Record} from 'immutable';

export interface AuthState extends Map<string, any> {
    token: any;
    tokenValid: boolean;
    loginLoading: boolean;
    loginLoaded: boolean;
    loginFailed: boolean;

    registerLoading: boolean;
    registerLoaded: boolean;
    registerFailed: boolean;

    recoverLoading: boolean;
    recoverLoaded: boolean;
    recoverFailed: boolean;

    verification: any;
    verificationLoading: boolean;
    verificationLoaded: boolean;
    verificationFailed: boolean;

    resetPassword: any;
    resetPasswordLoading: boolean;
    resetPasswordLoaded: boolean;
    resetPasswordFailed: boolean;
}

export const authrecord = Record({
    token: '',
    tokenValid: false,
    loginLoading: false,
    loginLoaded: false,
    loginFailed: false,

    registerLoading: false,
    registerLoaded: false,
    registerFailed: false,

    recoverLoading: false,
    recoverLoaded: false,
    recoverFailed: false,

    verification: [],
    verificationLoading: false,
    verificationLoaded: false,
    verificationFailed: false,


    resetPassword: [],
    vresetPasswordLoading: false,
    resetPasswordLoaded: false,
    resetPasswordFailed: false,
});
