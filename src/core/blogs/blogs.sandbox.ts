/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as authAction from './action/blogs.action';
import * as store from '../state.interface';
import { blogDetail, blogDetailLoading,
      blogDetailLoaded,
      blogDetailFailed,
      blogList,
      blogListLoading,
      blogListLoaded,
      blogListFailed, relatedBlogList, relatedBlogListFailed, relatedBlogListLoaded, relatedBlogListLoading, featuredList
    } from './reducer/blogs.selector';


@Injectable()
export class BlogsSandbox {
    public blogDetail$ = this.appState$.select(blogDetail);
    public blogDetailLoading$ = this.appState$.select(blogDetailLoading);
    public blogDetailLoaded$ = this.appState$.select(blogDetailLoaded);
    public blogDetailFailed$ = this.appState$.select(blogDetailFailed);

    public blogList$ = this.appState$.select(blogList);
    public featuredList$ = this.appState$.select(featuredList);
    public blogListLoading$ = this.appState$.select(blogListLoading);
    public blogListLoaded$ = this.appState$.select(blogListLoaded);
    public blogListFailed$ = this.appState$.select(blogListFailed);

    public relatedBlogList$ = this.appState$.select(relatedBlogList);
    public relatedBlogListLoading$ = this.appState$.select(relatedBlogListLoading);
    public relatedBlogListLoaded$ = this.appState$.select(relatedBlogListLoaded);
    public relatedBlogListFailed$ = this.appState$.select(relatedBlogListFailed);
    private subscriptions: Array<Subscription> = [];

    constructor(protected appState$: Store<store.AppState>) {}

    /* trigger get blog list action */

    public getBlogsList(params): void {
        this.appState$.dispatch(new authAction.GetBlogList(params));
    }
    /* trigger get blog list action */

    public getRelatedBlogsList(params): void {
        this.appState$.dispatch(new authAction.GetRelatedBlogList(params));
    }

    /* trigger get blog detail action */

    public getBlogDetail(params): void {
        this.appState$.dispatch(new authAction.GetBlogDetail(params));
    }

}
