/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RelatedProductListModel } from '../../../core/lists/models/related-product-list.model';
import { ProductDialogComponent } from '../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-vendor-detail',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss']
})


export class VendorDetailComponent implements OnInit, OnDestroy {

    public contactForm: FormGroup;
    public submitted = false;
    // load image path
    public imagePath: string;
    // route params
    private sub: any;
    private id: any;
    public productDetails: any;
    // subcription
    private subscriptions: Array<Subscription> = [];
    public vendorId: any;
    public product: any;

    // review pagination
    // public limit: any = 10;
    // public offset: any = 0;
    public keyword: any = '';
    public reviewCount = 0;
    public disableNext = false;
    public disablePrevious = false;
    public rating = 0;
    public starCount = 5;
    public pageSize = 12;
    public index = 0;
    public productOffset = 0;
    public productss: any = [];

    // Pagination
    public limit: any = 12;
    public offset: any = 0;
    public page: any = 1;
    public pageCount: any;
    public productCount: any;

    // review Pagination
    public limitreview: any = 10;
    public offsetreview: any = 0;
    public pagereview = 1;
    public pageCountreview: any;
    public productCountreview: any;
    public queryData: any = {};

    constructor(public formBuilder: FormBuilder,
        public configService: ConfigService,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        public listSandbox: ListsSandbox) {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            this.getVendorDetail();
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.vendorId = params['vendorId'];
        });
    }

    ngOnInit() {
        this.titleService.setTitle('Vendor Details');

        this.imagePath = this.configService.getImageUrl();
        // subscribe route params and trigger selected product detail, related products
        this.subscriptions.push(
            this.listSandbox.vendorDetail$.subscribe(data => {
                if (data && data.productlist) {
                    const tempProduct = data.productlist.map(product => {
                        const tempList = new RelatedProductListModel(product);
                        return tempList;
                    });
                    this.productDetails = tempProduct;
                }
            })
        );
        if (this.vendorId) {
            this.offset = this.activatedRoute.snapshot.queryParamMap.get('offset') || 0;
            this.page = this.activatedRoute.snapshot.queryParamMap.get('index');
            this.getVendorProductList();
            this.getVendorProductListCount();
            this.getReviewList();
            this.getReviewListCount();
        }
    }


    getVendorDetail() {
        const params: any = {};
        params.id = this.id;
        this.listSandbox.getVendorDetail(params);
    }

    getVendorProductList() {
        const params: any = {};
        params.limit = this.limit;
        params.offset = this.offset;
        params.count = '';
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorProductList(params);
        this.queryData.offset = this.offset || 0;
        this.queryData.index = this.page || 1;
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: this.queryData,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }

    getVendorProductListCount() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = 1;
        params.vendorId = +this.vendorId;
        this.listSandbox.vendorProductListCount(params);
        this.listSandbox.vendorProductListCount$.subscribe(data => {
            if (data) {
                this.productCount = data;
                if (this.productCount) {

                    this.pageCount = this.productCount / this.limit;

                    this.pageCount = Math.ceil(this.pageCount);

                }

            }
        });
    }

    // pageination

    pageEvent(event) {
        this.offset = (event - 1) * this.limit;
        const params: any = {};
        params.limit = this.limit;
        params.offset = this.offset;
        params.vendorId = +this.vendorId;
        this.getVendorProductList();
    }

    // review pageination
    pageEventreview(event) {

        this.offsetreview = (event - 1) * this.limitreview;
        const params: any = {};
        params.limit = this.limitreview;
        params.offset = this.offsetreview;
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorReviewList(params);
    }





    getReviewList() {
        const params: any = {};
        params.limit = this.limitreview;
        params.offset = this.offsetreview;
        params.count = '';
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorReviewList(params);
    }

    getReviewListCount() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = 1;
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorReviewListCount(params);
        this.subscriptions.push(this.listSandbox.vendorReviewListCount$.subscribe(data => {
            if (data) {
                this.reviewCount = data;
            }
        }));


        this.listSandbox.vendorReviewListCount$.subscribe(data => {
            if (data) {
                this.productCountreview = data;
                if (this.productCountreview) {

                    this.pageCountreview = this.productCountreview / this.limitreview;

                    this.pageCountreview = Math.ceil(this.pageCountreview);

                }

            }
        });
    }


    calculatePrice(price: number, taxType: number, taxValue: number) {
        switch (taxType) {
            case 1:
                const priceWithOutTax = +price + taxValue;
                return Math.round(priceWithOutTax);
            case 2:
                const percentToAmount = price * (taxValue / 100);
                const priceWithTax = +price + percentToAmount;
                return Math.round(priceWithTax);
            default:
                return price;
        }
    }

    /**
 * open quick view of the product
 *
 * @param data passing selected product detail to dialog
 */
    public openProductDialog(product) {
        this.productss = [];
        this.productss.push(product);

        const dialogRef = this.dialog.open(ProductDialogComponent, {
            panelClass: 'product-dialog',
            data: { details: this.productss[0], page: 'product' },
        });
        dialogRef.afterClosed().subscribe(products => {

            if (products) {
                this.router.navigate(['/products/productdetails', products.productSlug]);
            }
        });
    }

    goToPreviousPage() {
        this.disablePrevious = false;
        this.offset = this.offset - this.limit;
        if (this.offset < this.reviewCount && this.offset > 0) {
            this.getReviewList();
        } else {
            this.disablePrevious = true;
            return;
        }
    }

    goToNextPage() {
        this.disableNext = true;
        this.offset = this.offset + this.limit;

        if (this.offset < this.reviewCount) {
            this.getReviewList();
        } else {
            this.disableNext = true;
        }
    }

    getShortName(fullName: string) {
        return fullName.split(' ').map(n => n[0]).join('');
    }

    public onPageChange(event) {
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.productOffset = event.pageIndex * event.pageSize;
        this.getVendorProductList();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}
