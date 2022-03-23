/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  constructor(public listSandbox: ListsSandbox) { }

  ngOnInit() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.listSandbox.getPageList(params);

  }

  // dowload link for mobile app
  downloadApp() {
    window.open('https://play.google.com/store/apps/details?id=com.amutha.mart');
  }

  openLink(link) {
    window.open(link);

  }

  openWhatsAppLink() {
    window.open("https://wa.me/918939299216");
  }
}
