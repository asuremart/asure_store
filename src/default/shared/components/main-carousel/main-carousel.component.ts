/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, Input } from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ConfigService } from '../../../../core/service/config.service';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})

export class MainCarouselComponent implements OnInit, AfterViewInit {


  public config: SwiperConfigInterface = {};
  public imagePath: string;
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(
    private configService: ConfigService,
    private router: Router,
    public listSandbox: ListsSandbox
  ) {}

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 'auto',
      pagination: this.pagination,
      autoplay: true,
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

  public allProducts() {
    this.router.navigate(['/products/', 'All']);
  }
}
