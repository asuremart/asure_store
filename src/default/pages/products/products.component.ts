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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: any;


  // Pagination
  public limit = 18;
  public offset: any = 0;
  public page = 1;
  public Selected = false;
  public pageEventValue: any;
  public productCount: any;
  public pagination: any;
  public pageCount: any;

  public productss: any = [];


  // side nav
  public sidenavOpen = true;
  // card view
  public viewType = 'grid';
  public viewCol = 33.33;
  public sortings: Array<any>;
  public sortData: any = '';
  public condition: any;
  public cardList = false;
  public cardgrid = true;
  // parameters for product list
  public startKey: any = 0;
  public viewOrder = '';
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
          this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
        }
        if (query['brand']) {
          this.brand = query['brand'];
          this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
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
          if (this.queryParams.id === 'All' && this.brand === '') {
            this.isClicked = [];
            this.brand = '';
            this.keyword = '';
            this.categoryId = '';
            this.categorySlug = '';
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          } else if (this.queryParams.id === 'All' && this.brand !== '') {
            this.isClicked = [];
            this.brand = this.brand;
            this.keyword = '';
            this.categoryId = '';
            this.categorySlug = '';
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          } else {
            this.isClicked = [];
            this.isClicked[this.queryParams.id] = true;
            this.categoryId = this.queryParams.id;
            this.categorySlug = this.queryParams.id;
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          }
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
    this.getProductList(this.startKey, this.viewOrder, this.categorySlug);





    this.activatedRoute.queryParams.subscribe(data => {
      if (data && data.page) {
        this.page = data.page;
        this.offset = this.limit * (this.page - 1);
      }
    });



  }

  // initially remove local storage and calls listSandbox getSettings
  ngOnInit() {

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

    if (!this.queryParams.id && this.keyword === '') {
      this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
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
  }

  /**
   * fetch product list from service. calling getProductList function from sandbox
   *
   * @param limit number of records to be load
   * @param offset startkey of the records to be load
   * @param manufacturerId brand id to be filtered
   * @param categoryId category id to be filtered
   * @param price price to be filtered
   * @param priceFrom filter (from price)
   * @param keyword filter (to price)
   */
  getProductList(offset, price, category) {


    const params: any = {};
    if (this.Selected === true && this.viewOrder === 'DESC' && this.pageEventValue) {
      this.limit = 18;
      this.offset = 0;
      params.limit = this.limit;
      params.offset = this.offset;
      this.page = 1;
    }
    if (this.Selected === false && this.viewOrder === 'ASC' && this.pageEventValue) {
      this.limit = 18;
      this.offset = 0;
      params.limit = this.limit;
      params.offset = this.offset;
      this.page = 1;
    }
    if (this.pagination !== category) {
      this.limit = 18;
      this.offset = 0;
      params.limit = this.limit;
      params.offset = this.offset;
      this.page = 1;
    } else {
      params.limit = this.limit;
      params.offset = this.offset;
    }

    if (this.brand == null) {
      this.brand = '';
    }
    params.manufacturerId = this.brand;
    params.categoryslug = category;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('categoryIdDataKey', this.categoryId);
    }
    params.keyword = this.keyword;
    params.price = price;
    if (this.priceFrom) {
      params.priceFrom = this.priceFrom;
    } else {
      params.priceFrom = 0;
    }
    if (this.condition) {
      params.condition = this.condition;
    }
    if (this.variantValue) {
      params.variant = this.variantValue;
    }
    const attributeValues: any = [];
    const selectedAttributeValues: any = [];
    if (this.selectedAttribute) {
      const selectedAttributeKey = Object.keys(this.selectedAttribute);
      if (selectedAttributeKey && selectedAttributeKey.length > 0) {
        selectedAttributeKey.forEach(variant => {
          if (this.selectedAttribute[variant]) {
            const selectedAttributeSectionKeys = Object.keys(this.selectedAttribute[variant]);
            if (selectedAttributeSectionKeys && selectedAttributeSectionKeys.length > 0) {
              selectedAttributeSectionKeys.forEach(sectionName => {
                if (this.selectedAttribute[variant][sectionName] && this.selectedAttribute[variant][sectionName].length > 0) {
                  this.selectedAttribute[variant][sectionName].forEach(element => {
                    attributeValues.push(sectionName + '~' + element.itemName);
                    selectedAttributeValues.push({
                      sectionName: sectionName,
                      itemName: element.itemName,
                      item: element,
                      id: variant
                    });
                  });
                }
              });
            }
          }
        });
      }
    }
    this.selectedAttributeValues = selectedAttributeValues;

    if (attributeValues && attributeValues.length) {
      params.attribute = attributeValues.join(',');
      this.filterParams.attribute = attributeValues.join(',');
    } else {
      this.filterParams.attribute = '';
    }
    params.priceTo = this.priceTo;

    this.filterParams.priceFrom = this.priceFrom;
    this.filterParams.priceTo = this.priceTo;
    this.filterParams.brand = this.brand;
    this.filterParams.condition = this.condition;
    this.filterParams.categorySlug = this.categorySlug;
    this.filterParams.variantValue = this.variantValue;
    this.filterParams.defaultCallValue = this.viewOrder;
    this.filterParams.offset = this.offset;
    this.filterParams.index = this.index;
    this.listSandbox.getProductList(params);
    params.price = '';
    params.count = true;
    this.pagination = params.categoryslug;
    this.listSandbox.getProductCount(params);

    this.listSandbox.productcount$.subscribe(data => {
      if (data) {
        this.productCount = data;
        if (this.productCount) {

          this.pageCount = this.productCount / this.limit;

          this.pageCount = Math.ceil(this.pageCount);

        }

      }
    });

  }


  pageEvent(event) {
    if (this.Selected === false && this.viewOrder === 'ASC' && this.productCount) {
      this.Selected = true;
      this.pageEventValue = event;

    }
    if (this.Selected === true && this.viewOrder === 'DESC' && this.productCount) {
      this.Selected = false;

    }
    this.index = event;
    this.offset = (event - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    this.getProductList(params, this.viewOrder, this.categorySlug);
    this.router.navigate(
      ['/products', this.categorySlug],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });


  }
  /**
   * open quick view of the product
   *
   * @param data passing selected product detail to dialog
   */
  public openProductDialog(product) {
    this.productss = [];
    this.productss.push(product);

    const dialogRef = this.dialog.open(ProductDialogComponent, {
      panelClass: 'product-dialog',
      data: { details: this.productss[0], page: 'product' },
    });
    dialogRef.afterClosed().subscribe(products => {
      if (this.currentUser) {
      }
      if (products) {
        this.router.navigate(['/products/productdetails', products.productSlug]);
      }
    });
  }

  // sidebar open close based on the window size
  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
    window.innerWidth < 1280 ? (this.viewCol = 33.3) : (this.viewCol = 33.33);
  }


  // changing the view type
  public changeViewType(viewType, viewCol) {
    if (viewType === 'list') {
      this.cardList = true;
      this.cardgrid = false;
    } else if (viewType === 'grid') {
      this.cardgrid = true;
      this.cardList = false;
    }
    this.viewType = viewType;
    this.viewCol = viewCol;
  }


  // calls getProductList for sorting list
  public changeSorting(sort) {
    this.sortData = sort.order;
    this.viewOrder = sort.value;
    this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
  }


  attributeList(event) {
    if (event && event.length > 0) {
      this.attributeData = event;
      this.splitAttribute();

    } else {
      this.attributeData = [];
      this.currentAttributeId = 0;
      this.currentAttribute = [];
      this.variantValue = '';
      this.selectedAttribute = {};
      this.checkedAttribute = {};
      this.selectedAttributeValues = [];
      this.attributeValue = '';
    }
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

  splitAttribute() {
    if (this.attributeValue) {
      const commaSplited = this.attributeValue.split(',');
      const tildSplited = commaSplited.map(data => {
        return data.split('~');
      });
      this.splittedAttribute = tildSplited.map(data => {
        return { group: data[0], children: data[1] };
      });
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          this.splittedAttribute.forEach((splitVal) => {
            if (splitVal.group === varr.sectionName) {
              if (varr.sectionItem && varr.sectionItem.length > 0) {
                varr.sectionItem = varr.sectionItem.map(sec => {
                  if (sec.itemName === splitVal.children) {
                    const opts = { ...sec, selected: true };
                    sec = Object.assign({}, opts);
                    this.selectAttribute(varr.id, varr.sectionName, sec, true);
                    this.openAttribute(varr, varr.id);
                  }
                  return Object.assign({}, sec);
                });
              }
            }
          });
        });
      }
    }
  }

  openAttribute(itemDetail: any, attributeId: number) {
    this.currentAttribute = itemDetail;
    this.currentAttributeId = attributeId;
  }

  public checkAttribute(sectionId: number, sectionName: string, itemDetail: any) {
    if (!this.selectedAttribute[sectionId]) {
      return false;
    }
    if (!this.selectedAttribute[sectionId][sectionName]) {
      return false;
    }
    const idx = this.selectedAttribute[sectionId][sectionName].indexOf(itemDetail);
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  }

  public selectAttribute(sectionId: number, sectionName: string, itemDetail: any, checked: boolean) {


    if (!checked) {
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          if (varr.sectionItem && varr.sectionItem.length > 0) {
            varr.sectionItem = varr.sectionItem.map(item => {
              if (item.id === itemDetail.id) {
                const opts = { ...item, selected: false };
                item = Object.assign({}, opts);
              }
              return Object.assign({}, item);
            });
          }
        });
      }
    } else {
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          if (varr.sectionItem && varr.sectionItem.length > 0) {
            varr.sectionItem = varr.sectionItem.map(item => {
              if (item.id === itemDetail.id) {
                const opts = { ...item, selected: true };
                item = Object.assign({}, opts);
              }
              return Object.assign({}, item);
            });
          }
        });
      }
    }

    if (!this.selectedAttribute[sectionId]) {
      this.selectedAttribute[sectionId] = {};
    }
    if (!this.selectedAttribute[sectionId][sectionName]) {
      this.selectedAttribute[sectionId][sectionName] = [];
    }

    const isPresent = this.selectedAttribute[sectionId][sectionName].some(function (el) { return el.id === itemDetail.id; });

    if (isPresent) {

      this.selectedAttribute[sectionId][sectionName] = this.selectedAttribute[sectionId][sectionName].filter(data => {
        if (data.id === itemDetail.id) {
          return false;
        } else {
          return true;
        }
      });

      if (this.selectedAttribute[sectionId][sectionName] && this.selectedAttribute[sectionId][sectionName].length === 0) {
        delete this.selectedAttribute[sectionId][sectionName];
      }
      const sectionObjectArray = Object.keys(this.selectedAttribute[sectionId]);
      if (!sectionObjectArray || sectionObjectArray.length === 0) {
        delete this.selectedAttribute[sectionId];
      }

    } else {
      this.selectedAttribute[sectionId][sectionName].push(itemDetail);
    }

    const defaultCallValue = this.viewOrder;
    this.startKey = 0;
    this.index = 1;
    this.getProductList(0, defaultCallValue, this.categorySlug);
  }
  /**
   *  receive data which is emitted from the child component through event emitter,
   * set's local storage value(brandKey). And calls getProductList.
   *
   *  @param event from event  emitter.
   *
   *  **/
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
    this.getProductList(0, defaultCallValue, this.categorySlug);
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
