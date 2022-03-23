/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { ProductControlService } from '../../../../core/product-control/product-control.service';
import { ConfigService } from '../../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { CartSandbox } from '../../../../core/cart/cart.sandbox';
import { CartPopupComponent } from './modal/cart-popup/cart-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Position } from 'ngx-perfect-scrollbar';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-spurt-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ProductControlService, ProductControlSandbox],
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


export class CartNavComponent implements OnInit {

  public imagePath: string;
  public flagValue = '0';
  @Input()
  ngSwitch: any;
  menuState = 'in';
  public currentUser: any;

  constructor(
    public sidenavMenuService: SidenavMenuService,
    public cartSandbox: ProductControlSandbox,
    public cartBaseSandbox: CartSandbox,
    public router: Router,
    public listSandbox: ListsSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = JSON.parse(localStorage.getItem('storeUser'));
      this.imagePath = this.configService.getImageUrl();
    }
  }

  viewCartPopup() {

    const dialogRef = this.dialog.open(CartPopupComponent, {

      panelClass: 'make-quotation',



    });

    dialogRef.afterClosed().subscribe(result => {
      this.menuState = 'out';
      if (result === 'success') {
      }
    });
  }
}
