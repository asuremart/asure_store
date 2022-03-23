/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID = 'facebook';
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();

  constructor(private clientId: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = 'facebook';
    this.loginProviderObj.url = 'https://connect.facebook.net/en_US/sdk.js';
  }
  static drawUser(response: any): SocialUser {
    const user: SocialUser = new SocialUser();
    user.id = response.id;
    user.name = response.name;
    user.email = response.email;
    user.token = response.token;
    user.image =
      'https://graph.facebook.com/' + response.id + '/picture?type=normal';
    return user;
  }
  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
        FB.init({
          appId: this.clientId,
          autoLogAppEvents: true,
          cookie: true,
          xfbml: true,
          version: 'v2.10'
        });
        FB.AppEvents.logPageView();

      });
    });
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
        FB.init({
          appId: this.clientId,
          autoLogAppEvents: true,
          cookie: true,
          xfbml: true,
          version: 'v2.10'
        });
        FB.AppEvents.logPageView();
            FB.login(
              (responses: any) => {
                if (responses.authResponse) {
                  const accessToken = FB.getAuthResponse()['accessToken'];
                  FB.api('/me?fields=name,email,picture', (res: any) => {
                    resolve(
                      FacebookLoginProvider.drawUser(
                        Object.assign({}, { token: accessToken }, res)
                      )
                    );
                  });
                }
              },
              { scope: 'email,public_profile' }
            );
          // }
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve(null);
      });
    });
  }
}
