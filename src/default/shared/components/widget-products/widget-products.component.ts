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
  Input,
  AfterViewInit,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../products-carousel/product-dialog/product-dialog.component';
import { ConfigService } from '../../../../core/service/config.service';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { WishlistSandbox } from '../../../../core/wishlist/wishlist.sandbox';

@Component({
  selector: 'app-widgets-products',
  templateUrl: './widget-products.component.html',
  styleUrls: ['./widget-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetProductsComponent implements OnInit, AfterViewInit {
  public widget: any = [];
  public widgetItems: any = [];
  @Input() products: any;
  @Input() title: any;

  public productss: any = [];


  @Input() type: any;
  @Input() productType: any;
  @Input() indexOfelement: any;
  @Input() widgetId: any;
  public imagePath: string;
  public currentRate = 2;
  public discountPrice = 20;
  public fiftyPercent = 50;
  public config: SwiperConfigInterface = {};
  details: any;
  id: any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public listSandbox: ListsSandbox,
    public snackBar: MatSnackBar,
    public controlSandbox: ProductControlSandbox,
    public wishlistSandbox: WishlistSandbox,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  ngAfterViewInit() {

  }


  configure() {


    if (this.productType === 'today deals') {
      this.config = {
        observer: true,
        slidesPerView: 4,
        spaceBetween: 16,
        keyboard: true,
        navigation: true,
        pagination: false,
        grabCursor: true,
        autoplay: false,
        speed: 900,
        effect: 'slide',
        breakpoints: {
          510: {
            slidesPerView: 2
          },
          850: {
            slidesPerView: 6
          },
          1100: {
            slidesPerView: 6
          },
          1280: {
            slidesPerView: 6
          },

          1500: {
            slidesPerView: 6
          }
        }
      };
      return this.config;

    }

    if (this.productType === 'feature product') {
      this.config = {
        observer: true,
        slidesPerView: 3,
        spaceBetween: 16,
        keyboard: true,
        navigation: true,
        pagination: false,
        grabCursor: true,
        autoplay: false,
        speed: 900,
        effect: 'slide',
        breakpoints: {
          510: {
            slidesPerView: 2
          },
          850: {
            slidesPerView: 2
          },
          1100: {
            slidesPerView: 6
          },
          1280: {
            slidesPerView: 6
          },
          1300: {
            slidesPerView: 6
          },
          1500: {
            slidesPerView: 6
          }
        }
      };
      return this.config;
    }

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
      data: { details: this.productss[0], page: 'widget' },
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(products => {
      if (products) {
        this.router.navigate(['/products/productdetails', products.productSlug]);
      }
    });
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


  public getWidgetProductList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.sku = '';
    this.listSandbox.getWidgetProductList(params);
  }
  public viewAll(id) {

    this.router.navigate(['/widget-list/' + id], { queryParams: { title: this.title } });


  }

}
