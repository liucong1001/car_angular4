import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MoneyRoutingModule, routedComponents} from './money-routing.module';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { PaymentComponent } from './payment/payment.component';
import { ConsumeRecordComponent } from './consume-record/consume-record.component';
import {ThemeModule} from '../../@theme/theme.module';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {UiModule} from '../../@core/ui/ui.module';
import {MultiSelectModule} from 'primeng/primeng';
import { PaymentOrderComponent } from './payment-order/payment-order.component';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import {SystemModule as CoreSystemModule} from '../../@core/data/system/system.module';
import {BusinessTypePipe} from '../../@core/data/bussiness/businessType.pipe';

const components = [
  BusinessTypePipe,
];
@NgModule({
  imports: [
    ThemeModule,  /*标签*/
    CommonModule,
    MoneyRoutingModule,
    UiTableModule,
    HttpModule,
    RouterModule,
    UiModule, /*ngx-ys-calendar标签*/
    MultiSelectModule,
    CoreSystemModule,
    // AngularMultiSelectModule

  ],
  declarations: [
    ...routedComponents,
    ...components
  ],
})
export class MoneyModule { }
