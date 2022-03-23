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
  OnInit,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { WishlistSandbox } from '../../../core/wishlist/wishlist.sandbox';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: any;

  // Pagination
  public limit = 12;
  public offset: any = 0;
  public page = 1;
  public Selected = false;
  public pageEventValue: any;
  public productCount: any;
  public pagination: any;
  public pageCount: any;

  public productss: any = [];
  public sub: any;
  public id: any;

  // side nav
  public sidenavOpen = true;
  // card view
  public viewType = 'grid';
  public viewCol = 25;
  public sortings: Array<any>;
  public sortData: any = 'Price Low To High';
  public condition: any;
  public cardList = false;
  public cardgrid = true;
  // parameters for product list
  public startKey: any = 0;
  public viewOrder = 'ASC';
  public keyword = '';
  public categoryId = '';
  public categorySlug = '';
  public brand: any = '';
  public priceFrom = '';
  public priceTo: any = '';
  public index: any;
  // load image path
  public imagePath: string;
  // product list
  public isClicked: any = [];
  public queryParams: any;
  // discount price
  public discountPrice = 20;
  public fiftyPercent = 50;
  public subscription: Array<Subscription> = [];
  public attributeData: any = [];
  public currentAttributeId = 0;
  public currentAttribute: any = [];
  public variantValue = '';
  public selectedAttribute: any = {};
  public checkedAttribute: any = {};
  public selectedAttributeValues: any = [];
  public filterParams: any = {};
  public attributeValue: any;
  public count: any;
  public splittedAttribute: any = [];




  public isWish: any = {};
  product: any;
  isAdd: any[];
  type: string;

  public currentUser: any;

  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
  details: any = [];
  items: any;
  widgetId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    public wishlistSandbox: WishlistSandbox,
    public controlSandbox: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // subscribe route params
    this.subscription.push(
      this.activatedRoute.queryParams.subscribe(query => {
        if (query['keyword']) {
          this.keyword = query['keyword'];
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('keywordData', query['keyword']);
            this.keyword = localStorage.getItem('keywordData');
          }
        }

      })
    );
    this.subscription.push(
      this.activatedRoute.params.subscribe(param => {
        this.queryParams = param;
        this.variantValue = '';
        this.attributeData = [];
        this.currentAttributeId = 0;
        this.currentAttribute = [];
        this.variantValue = '';
        this.selectedAttribute = {};
        this.checkedAttribute = {};
        this.selectedAttributeValues = [];

        this.attributeValue = '';
        this.categoryId = '';
        if (this.queryParams.id) {
          if (this.queryParams.id === 'All') {
            this.attributeData = [];
            this.currentAttributeId = 0;
            this.currentAttribute = [];
            this.variantValue = '';
            this.selectedAttribute = {};
            this.checkedAttribute = {};
            this.selectedAttributeValues = [];
          }
          this.startKey = 0;
          this.index = 1;

        }
      })
    );
    this.priceFrom = this.activatedRoute.snapshot.queryParamMap.get('priceFrom');
    this.priceTo = this.activatedRoute.snapshot.queryParamMap.get('priceTo') ? this.activatedRoute.snapshot.queryParamMap.get('priceTo') : '30000';
    this.brand = this.activatedRoute.snapshot.queryParamMap.get('brand');
    this.variantValue = this.activatedRoute.snapshot.queryParamMap.get('variantValue');
    this.attributeValue = this.activatedRoute.snapshot.queryParamMap.get('attribute') ? this.activatedRoute.snapshot.queryParamMap.get('attribute') : '';
    this.startKey = this.activatedRoute.snapshot.queryParamMap.get('offset') ? this.activatedRoute.snapshot.queryParamMap.get('offset') : 0;
    this.offset = this.activatedRoute.snapshot.queryParamMap.get('offset') ? this.activatedRoute.snapshot.queryParamMap.get('offset') : 0;
    this.index = this.activatedRoute.snapshot.queryParamMap.get('index') ? this.activatedRoute.snapshot.queryParamMap.get('index') : 1;





    this.activatedRoute.queryParams.subscribe(data => {
      if (data && data.page) {
        this.page = data.page;
        this.offset = this.limit * (this.page - 1);
      }
    });



  }

  // initially remove local storage and calls listSandbox getSettings
  ngOnInit() {
    this.widgetId = this.activatedRoute.snapshot.paramMap.get('id');

    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }

    if (this.product) {
      if (this.product.wishListStatus && this.product.wishListStatus === 1) {
        this.isWish[this.product] = 'warn';
      }
      if (this.product.cartCount > 0) {
        this.count = this.product.cartCount;
      }
    }


    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('fromPrice');
      localStorage.removeItem('priceTo');
    }

    this.sortings = [
      { order: 'Price Low To High', value: 'ASC' },
      { order: 'Price High To Low', value: 'DESC' }
    ];
    this.imagePath = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }
    this.viewList();
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = '';
    params.sku = '';
    params.widgetId = this.widgetId;
    this.listSandbox.widgetDetail(params);
    this.widgetDetailCount();
    this.listSandbox.widgetDetailCount$.subscribe(data => {
      if (data) {
        this.productCount = data;
        if (this.productCount) {
          this.pageCount = this.productCount / this.limit;
          this.pageCount = Math.ceil(this.pageCount);
        }
      }
    });
  }
  widgetDetailCount() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = '';
    params.sku = '';
    params.widgetId = this.widgetId;
    params.count = 1;
    this.listSandbox.widgetDetailCount(params);
  }


  viewList() {
    this.listSandbox.widgetDetail$.subscribe(data => {
      if (data) {
        this.items = data.widgetItems;
      }
    });
  }



  pageEvent(event) {
    this.index = event;
    this.offset = (event - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = '';
    params.sku = '';
    params.widgetId = this.widgetId;
    this.listSandbox.widgetDetail(params);
    this.widgetDetailCount();
  }
  public openProductDialog(product) {
    this.productss = [];
    this.productss.push(product);

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      panelClass: 'product-dialog',
      data: { details: this.productss[0], page: 'widgetDetail' },
    });
    dialogRef.afterClosed().subscribe(products => {
      if (this.currentUser) {
      }
      if (products) {
        this.router.navigate(['/products/productdetails', products.productSlug]);
      }
    });
  }

  public addToWishList(product) {
    if (this.isWish[this.product] && this.isWish[this.product] === 'warn') {
      this.isWish[product] = '';
      const params: any = {};
      params.wishlistProductId = product.productId;
      this.wishlistSandbox.deleteWishlist(params);
    } else {
      this.isWish[product] = 'warn';
      this.isAdd = [];
      this.isAdd[product.productId] = true;
      let currentUser: any;
      if (isPlatformBrowser(this.platformId)) {
        currentUser = JSON.parse(localStorage.getItem('storeUser'));
      }
      if (currentUser) {
        const params: any = {};
        params.productId = product.productId;
        params.productOptionValueId = '';
        this.controlSandbox.addToWishlist(params);
      } else {
        if (this.type === 'popup') {
          this.closePopup.emit('close');
        }
        this.router.navigate(['/auth']);
      }
    }
  }

  receiveProgress(event) {
    this.priceFrom = '';
    this.brand = event.manufacturerId;
    this.priceFrom = event.priceFrom;
    this.priceTo = event.priceTo;
    this.condition = event.condition;
    const defaultCallValue = this.viewOrder;
    this.categorySlug = event.categoryslug;
    if (this.categorySlug === 'All') {
      this.categorySlug = '';
    }
    this.variantValue = event.variant;
    this.startKey = 0;
    this.index = 0;
  }

  calculatePrice(price: number, taxType: number, taxValue: number) {
    switch (taxType) {
      case 1:
        const priceWithOutTax = +price + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = price * (taxValue / 100);
        const priceWithTax = +price + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return price;
    }
  }

  isEmptyObject(obj) {
  }

  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
