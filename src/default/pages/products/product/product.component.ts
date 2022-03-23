/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../core/service/config.service';
import { Subscription } from 'rxjs';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { MakeQuatationComponent } from '../modal/make-quatation/make-quatation.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('showPanelDates', [
      state('true', style({ transform: 'translateX(-100%)' })),
      transition('true => false', [
        animate('500ms', style({ transform: 'translateX(0%)' }))
      ]),
      transition('false => true', [
        animate('500ms', style({ transform: 'translateX(-100%)' }))
      ]),
    ])
  ]
})


export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
  currentSection = 'description';
  // decorator
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  // checkpincode
  public check = false;
  // configuration
  public config: SwiperConfigInterface = {};
  public configuration: SwiperConfigInterface = {};
  public product: any;
  // images
  public image: any;
  public zoomImage: any;
  public zoomPopupImage: any;
  public imagePath: string;
  public active = false;
  public activeDesc = true;
  public activeQa = false;
  public activeFreq = false;
  public activeReview = false;
  public activeSpecification = false;

  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';
  isLoading: boolean;
  // cart function b2b
  public viewOffers: any;
  public productViewOffers: any = {};
  public productView: any = {};
  public taxValue: any;
  public taxType: any;
  public productPrice: any;


  public state = false;

  public productImageId: number;
  // related product data
  public relatedProducts: Array<any>;

  // route params
  private sub: any;
  private id: any;
  public radioValue: any = 'jh';
  public totalPrice = 0;
  public removeData = [];
  public removePrefix = [];

  // available options
  public optionNameSelected: any = [];
  public cartOptionValueArray: any = [];
  public optionNames: any = [];
  public optionValueArray: any = [];
  public previousValueRadio = '';
  public previousValueDropdown = [];
  public oneTimePush = 'enter';
  public oneTimePushValue = 'enter';
  public deleteArray = false;
  public modeSelect = [];
  public totalProductPrice: number;
  public productPriceTag: number;
  public previousPriceTag: number;
  public tempPriceRefer: number;
  public templateHidden: number;
  public productDetails: any = {};
  public productId: any;
  public pinCode: any;
  public checkPinCode = false;
  public pinCodeError = false;

  // subcription
  private subscriptions: Array<Subscription> = [];
  public isActive = [];
  public user: any;
  public pincodeBasedDelivery = 0;
  public tireBasePrice: any;
  public currentUser: any;

  // default quantity for count change
  public quantity: any = 1;

  // tire price
  public tireQuantityArray: any = [];
  public tirePrice: any = '';
  public currency: any;

  // pushed option value id in this array(unique id)
  public selectedOptions: any = [];
  public selectedOptionsName: any = [];
  public variantDetails = [];
  public review = document.getElementById('review')?.offsetTop;
  public qa = document.getElementById('qa')?.offsetTop;
  public freq = document.getElementById('frequent')?.offsetTop;


  links = [
    { id: 1, label: 'Description' },
    { id: 2, label: 'Reviews' },
    { id: 3, label: 'Customer questions & answers' }];
  activeLink = 0;
  public linkActive: any = '';
  finalUrl: any;
  safeUrl: any;
  videoUrl: any;


  constructor(

    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public productDetail: ListsSandbox,
    public productControlSandbox: ProductControlSandbox,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    private router: Router,
    public snackBar: MatSnackBar,

    private _route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = true;
        window.scrollTo(0, 0);
      }
    });
  } NgDialogAnimationService;

  /** Initially initialize getProductdetail,getRelatedProducts when subscribed
   * subscribe productDetails$ and set initially default values for required options **/
  ngOnInit() {
    this.hideLoader();
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('storeUser'));
      this.currency = JSON.parse(localStorage.getItem('currency'));
    }

    this.imagePath = this.configService.getImageUrl();
    // subscribe route params and trigger selected product detail, related products
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getProductdetail();
      this.getBannerList();
      this.getRelatedProducts();
      this.getProductRatings();
    });
    this.subcribeProductDetails();

    // cart function b2b
    this.productDetail.productDetails$.subscribe(data => {
      if (data) {

        this.productView = data;
        if (this.productView.Selected !== true) {
          this.productViewOffers = data;
        }
        this.taxValue = this.productViewOffers.taxValue;
        this.taxType = this.productViewOffers.taxType;
        this.productPrice = this.productViewOffers.price;

      }
    });

  }
  public hideLoader() {
    this.isLoading = false;
  }
  public loading() {
    this.isLoading = true;
  }

  public subcribeProductDetails() {
    this.optionValueArray = [];
    this.optionNameSelected = [];
    this.tireQuantityArray = [];
    this.subscriptions.push(
      this.productDetail.productDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.optionValueArray = [];
          this.optionNameSelected = [];
          this.tireQuantityArray = [];
          this.productDetails = data;
          this.product = data;
          if (this.product.hasTirePrice === 1) {
            if (this.product.isSimplified === 0) {
              if (this.product.variantTirePrice.length > 0) {
                this.product.variantTirePrice.forEach(each => {
                  if (each) {
                    this.tireQuantityArray.push(each.quantity);
                  }
                });
              }

            } else {
              if (this.product.productTirePrices.length > 0) {
                this.product.productTirePrices.forEach(each => {
                  if (each) {
                    this.tireQuantityArray.push(each.quantity);
                  }
                });
              }
            }
          }
          if (this.product.isSimplified === 0) {
            this.generateVariant();
          }
          if (this.product.hasStock === 1) {
            if (this.product.minQuantityAllowedCart > 0) {
              this.quantity = this.product.minQuantityAllowedCart;
              this.tirePriceCalculation();
            }
          }
          if (data.tirePrice !== '') {
            const tempTirePriceTag = parseFloat(data.tirePrice);
            this.tireBasePrice = tempTirePriceTag;
          } else if (data.pricerefer) {
            const tempProductPriceTag = parseFloat(data.pricerefer);
            this.productPriceTag = tempProductPriceTag;
            this.tempPriceRefer = tempProductPriceTag;
            this.templateHidden = this.productPriceTag;
          } else {
            const tempProductPriceTag = parseFloat(data.price);
            this.productPriceTag = tempProductPriceTag;
            this.tempPriceRefer = tempProductPriceTag;
          }
          setTimeout(() => {
            this.changeDetectRef.detectChanges();
          }, 500);
        }
      })
    );
  }

  changeVariant(event: any) {
    this.productDetail.updateProductDetails(event);
    this.quantity = 1;
  }

  generateVariant() {
    const variantDetails = [];
    if (this.productDetails.productVariant && this.productDetails.productVariant.length > 0) {
      this.productDetails.productVariant.forEach((variant: any) => {
        const temp = variant;
        variantDetails.push(variant);
      });
    }
    this.variantDetails = variantDetails;
  }

  checkSelectedVariant(valueId) {
    if (this.productDetails.productVariantDetail && this.productDetails.productVariantDetail.length > 0) {
      const filterValue = this.productDetails.productVariantDetail.filter((result) => result.varientsValueId === valueId);
      if (filterValue && filterValue.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // calls getRelatedProducts with param
  getRelatedProducts() {
    const params: any = {};
    params.productId = this.id;
    this.productDetail.getRelatedProducts(params);
  }

  // fetch banner list from sandbox
  getBannerList() {
    const params: any = {};
    params.limit = 100;
    params.offset = 0;
    this.productDetail.getBannerList(params);
  }

  // calls getProductRating in sandbox with param
  getProductRatings() {
    const params: any = {};
    params.productId = this.id;
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.productDetail.getProductRating(params);
  }

  /**
   * calls productDetail getProductDetails with param.Then subscribe productDetail productDetails$
   *
   * Then store the image path  and image name in the array.
   * **/

  getProductdetail() {
    const params: any = {};
    params.id = this.id;
    this.productDetail.getProductDetails(params);
    this.subscriptions.push(
      this.productDetail.productDetails$.subscribe(detail => {
        if (detail) {
          this.productId = detail.productId;
        }
        if (detail && detail.productImage.length > 0) {
          const imageLength = detail.productImage.length;
          this.isActive = [];
          this.isActive[detail.productImage[0].productId] = true;
          for (let i = 0; i < imageLength; i++) {
            if (detail.productImage[i].defaultImage === 1) {
              this.productImageId = detail.productImage[i].productId;
              this.image =
                this.imagePath + '/' +
                detail.productImage[i].containerName + '/' +
                detail.productImage[i].image +
                '?tr=w-390,h-390';
              this.zoomPopupImage = this.image;
              this.zoomImage =
                '"' + this.imagePath + '/' +
                detail.productImage[i].containerName + '/' +
                detail.productImage[i].image +
                '?tr=w-1290,h-2370' + '"';
              setTimeout(() => {
                this.config.observer = true;
                this.changeDetectRef.detectChanges();
              }, 500);
            }
          }
        }
      })
    );
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      direction: 'vertical',
      autoHeight: true,
      autoplay: true,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      grabCursor: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        }
      }
    };
    this.configuration = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      grabCursor: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: false,
      watchSlidesVisibility: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        }
      }
    };
  }

  public selectImage(image, i) {
    this.safeUrl = '';
    this.productImageId = image.productId;
    this.isActive = [];
    this.isActive[image.productId] = true;
    this.image =
      this.imagePath + '/' +
      image.containerName + '/' +
      image.image +
      '?tr=w-390,h-390';
    this.changeDetectRef.detectChanges();
    this.zoomPopupImage = this.image;
    this.zoomImage =
      '"' + this.imagePath + '/' +
      image.containerName + '/' +
      image.image +
      '?tr=w-660,h-660' + '"';
  }

  // zoom the image when mouse got moved over the image
  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      let image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = (offsetX / image.offsetWidth) * 100;
      y = (offsetY / image.offsetHeight) * 100;
      if (this.zoomImage) {
        zoomer = this.zoomViewer.nativeElement.children[0];
      }
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = 790 + 'px';
        zoomer.style.width = 430 + 'px';
      }
    }
  }

  // event when mouse clicked to zoom the image
  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  // open pop to view the zoom image
  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomPopupImage,
      panelClass: 'zoom-dialog'
    });
  }

  public productZoom() {
    const dialogRef2 = this.dialog.open(ImageZoomComponent, {
      panelClass: 'image-zoom'

    });
    { dialogRef2.componentInstance.id = this.productImageId; }
    { dialogRef2.componentInstance.image = this.image; }
  }


  emptyOutputDecorator(event) {
    if ('clear' === event) {
      this.optionValueArray = [];
      this.optionNameSelected = [];
    }
  }

  // get pincode value
  getPincode(val) {
    if (val !== '') {
      this.pinCodeError = false;
    }
    this.checkPinCode = false;
    this.pinCode = Number(val);
  }

  // check product Availbity event
  checkAvailability() {
    if (!this.pinCode) {
      this.check = true;
    }
    if (!this.pinCode) {
      this.pinCodeError = true;
      return;
    }
    this.pinCodeError = false;
    this.checkPinCode = true;
    const params: any = {};
    params.pincode = this.pinCode;
    params.productId = this.productId;
    this.productControlSandbox.CheckProductAvailability(params);
  }

  // change quantity of the product
  public changeCount(operation) {
    if (this.product.hasStock === 1) {
      if (operation === 'remove') {
        if (this.quantity > this.product.minQuantityAllowedCart) {
          this.quantity -= 1;
          this.tirePriceCalculation();
        }
      } else if (operation === 'add') {
        if (this.quantity >= this.product.minQuantityAllowedCart && this.quantity < this.product.maxQuantityAllowedCart) {
          this.quantity += 1;
          this.tirePriceCalculation();
        } else {
          this.snackBar.open('You have reached the maximum quantity limit', '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000
          });
        }
      }
    } else {
      if (operation === 'remove' && this.quantity > 1) {
        this.quantity -= 1;
        this.tirePriceCalculation();

      } else if (operation === 'add') {
        this.quantity += 1;
        this.tirePriceCalculation();
      }
    }
  }

  getClosest(list, qty) {
    return qty - list.reduce(function (closest, v) {
      return qty >= v.quantity ? Math.min(qty - v.quantity, closest) : closest;
    }, 1e100);
  }

  tirePriceCalculation() {
    if (this.product.hasTirePrice === 1) {

      if (this.product.isSimplified === 0) {
        if (this.product.variantTirePrice && this.product.variantTirePrice.length > 0) {
          const minQty = Math.min.apply(Math, this.tireQuantityArray);
          let isMatched = false;
          if (this.quantity >= minQty) {
            this.product.variantTirePrice.forEach(data => {
              if (data.quantity === this.quantity) {
                this.tirePrice = data.price;
                const tempTirePriceTag = parseFloat(this.tirePrice);
                this.tireBasePrice = tempTirePriceTag;
                this.productDetail.changeCount(this.tirePrice);
                isMatched = true;
              }
            });
            if (!isMatched) {
              const result = this.getClosest(this.product.variantTirePrice, this.quantity);
              const resultObj = this.product.variantTirePrice.find(_list => _list.quantity === result);
              this.tirePrice = resultObj.price;
              const tempTirePriceTag = parseFloat(this.tirePrice);
              this.tireBasePrice = tempTirePriceTag;
              this.productDetail.changeCount(this.tirePrice);
            }
          } else {
            this.tirePrice = '';
            this.productDetail.changeCount(this.tirePrice);
          }
        }
      } else {
        const minQty = Math.min.apply(Math, this.tireQuantityArray);
        let isMatched = false;
        if (this.quantity >= minQty) {
          this.product.productTirePrices.forEach(data => {
            if (data.quantity === this.quantity) {
              this.tirePrice = data.price;
              const tempTirePriceTag = parseFloat(this.tirePrice);
              this.tireBasePrice = tempTirePriceTag;
              this.productDetail.changeCount(this.tirePrice);
              isMatched = true;
            }
          });
          if (!isMatched) {
            const result = this.getClosest(this.product.productTirePrices, this.quantity);
            const resultObj = this.product.productTirePrices.find(_list => _list.quantity === result);
            this.tirePrice = resultObj.price;
            const tempTirePriceTag = parseFloat(this.tirePrice);
            this.tireBasePrice = tempTirePriceTag;
            this.productDetail.changeCount(this.tirePrice);
          }
        } else {
          this.tirePrice = '';
          this.productDetail.changeCount(this.tirePrice);
        }

      }

    } else {
      return;
    }
  }


  calculatePrice(amount: number, taxType: number, taxValue: number) {
    this.productDetail.productDetails$.subscribe(data => {
      if (data) {
        this.viewOffers = data;
      }
    });
    if (this.viewOffers.Selected === true) {
      taxType = this.taxType;
      taxValue = this.taxValue;

      const price = +amount;
      switch (taxType) {
        case 1:
          const priceWithOutTax = (+price + this.totalPrice) + taxValue;
          return Math.round(priceWithOutTax);
        case 2:
          const percentToAmount = (+price + this.totalPrice) * (taxValue / 100);
          const priceWithTax = (+price + this.totalPrice) + percentToAmount;
          return Math.round(priceWithTax);
        default:
          return (+price + this.totalPrice);
      }
    } else {
      const price = +amount;
      switch (taxType) {
        case 1:
          const priceWithOutTax = (+price + this.totalPrice) + taxValue;
          return Math.round(priceWithOutTax);
        case 2:
          const percentToAmount = (+price + this.totalPrice) * (taxValue / 100);
          const priceWithTax = (+price + this.totalPrice) + percentToAmount;
          return Math.round(priceWithTax);
        default:
          return (+price + this.totalPrice);
      }


    }
  }

  getOptionTotal(event) {
    this.totalPrice = +event;
  }

  getSelectedOptionName(event) {
    this.selectedOptionsName = event;
  }

  getSelectedOptionId(event) {
    this.selectedOptions = event;
  }



  scrollTo(id) {
    if (id === 'description') {
      const image = document.getElementById(id) as HTMLImageElement;
      image.scrollIntoView({ behavior: 'smooth' });
      this.activeDesc = true;
      this.activeFreq = false;
      this.activeReview = false;
      this.activeQa = false;
      this.activeSpecification = false;
    }

    if (id === 'reviews') {
      const image = document.getElementById(id) as HTMLImageElement;
      image.scrollIntoView({ behavior: 'smooth' });
      this.activeDesc = false;
      this.activeFreq = false;
      this.activeReview = true;
      this.activeQa = false;
      this.activeSpecification = false;

    }
    if (id === 'qa') {
      const image = document.getElementById(id) as HTMLImageElement;
      image.scrollIntoView({ behavior: 'smooth' });
      this.activeDesc = false;
      this.activeFreq = false;
      this.activeReview = false;
      this.activeQa = true;
      this.activeSpecification = false;
    }

    if (id === 'specifications') {
      const image = document.getElementById(id) as HTMLImageElement;
      image.scrollIntoView({ behavior: 'smooth' });
      this.activeDesc = false;
      this.activeFreq = false;
      this.activeReview = false;
      this.activeQa = false;
      this.activeSpecification = true;
    }
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  getActiveLink(link) {
    this.activeLink = link.id;
  }

  selectVideo(link) {
    this.linkActive = link;
    this.image = '';
    if (link === 2) {
      this.productDetail.productDetails$.subscribe(data => {
        if (data && data.productVideo && data.productVideo.type === 2) {
          this.finalUrl = data.productVideo.path;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.finalUrl);
        }
      });
    }

    if (link === 1) {
      this.productDetail.productDetails$.subscribe(data => {
        if (data && data.productVideo && data.productVideo.type === 1) {
          const baseUrl = this.configService.getBaseUrl();
          this.videoUrl = baseUrl + '/media/video-preview-s3?name=' + data.productVideo.name + '&path=' + data.productVideo.path;
        }
      });
    }
  }


  // unsubscribe subscribed events while destroy the page
  ngOnDestroy() {
    this.optionValueArray = [];
    this.sub.unsubscribe();
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
