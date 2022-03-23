/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-checkout-success',
    templateUrl: './checkout-success.component.html',
    styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
    routePage = true;
    public orderId: any;

    constructor(public activeRoute: ActivatedRoute, public router: Router) {
        this.activeRoute.params.subscribe(routes => {
            if (routes['id']) {
                this.orderId = routes['id'];
            }
        });
    }

    ngOnInit() {
        //     setTimeout(() => {
        //         this.router.navigate(['/']);
        //    }, 5000);
        timer(5000).pipe(takeWhile(() => this.routePage)).subscribe(_ => {
            this.router.navigate(['/']);
        });
    }
    ngOnDestroy() {
        this.routePage = false;
    }
}
