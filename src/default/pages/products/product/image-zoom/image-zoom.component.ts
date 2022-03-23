/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { ListsSandbox } from '../../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../../core/service/config.service';
@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss']
})
export class ImageZoomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('data') imageName;
  @Input() id: any;
  @Input() imageId: any;
  public isActive = [];
  image: any;
  public imagePath: string;
  public config: SwiperConfigInterface = {};
  private subscriptions: Array<Subscription> = [];
  public zoomImage: any;
  public zoomPopupImage: any;
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  productImageId: any;
  sub: Subscription;
  productId: string;
  isLoading: boolean;

  public index = 0;
  constructor(
    public productDetail: ListsSandbox, public configService: ConfigService, private changeDetectRef: ChangeDetectorRef, public dialogRef: MatDialogRef<ImageZoomComponent>, public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
    this.hideLoader();
  }
  public hideLoader() {
    this.isLoading = false;
  }
  public loading() {
    this.isLoading = true;
  }
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
      slidesPerView: 'auto',
      observer: true,
      navigation: true,
      grabCursor: true,
      lazy: {
        loadPrevNext: true
      },
      speed: 700,
      effect: 'slide'
    };
  }


  public selectImage(image, i) {
    this.index = i;
    this.id = image.productId;
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
  public close() {
    this.dialogRef.close('');
  }

  // unsubscribe subscribed events while destroy the page
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }

}
