/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import {DefaultModule} from './default/default.module';
import './icons';
if (environment.production) {
  enableProdMode();
 if (window) {
    window.console.log = function() {};
  }
}


platformBrowserDynamic().bootstrapModule(DefaultModule).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('./ngsw-worker.js');
  }
}).catch(err => console.log(err));
