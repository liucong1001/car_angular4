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
import { TransferRecordComponent } from './transfer-record/transfer-record.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { TurnoverDetailComponent } from './turnover-detail/turnover-detail.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    MoneyRoutingModule,
    UiTableModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    ...routedComponents,
    TransferRecordComponent,
    PaymentDetailComponent,
    TurnoverDetailComponent,
    PrintInvoiceComponent,
  ],
})
export class MoneyModule { }
