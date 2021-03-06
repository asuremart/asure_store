/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../../core/service/config.service';


@Component({
  selector: 'app-review-controls',
  templateUrl: './review-controls.component.html',
  styleUrls: ['./review-controls.component.scss']
})
export class ReviewControlsComponent implements OnInit {

  @Input() ratingsList: any;
  public imagePath: string;

  constructor(public configService: ConfigService) { }

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  getShortName(fullName: string) {
    return fullName.split(' ').map(n => n[0]).join('');
  }


}
