/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-get-directions',
  templateUrl: './get-directions.component.html',
  styleUrls: ['./get-directions.component.scss']
})
export class GetDirectionsComponent {

  public zoom = 18;
  public lattitudeLocation = 12.9386328;
  public longitudeLocation = 80.138821;

  constructor() {}
}
