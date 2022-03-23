/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit } from '@angular/core';
import { BlogsSandbox } from '../../../../core/blogs/blogs.sandbox';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  public pageSize = 10;
  public pageOffset = 0;
  public imagePath = '';
  public content: any = '';

  constructor(public blogsSandbox: BlogsSandbox) { }

  ngOnInit() {
    this.imagePath = environment.imageUrl;
    this.getBlogList();
    this.blogsSandbox.featuredList$.subscribe(data => {
      if (data) {
        this.content = data.description;
        this.content = this.content.replace(/<img[^>]*>/g, '');
      }
    });
  }

  getBlogList() {
    const params: any = {};
    params.offset = this.pageOffset;
    params.limit = this.pageSize;
    params.keyword = '';
    params.count = 0;
    this.blogsSandbox.getBlogsList(params);
  }

}
