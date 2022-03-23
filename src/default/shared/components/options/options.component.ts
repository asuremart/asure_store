/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Settings, AppSettings } from '../../../app.settings';
import { CommonService } from '../../../../core/common/common.service';
import { CommonSandbox } from '../../../../core/common/common.sandbox';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {

  public showOptions = true;
  public settings: Settings;
  public color: any;

  /**             CHANGE THE COLORS PLATTE
   * set the color from localStorage,if localStorage have value or else
   * set color by default as green.
   * **/
  constructor(
    public appSettings: AppSettings,
    public commonSandbox: CommonSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    private commonService: CommonService
  ) {
    this.settings = this.appSettings.settings;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('optionsTheme')) {
        const tempColor = localStorage.getItem('optionsTheme');
        this.settings.theme = tempColor;
        this.logo(tempColor);
      } else {
        this.settings.theme = 'green';
        this.logo(this.settings.theme);
      }
    }
  }

  /*** CHANGE THE COLORS PLATTE
   * @param theme from mat-card
   * save  the theme in localStorage as 'optionsTheme'(key).
   * ***/
  public changeTheme(theme) {
    this.settings.theme = theme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('optionsTheme', theme);
    }
  }

  public logo(color) {
    if (color === 'yellow') {
      const params: any = {};
      params.logo = 'true';
      this.commonSandbox.getLogo(params);
    } else {
      const params: any = {};
      params.logo = 'false';
      this.commonSandbox.getLogo(params);
    }

  }
}
