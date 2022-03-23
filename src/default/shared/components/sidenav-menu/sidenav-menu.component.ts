/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, Input } from '@angular/core';
import { SidenavMenuService } from './sidenav-menu.service';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  providers: [ SidenavMenuService ]
})
export class SidenavMenuComponent implements OnInit {

  @Input() menuItems: any;
  @Input() menuParentId;
  @Input() initial = true;
  public parentMenu: Array<any>;

  constructor(private sidenavMenuService: SidenavMenuService ) { }

  ngOnInit() {}

  onClick(menuId) {
    this.sidenavMenuService.toggleMenuItem(menuId);
  }

}
