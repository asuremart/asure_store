/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public orderProductId: any;
  public imageUrl = environment.imageUrl;
  public id: any;

  constructor(public route: ActivatedRoute,
              public sandbox: AccountSandbox) {
                this.route.params.subscribe(data => {
                this.orderProductId = data.id;
               });
    }

  ngOnInit() {
    if (this.orderProductId) {
      this.sandbox.myOrderDetails({orderProductId: this.orderProductId});
    }
  }

  // download invoice

  downloadInvoice(id) {
    this.id = id;
    this.sandbox.downloadInvoice({orderProductId: id});
  }


}
