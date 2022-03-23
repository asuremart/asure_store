/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  @ViewChild('todo') todo: ElementRef;

  public pageSize = 5;
  public index = 0;
  public id: any;
  public status: any = 'opened';
  public imageUrl = environment.imageUrl;
  public cancelRequest;
  public cancelStatus = true;
  public queryData: any = {};

  // Pagination
  public limit = 5;
  public offset: any = 0;
  public page: any = 1;
  public pageCount: any;
  public productCount: any;


  constructor(public sandbox: AccountSandbox, public route: ActivatedRoute, public router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.page = this.route.snapshot.queryParamMap.get('index');
    this.getOrderList();
    this.getOrderListCount();

  }

  // Get Order List api

  getOrderList() {
    const params: any = {};
    if (this.status === 'opened') {

      this.limit = 5;
      // this.offset = 0;
      // this.page = 1;
      params.limit = this.limit;
      params.offset = this.offset;


    } else if (this.status === 'cancelled') {
      this.limit = 5;
      this.offset = 0;
      this.page = 1;
      params.limit = this.limit;
      params.offset = this.offset;


    } else if (this.status === 'closed') {
      this.limit = 5;
      this.offset = 0;
      this.page = 1;
      params.limit = this.limit;
      params.offset = this.offset;
      this.page = 1;


    }

    params.count = '';
    params.keyword = '';

    params.status = this.status;
    this.sandbox.getOrderList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.page || 1;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  // Get Order List Count api

  getOrderListCount() {
    const params: any = {};
    params.limit = 5;
    params.offset = 0;
    params.count = 1;
    params.keyword = '';
    params.status = this.status;
    this.sandbox.getOrderListCount(params);
    this.sandbox.orderListCount$.subscribe(data => {
      if (data) {
        this.productCount = data;
        if (this.productCount) {

          this.pageCount = this.productCount / this.limit;

          this.pageCount = Math.ceil(this.pageCount);

        }

      }
    });
  }


  // pageination

  pageEvent(event) {
    this.page = event;

    this.offset = (event - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.status = this.status;
    // this.sandbox.getOrderList(params);
    this.getOrderList();
  }
  // search

  search(value) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.count = '';
    params.keyword = value;
    params.status = this.status;
    if (value) {
      this.sandbox.getOrderList(params);
    } else if (value === '') {
      this.getOrderList();
    }
  }

  reset() {
    this.todo.nativeElement.value = '';
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.count = '';
    params.keyword = '';
    this.sandbox.getOrderList(params);
  }

  // download invoicethis

  downloadInvoice(id) {
    this.id = id;
    this.sandbox.downloadInvoice({ orderProductId: id });
  }

  // pagination page change

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageIndex * event.pageSize;
    this.getOrderList();
  }

  cancelOrder(list) {
    this.router.navigate(['/account/cancel-order/', list.orderProductId]);
  }

  tabsChange(selected) {
    this.status = selected;
    this.getOrderListCount();
    this.getOrderList();
    this.getOrderListCount();
  }
}
