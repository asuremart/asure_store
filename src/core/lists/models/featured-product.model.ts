/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class FeaturedProductModel {
    public limit: number;
    public offset: number;
    public keyword: string;
    public sku: string;
    public count: boolean;

    constructor(featuredRequest: any) {
        this.limit = featuredRequest.limit || 0;
        this.offset = featuredRequest.offset || 0;
        this.keyword = featuredRequest.keyword || '';
        this.sku = featuredRequest.sku || '';
        this.count = featuredRequest.count || false;
    }
}
