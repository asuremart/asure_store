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

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RelatedProductsComponent implements OnInit, AfterViewInit {

  @Input() products: any;
  @Input() productId: any;

  public config: SwiperConfigInterface = {};
  public imagePath: string;
  public currentRate = 2;
  public discountPrice = 20;
  public fiftyPercent = 50;
  public currentUser: any;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    public listSandbox: ListsSandbox,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService
  ) {}

  // initially get data from config service
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }
    this.imagePath = this.configService.getImageUrl();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      autoplay: false,
      speed: 900,
      effect: 'slide',
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }

  /**
   * open quick view of the product
   *
   * @param data passing selected product detail to dialog
   */
  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(products => {
      if (this.currentUser) {
        this.getRelatedProducts();
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

  getRelatedProducts() {
    const params: any = {};
    params.productId = this.productId;
    this.listSandbox.getRelatedProducts(params);
  }

}
