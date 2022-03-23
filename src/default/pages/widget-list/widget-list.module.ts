import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WidgetListComponent } from './widget-list.component';
import { ComponentsModule } from '../../shared/components/index';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export const routes = [
  {
    path: '', component: WidgetListComponent, pathMatch: 'full', data: {
      urls: [
        { title: 'Widget List', url: '/widget-list' },
      ]
    }
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ComponentsModule,
    NgbModule,
    TranslateModule.forChild()
  ],
  declarations: [
    WidgetListComponent
  ],
  providers: []
})
export class WidgetListModule { }

