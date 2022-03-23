/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';

export function menuScrollStrategy(overlay: Overlay): () => BlockScrollStrategy {
    return () => overlay.scrollStrategies.block();
}
