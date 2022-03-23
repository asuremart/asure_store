/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CartSandbox } from '../../../../../../core/cart/cart.sandbox';
import { ProductControlSandbox } from '../../../../../../core/product-control/product-control.sandbox';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../../../core/service/config.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-cart-popup',
  templateUrl: 'cart-popup.component.html',
  styleUrls: ['cart-popup.component.scss'],
  animations: [
    trigger('fadeInAnimation', [

      // route 'enter' transition
      transition(':enter', [

        // css styles at start of transition
        style({ opacity: 0 }),

        // animation and styles at end of transition
        animate('.3s', style({ opacity: 1 }))
      ]),
    ]),
  ],
  host: { '[@fadeInAnimation]': '' }

})


export class CartPopupComponent implements OnInit, OnDestroy {

  public subscriptions: Array<Subscription> = [];
  public currency: any = {};
  public submitted = false;
  public menuState = 'in';
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));
  public imagePath: string;

  // tire price
  public tirePriceArray: any = [];
  public tirePrice: any;
  public quantity = 0;


  constructor(
    public cartSandbox: CartSandbox,
    public productControlSandbox: ProductControlSandbox,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    public listSandbox: ListsSandbox,
    public configService: ConfigService,
    public snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CartPopupComponent>) {
  }

  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('currency'));
    this.imagePath = this.configService.getImageUrl();
    this.productControlSandbox.cartlist$.subscribe(data => {
      if (data) {
        }
    });

  }

  // remove product from cart
  remove(product) {
    if (this.currentUser) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      params.varientName = product.variantName;
      params.productVarientOptionId = product.variantId;
      params.skuName = product.skuName;
      params.quantity = 0;
      if (product.productOption && product.productOption.length > 0) {
        params.optionName = '';
        params.optionValueName = '';
      }
      params.productOptionValueId = product.selectedOptions;
      params.type = 'new';
      this.cartSandbox.doAddToCart(params);
    }
    this.productControlSandbox.removeItemFromCart(product);

  }

  public checkoutPage() {
    const checkoutToken = '1';
    this.router.navigate(['/checkout']);
    this.dialogRef.close();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('checkout', checkoutToken);
    }
  }

  public viewCart() {
    this.router.navigate(['/cart']);
    this.dialogRef.close();
  }

  calculatePrice(option: number, price: number, taxType: number, taxValue: number) {
    switch (taxType) {
      case 1:
        const priceWithOutTax = ((+price) + (+option)) + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = ((+price) + (+option)) * (taxValue / 100);
        const priceWithTax = ((+price) + (+option)) + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return ((+price) + (+option));
    }
  }

  // increase or decrease product count(tire price)
  changeCount(product, operation) {
    if (product.hasTirePrice === 1) {
      product.productTirePrices.forEach(data => {
        this.tirePriceArray.push(data.quantity);
      });
    }
    if (product.hasStock === 1) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      if (operation) {
        if (product.productCount >= product.minQuantityAllowedCart && product.productCount < product.maxQuantityAllowedCart) {
          this.quantity = Number(product.productCount) + 1;
          this.addToCart(product, operation);
        } else {
          this.snackBar.open('You have reached the maximum quantity limit', '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000
          });
          return;
        }
      }
      if (!operation) {
        if (product.productCount > product.minQuantityAllowedCart) {
          this.quantity = Number(product.productCount) - 1;
          this.addToCart(product, operation);
        } else {
          return;
        }
      }

    } else {

      if (operation) {
        this.quantity = product.productCount + 1;
        this.addToCart(product, operation);


      } else {
        this.quantity = product.productCount - 1;
        this.addToCart(product, operation);
      }
    }
    this.productControlSandbox.ChangeCount(product, operation);

  }

  addToCart(product, operation) {
    if (this.currentUser) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      params.tirePrice = this.tirePrice;
      params.varientName = product.variantName;
      params.productVarientOptionId = product.variantId;
      params.skuName = product.skuName;
      if (operation) {
        params.quantity = Number(product.productCount) + 1;
      }
      if (!operation) {
        params.quantity = Number(product.productCount) - 1;
      }
      if (product.productOption && product.productOption.length > 0) {
        const tempParams: any = {};
        tempParams.totalOptions = product._totalOptions;
        tempParams.options = product.productOption;
        tempParams.optionValueArray = product._optionValueArray;
        params.optionName = JSON.stringify(tempParams);
        params.optionValueName = '';
      }
      params.productOptionValueId = product.selectedOptions;
      this.cartSandbox.doAddToCart(params);
    }
  }

  close() {
    this.dialogRef.close();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
