/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';
import { CartSandbox } from '../../../core/cart/cart.sandbox';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {


  public imagePath: string;
  public semiColon = ':';
  private subscription: Array<Subscription> = [];

  public currentUser: any;

  // tire price
  public tirePriceArray: any = [];
  public tirePrice: any;
  public quantity = 0;

  constructor(
    public productControl: ProductControlSandbox,
    private configService: ConfigService,
    public listSandbox: ListsSandbox,
    public router: Router,
    public cartBaseSandbox: CartSandbox,
    private changeDetectRef: ChangeDetectorRef,
    private titleService: Title,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        this.currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }
    this.titleService.setTitle('Cart');
    this.imagePath = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();
    this.subscription.push(
      this.productControl.cartlist$.subscribe(data => {
        this.changeDetectRef.detectChanges();
      })
    );
  }

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
        if (product.productCount === 1) {
          this.quantity = 0;
          this.removeProduct(product);
          return;
        } else if (product.productCount > product.minQuantityAllowedCart) {
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
    this.productControl.ChangeCount(product, operation);
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
      this.cartBaseSandbox.doAddToCart(params);
    }
  }


  // remove product from cart
  removeProduct(product) {
    if (this.currentUser) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      params.quantity = 0;
      params.varientName = product.variantName;
      params.productVarientOptionId = product.variantId;
      params.skuName = product.skuName;
      if (product.productOption && product.productOption.length > 0) {
        params.optionName = '';
        params.optionValueName = '';
      }
      params.productOptionValueId = product.selectedOptions;
      params.type = 'new';
      this.cartBaseSandbox.doAddToCart(params);
    }
    this.productControl.removeItemFromCart(product);
  }

  // calculation (tire price)
  calculatePrice(option: number, price: number, taxType: number, taxValue: number) {
    switch (taxType) {
      case 1:
        const priceWithOutTax = ((+price) + (+option)) + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = price * (taxValue / 100);
        const priceWithTax = ((+price) + (+option)) + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return ((+price) + (+option));
    }
  }

  calculateOriginalPrice(price: number, taxType: number, taxValue: number) {
    switch (taxType) {
      case 1:
        const priceWithOutTax = (+price) + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = price * (taxValue / 100);
        const priceWithTax = (+price) + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return (+price);
    }
  }

  // clear cart
  public clear() {
    if (this.currentUser) {
      const params: any = {};
      params.cartId = '';
      this.cartBaseSandbox.deleteFromCart(params);
    }
    this.productControl.clearCart();
  }

  // navigation to checkout component.And set local storage
  public checkoutPage() {
    const checkoutToken = '1';
    this.router.navigate(['/checkout']);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('checkout', checkoutToken);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
