/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class BannerListModel {
    public limit: number;
    public offset: number;
    public count: boolean;

    constructor(bannerRequest: any) {
        this.limit = bannerRequest.limit || 0;
        this.offset = bannerRequest.offset || 0;
        this.count = bannerRequest.count || false;
    }
}
