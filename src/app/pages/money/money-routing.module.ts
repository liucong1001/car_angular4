import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoneyComponent} from './money.component';
import {OrderManageComponent} from './order-manage/order-manage.component';
import {ConsumeRecordComponent} from './consume-record/consume-record.component';
import {PaymentComponent} from './payment/payment.component';
import {TransferRecordComponent} from './transfer-record/transfer-record.component';
import {PaymentDetailComponent} from './payment-detail/payment-detail.component';
import {TurnoverDetailComponent} from './turnover-detail/turnover-detail.component';

const routes: Routes = [{
  path: '',
  component: MoneyComponent,
  children: [{
    path: 'order-manage',
    component: OrderManageComponent,
  }, {
    path: 'consume-record',
    component: ConsumeRecordComponent,
  }, {
    path: 'payment',
    component: PaymentComponent,
  }, {
    path: 'transfer-record',
    component: TransferRecordComponent,
  }, {
    path: 'payment-detail',
    component: PaymentDetailComponent,
  }, {
    path: 'turnover-detail',
    component: TurnoverDetailComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyRoutingModule { }
export const routedComponents = [
  MoneyComponent,
  OrderManageComponent,
  ConsumeRecordComponent,
  PaymentComponent,
  TransferRecordComponent,
  PaymentDetailComponent,
  TurnoverDetailComponent,
];
