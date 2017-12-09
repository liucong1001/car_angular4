import {Component, NgModule, Pipe} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {IcCardComponent} from './ic-card.component';
import { IcCardRoutingModule } from './ic-card-routing.module';
import {RechargeKeepComponent, RechargeRecordComponent, RechargeComponent} from './recharge-keep/recharge-keep.component';
import {PasswordResetComponent, ResetComponent, TabComponent} from './password-reset/password-reset.component';
import {RefundComponent, TransferAccountsComponent, TransferComponent} from './transfer-accounts/transfer-accounts.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import {CardManageComponent, IcManageComponent, ConsumeRecordComponent} from './card-manage/card-manage.component';
import {HttpModule} from '@angular/http';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {RouterModule} from '@angular/router';
// import Direction = L.Direction;

export const components = [
  IcCardComponent,
  RechargeKeepComponent,
  RechargeComponent,
  RechargeRecordComponent,
  PasswordResetComponent,
  ResetComponent,
  TabComponent,
  TransferAccountsComponent,
  RefundComponent,
  TransferComponent,
  CardManageComponent,
  IcManageComponent,
  ConsumeRecordComponent,
];
@NgModule({
  imports: [
    ThemeModule,
    IcCardRoutingModule,
    HttpModule,
    CommonModule,
    UiTableModule,
    RouterModule,
  ],
  declarations: [
    ...components,
    PasswordResetComponent,
    TransferAccountsComponent,
    PrintInvoiceComponent,
    CardManageComponent,
  ],
})
export class IcCardModule { }
