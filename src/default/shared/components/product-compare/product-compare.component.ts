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
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCompareSandbox } from '../../../../core/product-compare/product-compare.sandbox';


@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.scss']
})

export class ProductCompareComponent implements OnInit {

  public selectedCompare: any = [];
  @Input() product: any;

  public compareProductId = [];

  constructor(
    public compareSandbox: ProductCompareSandbox,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() { }


  removeProductFromCompare(id) {
    let currentId;
    if (isPlatformBrowser(this.platformId)) {
      currentId = JSON.parse(localStorage.getItem('compareId'));
    }
    currentId = currentId.filter(ids => {
      if (ids === id) {
        return false;
      } else {
        return true;
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('compareId', JSON.stringify(currentId));
    }
    this.snackBar.open('Products removed successfully', '×', {
      panelClass: 'success',
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000
    });
    if (currentId.length > 0) {
      this.compareSandbox.addCompareCount(currentId);

      const compare = currentId.toString();
      const compareParam: any = {};
      compareParam.data = 1;
      compareParam.productId = compare;
      this.compareSandbox.compareProducts(compareParam);
    } else {
      this.compareSandbox.clearCompare([]);
    }
  }

  addToCompare(event) {
    let isAdded = false;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('compareId')) {
        this.selectedCompare = JSON.parse(localStorage.getItem('compareId'));
      }
    }
    this.selectedCompare.forEach(val => {
      if (val === event.productId) {
        isAdded = true;
      }
    });
    if (isAdded) {
      this.removeProductFromCompare(event.productId);
      return;
    }
    if (this.selectedCompare.length >= 3) {
      this.showError('Cannot compare more than 3 products');
      return;
    }
    this.selectedCompare.push(event.productId);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('compareId', JSON.stringify(this.selectedCompare));
    }
    this.compareSandbox.addCompareCount(this.selectedCompare);
    const compare = this.selectedCompare.toString();
    this.compareProducts(compare);
  }


  addCompareProducts(product) {

    if (this.compareProductId.length < 0) {
      this.compareProductId[product.productId] = true;
    } else {
      this.compareProductId.map((data, i) => {
        if (i === product.productId) {
          this.compareProductId[product.productId] = false;
        }
      });
    }

    this.compareProductId[product.productId] = true;

  }

  ifProductAlreadySelected(product) {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('compareId')) {
        this.selectedCompare = JSON.parse(localStorage.getItem('compareId'));
        const idContain = this.selectedCompare.includes(product.productId);
        return idContain;
      } else {
        this.selectedCompare = [];
        return false;
      }
    }
  }

  compareProducts(products) {
    const compareParam: any = {};
    compareParam.data = 0;
    compareParam.productId = products;
    this.compareSandbox.compareProducts(compareParam);
  }

  showError(message) {
    this.snackBar.open(message, '×', {
      panelClass: 'error',
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000
    });
  }
}
