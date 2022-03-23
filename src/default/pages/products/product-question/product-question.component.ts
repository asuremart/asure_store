/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AnswerListComponent } from '../modal/answer-list/answer-list.component';
import { Router } from '@angular/router';
import { PostAnswerComponent } from '../modal/post-answer/post-answer.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportAbuseComponent } from '../modal/report-abuse/report-abuse.component';
import { PostQuestionComponent } from '../modal/post-question/post-question.component';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-product-question',
  templateUrl: './product-question.component.html',
  styleUrls: ['./product-question.component.scss']
})


export class ProductQuestionComponent implements OnInit, OnDestroy {

  public productId: any;
  public subscriptions: Array<Subscription> = [];
  public productSlug: any;
  public imageUrl = environment.imageUrl;
  public currencySymbol: any = {};
  public user: any;
  product: any;

  constructor(public route: ActivatedRoute,
    public sandbox: ListsSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    public dialog: MatDialog) {
    this.product = JSON.parse(this.route.snapshot.params.id);
    if (this.product.productId) {
      this.productId = this.product.productId;
      this.productSlug = this.product.productSlug;
      this.getProductDetails();
    }
  }


  ngOnInit() {
    this.subscribe();
    if (isPlatformBrowser(this.platformId)) {
      this.currencySymbol = JSON.parse(localStorage.getItem('currency'));
      this.user = JSON.parse(localStorage.getItem('storeUser'));
    }
  }

  getQuestionList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    params.productId = +this.productId;
    this.sandbox.getQuestionList(params);
  }

  searchQuestion(event) {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = event.target.value;
    params.count = '';
    params.productId = +this.productId;
    this.sandbox.getQuestionList(params);
  }

  getProductDetails() {
    const params: any = {};
    params.id = this.productSlug;
    this.sandbox.getProductDetails(params);
  }


  viewAnswer(list) {
    const dialogRef = this.dialog.open(AnswerListComponent, {
      width: '90%',
      data: list
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // like or dislike

  likeOrDislike(event, list) {
    if (this.user) {
      const params: any = {};
      params.answerId = list.answerList.answerId;
      params.ansType = 1;
      if (event.target.textContent === 'thumb_up') {
        if (list.answerList.likeType !== 1) {
          params.type = 1;
          this.sandbox.likeOrDislikeAnswer(params);
        }
      } else {
        if (list.answerList.likeType !== 2) {
          params.type = 2;
          this.sandbox.likeOrDislikeAnswer(params);
        }
      }
    } else {
      this.router.navigate(['/auth']);
    }
  }

  postAnswer(list) {
    if (this.user) {
      const dialogRef = this.dialog.open(PostAnswerComponent, {
        width: '60%',
        data: list
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      this.router.navigate(['/auth']);
    }

  }

  reportAbuse(list) {
    if (list.answerList.answerId) {
      const answerId = list.answerList.answerId;
      if (this.user) {
        const dialogRef = this.dialog.open(ReportAbuseComponent, {
          width: '60%',
          data: answerId
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      } else {
        this.router.navigate(['/auth']);
      }
    }

  }

  postQuestion(list) {
    if (this.user) {
      const dialogRef = this.dialog.open(PostQuestionComponent, {
        width: '60%',
        data: list
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
        }
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.postQuestion$.subscribe(data => {
      if (data && data.status === 1) {
        this.getQuestionList();

      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
