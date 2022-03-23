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
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ConfigService } from '../../../../core/service/config.service';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { WishlistSandbox } from '../../../../core/wishlist/wishlist.sandbox';


@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsCarouselComponent implements OnInit, AfterViewInit {

  @Input() products: any;
  @Input() productType: any;
  public config: SwiperConfigInterface = {};


  public imagePath: string;
  public currentRate = 2;
  public discountPrice = 20;
  public fiftyPercent = 50;
  public productss: any = [];

  public currentUser: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public listSandbox: ListsSandbox,
    public controlSandbox: ProductControlSandbox,
    public wishlistSandbox: WishlistSandbox,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService
  ) { }


  ngOnInit() {


    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }

    this.imagePath = this.configService.getImageUrl();
  }

  getWishList() {
    const params: any = {};
    params.limit = 10;
    params.offset = '';
    this.wishlistSandbox.getWishlist(params);
  }


  ngAfterViewInit() {
    if (this.productType === 'today deals') {
      this.config = {
        observer: true,
        slidesPerView: 4,
        spaceBetween: 14,
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
    }
    if (this.productType === 'feature product') {
      this.config = {
        observer: true,
        slidesPerView: 3,
        spaceBetween: 14,
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
      data: { details: this.productss[0], page: this.productType },
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(products => {
      if (this.currentUser) {
        this.getTodayDealList();
        this.getFeaturedList();
        this.productss = [];

      }
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





  public getFeaturedList() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    params.sku = '';
    this.listSandbox.getFeaturedList(params);
  }

  public getTodayDealList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.sku = '';
    this.listSandbox.getTodayDealList(params);
  }

}
