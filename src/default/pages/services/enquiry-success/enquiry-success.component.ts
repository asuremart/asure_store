/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {
  Component,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-enquiry-success',
  templateUrl: './enquiry-success.component.html',
  styleUrls: ['./enquiry-success.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnquirySuccessComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
