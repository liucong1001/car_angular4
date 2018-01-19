import {NgModule, Pipe} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeKeepComponent } from './recharge-keep/recharge-keep.component';
import {IcCardComponent} from './ic-card.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {TransferAccountsComponent} from './transfer-accounts/transfer-accounts.component';
import {CardManageComponent} from './card-manage/card-manage.component';
import {RefundComponent} from './refund/refund.component';
import {RechargeRecordComponent} from './recharge-record/recharge-record.component';
import  {RechargeCancelComponent} from './recharge-cancel/recharge-cancel.component';
import {PasswordChangeComponent} from './password-change/password-change.component';

const routes: Routes = [{
  path: '',
  component: IcCardComponent,
  children: [{
    path: 'recharge-keep',
    component: RechargeKeepComponent,
  }, {
    path: 'recharge-record',
    component: RechargeRecordComponent,
  },
    {
      path: 'recharge-cancel',
      component: RechargeCancelComponent,
    },
    {
      path: 'password-reset',
      component: PasswordResetComponent,
    }, {
      path: 'password-change',
      component: PasswordChangeComponent,
    }, {
      path: 'transfer-accounts',
      component: TransferAccountsComponent,
    }, {
      path: 'refund',
      component: RefundComponent,
    }, {
      path: 'card-manage',
      component: CardManageComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class IcCardRoutingModule { }
