/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../service/config.service';

@Injectable()
export class UtilService {
  constructor(
    private translateService: TranslateService,
    private configService: ConfigService
  ) {}

  /**
   * Translates given message code and title code and displays corresponding notification
   *
   * @param messageTranslationCode
   * @param type
   * @param titleTranslationCode
   */
}
