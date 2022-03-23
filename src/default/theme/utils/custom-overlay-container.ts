/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable()
export class CustomOverlayContainer extends OverlayContainer {
    _createContainer(): void {
        const container = document.createElement('div');
        container.classList.add('cdk-overlay-container');
        document.getElementById('app').appendChild(container);
        this._containerElement = container;
    }
}
