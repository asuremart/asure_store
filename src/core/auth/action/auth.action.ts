/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';
import {LoginResponseModel} from '../models/loginResponse.model';
import {LoginModel} from '../models/login.model';
import {RegisterModel} from '../models/register.model';
import { OauthModel } from '../models/oauth.model';

export const ActionTypes = {

    // login actions
    DO_LOGIN: type('[login] do login'),
    DO_LOGIN_SUCCESS: type('[login] do login success'),
    DO_LOGIN_FAIL: type('[login] do login fail'),

    // login actions
    DO_OAUTH_LOGIN: type('[login] do oauth login'),

    // register actions
    DO_REGISTER: type('[login] do register'),
    DO_REGISTER_SUCCESS: type('[login] do register success'),
    DO_REGISTER_FAIL: type('[login] do register fail'),

    // recover account action
    DO_RECOVER: type('[login] do recover'),
    RECOVER_SUCCESS: type('[login] do recover success'),
    RECOVER_FAIL: type('[login] do recover fail'),

     // verification  actions
     DO_VERIFICATION: type('[login] do verfication'),
     DO_VERIFICATION_SUCCESS: type('[login] do verfication success'),
     DO_VERIFICATION_FAIL: type('[login] do verfication fail'),


     // reset password actions
     DO_RESET_PASSWORD: type('[login] do reset password'),
     DO_RESET_PASSWORD_SUCCESS: type('[login] do reset password success'),
     DO_RESET_PASSWORD_FAIL: type('[login] do reset password fail'),

};
// login actions
export class DoLogin implements Action {
    type = ActionTypes.DO_LOGIN;

    constructor(public payload: LoginModel) {
    }
}

export class DoLoginSuccess implements Action {
    type = ActionTypes.DO_LOGIN_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class DoLoginFail implements Action {
    type = ActionTypes.DO_LOGIN_FAIL;

    constructor(public payload: any) {
    }
}

// oauth login actions
export class DoOauthLogin implements Action {
    type = ActionTypes.DO_OAUTH_LOGIN;

    constructor(public payload: OauthModel) {
    }
}


export class DoRegister implements Action {
    type = ActionTypes.DO_REGISTER;

    constructor(public payload: RegisterModel) {
    }
}

export class DoRegisterSuccess implements Action {
    type = ActionTypes.DO_REGISTER_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class DoRegisterFail implements Action {
    type = ActionTypes.DO_REGISTER_FAIL;

    constructor(public payload: any) {
    }
}
// recover account action

export class RecoverAccount implements Action {
    type = ActionTypes.DO_RECOVER;

    constructor(public payload: any) {
    }
}

export class RecoverAccountSuccess implements Action {
    type = ActionTypes.RECOVER_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class RecoverAccountFail implements Action {
    type = ActionTypes.RECOVER_FAIL;

    constructor(public payload: any) {
    }
}

 // verification  actions

export class  Verification implements Action {
    type = ActionTypes.DO_VERIFICATION;

    constructor(public payload: any) {
    }
}

export class VerificationSuccess implements Action {
    type = ActionTypes.DO_VERIFICATION_SUCCESS;

    constructor(public payload: any) {
    }
}
export class VerificationFail implements Action {
    type = ActionTypes.DO_VERIFICATION_FAIL;

    constructor(public payload: any) {
    }
}



 // reset password actions

 export class  ResetPassword implements Action {
    type = ActionTypes.DO_RESET_PASSWORD;

    constructor(public payload: any) {
    }
}

export class  ResetPasswordSuccess implements Action {
    type = ActionTypes.DO_RESET_PASSWORD_SUCCESS;

    constructor(public payload: any) {
    }
}
export class ResetPasswordFail implements Action {
    type = ActionTypes.DO_RESET_PASSWORD_FAIL;

    constructor(public payload: any) {
    }
}
export type Actions
    = DoLogin|
    DoLoginSuccess|
    DoLoginFail|
    DoOauthLogin|
    DoRegister|
    DoRegisterSuccess|
    DoRegisterFail|
    RecoverAccount|
    RecoverAccountSuccess|
    RecoverAccountFail |
    Verification |
    VerificationSuccess |
    VerificationFail |
    ResetPassword |
    ResetPasswordSuccess |
    ResetPasswordFail ;
