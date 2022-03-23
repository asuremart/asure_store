/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class ServiceListModel {
    public limit: number;
    public offset: number;
    public keyword: string;
    public categoryId: number;
    public count: number;

    constructor(serviceList: any) {
        this.limit = serviceList.limit || 0;
        this.offset = serviceList.offset || 0;
        this.keyword = serviceList.keyword || '';
        this.categoryId = serviceList.categoryId;
        this.count = serviceList.count || 0;
    }
}
