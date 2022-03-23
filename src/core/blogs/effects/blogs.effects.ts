/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from './../action/blogs.action';
import * as countActions from '../../common/action/common.action';
import { BlogsService } from '../blogs.service';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class BlogsEffects {
  constructor(
    private actions$: Actions,
    private authApi: BlogsService,
    private appState$: Store<store.AppState>,
    public title: Title,
    private meta: Meta,

  ) { }

  @Effect()
  getBloglist$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BLOG_LIST),
    map((action: actions.GetBlogList) => action.payload),
    switchMap(state => {
      return this.authApi.getBlogList(state).pipe(
        map(list => new actions.GetBlogListSuccess(list)),
        catchError(error => of(new actions.GetBlogListFail(error)))
      );
    })
  );

  @Effect()
  getRelatedBloglist$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_RELATED_BLOG_LIST),
    map((action: actions.GetRelatedBlogList) => action.payload),
    switchMap(state => {
      return this.authApi.getRelatedBlogList(state).pipe(
        map(list => new actions.GetRelatedBlogListSuccess(list)),
        catchError(error => of(new actions.GetRelatedBlogListFail(error)))
      );
    })
  );
  @Effect()
  getBlogdetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BLOG_DETAIL),
    map((action: actions.GetBlogDetail) => action.payload),
    switchMap(state => {
      return this.authApi.getBlogDetail(state).pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data.metaTagTitle);
            this.meta.addTags([
              { name: 'description', content: res.data.metaTagDescription }
            ]);
            const description = this.meta.getTags('name=description');
          }

        }),
        map(detail => new actions.GetBlogDetailSuccess(detail)),
        catchError(error => of(new actions.GetBlogDetailFail(error)))
      );
    })
  );
}
