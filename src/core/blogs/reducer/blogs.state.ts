/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Map, Record} from 'immutable';

export interface BlogsState extends Map<string, any> {
    blogListLoading: boolean;
    blogListLoaded: boolean;
    blogListFailed: boolean;
    blogList: Array<any>;
    featuredList: any;
    relatedBlogListLoading: boolean;
    relatedBlogListLoaded: boolean;
    relatedBlogListFailed: boolean;
    relatedBlogList: Array<any>;

    blogDetailLoading: boolean;
    blogDetailLoaded: boolean;
    blogDetailFailed: boolean;
    blogDetail: any;

}

export const blogsRecord = Record({
    blogList: [],
    featuredList: {},
    blogListLoading: false,
    blogListLoaded: false,
    blogListFailed: false,
    relatedBlogList: [],
    relatedBlogListLoading: false,
    relatedBlogListLoaded: false,
    relatedBlogListFailed: false,

    blogDetailLoading: false,
    blogDetailLoaded: false,
    blogDetailFailed: false,
    blogDetail: {},
});
