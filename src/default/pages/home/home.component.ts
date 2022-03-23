/*
spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public imagePath: string;
    public productType: string;
    public widget: any = [];
    public widgetItems: any = [];
    widgetOffset = 0;
    isNoWidget = false;

    constructor(
        public listSandbox: ListsSandbox,
        public configService: ConfigService,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }

    ngOnInit() {
        this.imagePath = this.configService.getImageUrl();
        this.getFeaturedList();
        this.getBransList();
        this.getTodayDealList();
        this.getWidgetProductList(this.widgetOffset, true);
        this.listSandbox.getSettings();

        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('checkout');
        }
    }

    getBransList() {
        const params: any = {};
        params.limit = 10;
        params.offset = 0;
        params.keyword = '';
        this.listSandbox.getManufacturerList(params);
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

    public getWidgetProductList(offset: number = 0, refresh: boolean = false) {
        const params: any = {};
        params.limit = 1;
        params.offset = offset;
        params.keyword = '';
        params.sku = '';
        params.refresh = refresh;
        this.listSandbox.getWidgetProductList(params);
    }

    public onScroll() {
        // ----
        if (this.isNoWidget) {
            return;
        }

        this.widgetOffset += 1;
        this.getWidgetProductList(this.widgetOffset);
    }
}
