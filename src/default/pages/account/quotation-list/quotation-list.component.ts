/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {

  // Pagination
  public limit = 5;
  public offset: any;
  public page: any;
  public pageCount: any;
  public productCount: any;
  public queryData: any = {};
  constructor(
    public accountSandbox: AccountSandbox,
    public listSandbox: ListsSandbox,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.page = this.route.snapshot.queryParamMap.get('index');
    this.getQuotationList();
    this.getQuotationListCount();

  }

  getQuotationList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.count = '';
    this.accountSandbox.getQuotationList(params);
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

  getQuotationListCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = 1;
    this.accountSandbox.getQuotationListCount(params);
    this.accountSandbox.quotationListCount$.subscribe(data => {
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
    this.getQuotationList();
    // this.accountSandbox.getQuotationList(params);
  }

}
