/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// component and decorator
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

// sandbox
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';
import { ProductCompareSandbox } from '../../../core/product-compare/product-compare.sandbox';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sidenav: any;
  public lastPath: any;
  public keyword: any;
  public pageInfo: any;
  public sidenavOpen = true;
  private subscription: Array<Subscription> = [];
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard', isClicked: false },
    { name: 'Account Information', href: 'information', icon: 'info', isClicked: false },
    { name: 'Address', href: 'addresses', icon: 'location_on', isClicked: false },
    { name: 'Order History', href: 'myorders', icon: 'add_shopping_cart', isClicked: false },
    { name: 'Quotation Request List', href: 'quotation-list', icon: 'add_shopping_cart', isClicked: false },
    { name: 'Logout', href: '/logout', icon: 'power_settings_new' }
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public productControl: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    public compareSandbox: ProductCompareSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    public commonSandbox: CommonSandbox) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          this.pageInfo = {};
          route.firstChild.url.subscribe(data => {
            if (data.length > 1) {
              this.lastPath = data[1].path;
            }
          });
          route.queryParams.subscribe(data => {
            if (data) {
              this.keyword = data.keyword;
            }
          });
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {

        this.pageInfo = event;

        this.isCheck();
      });
  }

  isCheck() {
    if (this.pageInfo && Object.keys(this.pageInfo).length) {
      if (this.pageInfo.urls && this.pageInfo.urls) {
        this.pageInfo.urls.forEach(data => {
          if (data) {

            this.pageInfo = data.title;
         }
        });
      }
      this.onSelected();
    }

  }

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }


  }

  // calls commonSandbox doSignout function for doing logout
  doLogOut(name) {

    if (name === 'Logout') {
      this.commonSandbox.customerLogOut();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('storeUser');
        localStorage.removeItem('storeUserToken');
        localStorage.removeItem('compareId');

        sessionStorage.clear();
      }
      this.compareSandbox.clearCompare([]);
      this.productControl.clearCart();
      this.commonSandbox.doSignout();
      this.router.navigate(['/auth']);
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }

  // subscribe the event  at finally
  ngAfterViewInit() {
    this.subscription.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (window.innerWidth < 960) {
            this.sidenav.close();
          }
        }
      })
    );
  }


  public onSelected() {


    this.links.forEach(data => {
      if (data) {

        if (data.name === this.pageInfo) {
          data.isClicked = true;
        } else {
          data.isClicked = false;
        }
      }
    });
  }
  public clicked(links) {

    this.links.forEach(data => {
      if (data) {
        if (data.name === links.name) {
          data.isClicked = true;
        } else {
          data.isClicked = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
