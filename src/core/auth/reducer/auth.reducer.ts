/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/auth.action';
import construct = Reflect.construct;
import { AuthState, authrecord } from './auth.state';

export const initialState: AuthState = (new authrecord() as unknown) as AuthState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AuthState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------ LOGIN -----------> //

    case actions.ActionTypes.DO_LOGIN: {
      return Object.assign({}, state, {
        loginLoading: true,
        loginLoaded: false,
        loginFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGIN_SUCCESS: {
      let validUser = false;
      if (payload.user_token) {
        validUser = true;
      } else {
        validUser = false;
      }
      return Object.assign({}, state, {
        token: payload.user_token,
        tokenValid: validUser,
        loginLoading: false,
        loginLoaded: true,
        loginFailed: false
      });
    }
    case actions.ActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        loginLoading: false,
        loginLoaded: true,
        loginFailed: true
      });
    }

// <------------ REGISTER AS NEW CUSTOMER -----------> //

    case actions.ActionTypes.DO_REGISTER: {
      return Object.assign({}, state, {
        registerLoading: true,
        registerLoaded: false,
        registerFailed: false
      });
    }

    case actions.ActionTypes.DO_REGISTER_SUCCESS: {
      return Object.assign({}, state, {
        token: payload.user_token,
        registerLoading: false,
        registerLoaded: true,
        registerFailed: false
      });
    }
    case actions.ActionTypes.DO_REGISTER_FAIL: {
      return Object.assign({}, state, {
        registerLoading: false,
        registerLoaded: true,
        registerFailed: true
      });
    }

// <------------ RECOVER PASSWORD -----------> //

    case actions.ActionTypes.DO_RECOVER: {
      return Object.assign({}, state, {
        recoverLoading: true,
        recoverLoaded: false,
        recoverFailed: false
      });
    }

    case actions.ActionTypes.RECOVER_SUCCESS: {
      return Object.assign({}, state, {
        token: payload,
        recoverLoading: false,
        recoverLoaded: true,
        recoverFailed: false
      });
    }
    case actions.ActionTypes.RECOVER_FAIL: {
      return Object.assign({}, state, {
        recoverLoading: false,
        recoverLoaded: true,
        recoverFailed: true
      });
    }

// <------------ VERIFICATION ACTION -----------> //

    case actions.ActionTypes.DO_VERIFICATION: {
      return Object.assign({}, state, {
        verificationLoading: true,
        verificationLoaded: false,
        verificationFailed: false
      });
    }

    case actions.ActionTypes.DO_VERIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        verification: payload,
        verificationLoading: false,
        verificationLoaded: true,
        verificationFailed: false
      });
    }
    case actions.ActionTypes.DO_VERIFICATION_FAIL: {
      return Object.assign({}, state, {
        verificationLoading: false,
        verificationLoaded: false,
        verificationFailed: true
      });
    }


// <------------ RESET PASSWORD ACTION -----------> //

case actions.ActionTypes.DO_RESET_PASSWORD: {
  return Object.assign({}, state, {
    resetPasswordLoading: true,
    resetPasswordLoaded: false,
    resetPasswordFailed: false
  });
}

case actions.ActionTypes.DO_RESET_PASSWORD_SUCCESS: {
  return Object.assign({}, state, {
    resetPassword: payload,
    resetPasswordLoading: false,
    resetPasswordLoaded: true,
    resetPasswordFailed: false
  });
}
case actions.ActionTypes.DO_RESET_PASSWORD_FAIL: {
  return Object.assign({}, state, {
    resetPasswordLoading: false,
    resetPasswordLoaded: false,
    resetPasswordFailed: true
  });
}



    default: {
      return state;
    }
  }
}

export const getToken = (state: AuthState) => state.token;
export const getTokenValid = (state: AuthState) => state.tokenValid;

export const getLoginLoading = (state: AuthState) => state.loginLoading;
export const getLoginLoaded = (state: AuthState) => state.loginLoaded;
export const getLoginFailed = (state: AuthState) => state.loginFailed;

export const getRegisterLoading = (state: AuthState) => state.registerLoading;
export const getRegisterLoaded = (state: AuthState) => state.registerLoaded;
export const getRegisterFailed = (state: AuthState) => state.registerFailed;

export const getRecoverLoading = (state: AuthState) => state.recoverLoading;
export const getRecoverLoaded = (state: AuthState) => state.recoverLoaded;
export const getRecoverFailed = (state: AuthState) => state.recoverFailed;

export const verification = (state: AuthState) => state.verification;
export const verificationLoading = (state: AuthState) => state.verificationLoading;
export const verificationLoaded = (state: AuthState) => state.verificationLoaded;
export const verificationFailed = (state: AuthState) => state.verificationFailed;


export const resetPassword = (state: AuthState) => state.resetPassword;
export const resetPasswordLoading = (state: AuthState) => state.resetPasswordLoading;
export const resetPasswordLoaded = (state: AuthState) => state.resetPasswordLoaded;
export const resetPasswordFailed = (state: AuthState) => state.resetPasswordFailed;
