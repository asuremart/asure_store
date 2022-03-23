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
import * as _ from 'lodash';


@Component({
  selector: 'app-specification-controls',
  templateUrl: './specification-controls.component.html',
  styleUrls: ['./specification-controls.component.scss']
})
export class SpecificationControlsComponent implements OnInit {

  @Input() attribute: any;
  public imagePath: string;
  public groupAttribute = [];

  constructor(public configService: ConfigService) { }

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
    if (this.attribute && this.attribute.length > 0) {
      this.doGroup();
    }
  }

  doGroup() {
    const object = _.groupBy(this.attribute, 'attributeGroupName');
    this.groupAttribute = Object.keys(object).map(function (key) {
      return { group: key, value: object[key] };
    });

  }
}
