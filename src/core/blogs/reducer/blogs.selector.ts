/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {createSelector} from 'reselect';

import * as  fromWishlist from './blogs.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.blogs;
export const blogList = createSelector(getState, fromWishlist.getBlogList);
export const featuredList = createSelector(getState, fromWishlist.featuredList);
export const blogListLoading = createSelector(getState, fromWishlist.getBlogListLoading);
export const blogListLoaded = createSelector(getState, fromWishlist.getBlogListLoaded);
export const blogListFailed = createSelector(getState, fromWishlist.getBlogListFailed);
export const relatedBlogList = createSelector(getState, fromWishlist.getRelatedBlogList);
export const relatedBlogListLoading = createSelector(getState, fromWishlist.getRelatedBlogListLoading);
export const relatedBlogListLoaded = createSelector(getState, fromWishlist.getRelatedBlogListLoaded);
export const relatedBlogListFailed = createSelector(getState, fromWishlist.getRelatedBlogListFailed);

export const blogDetail = createSelector(getState, fromWishlist.getBlogDetail);
export const blogDetailLoading = createSelector(getState, fromWishlist.getBlogDetailLoading);
export const blogDetailLoaded = createSelector(getState, fromWishlist.getBlogDetailLoaded);
export const blogDetailFailed = createSelector(getState, fromWishlist.getBlogDetailFailed);
