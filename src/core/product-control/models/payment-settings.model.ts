/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class PaymentSetting {
  public id: any;
  public pluginAdditionalInfo: any;
  public pluginAvatar: any;
  public pluginAvatarPath: any;
  public pluginName: any;
  public pluginStatus: any;
  public pluginType: any;

  constructor(registerRequest: any) {
    this.id = registerRequest.id || '';
    this.pluginAdditionalInfo = registerRequest.pluginAdditionalInfo || '';
    this.pluginAvatar = registerRequest.pluginAvatar || '';
    this.pluginAvatarPath = registerRequest.pluginAvatarPath || '';
    this.pluginName = registerRequest.pluginName || '';
    this.pluginStatus = registerRequest.pluginStatus || '';
    this.pluginType = registerRequest.pluginType || '';
  }
}
