import {NgModule, Pipe} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechargeComponent, RechargeKeepComponent, RechargeRecordComponent } from './recharge-keep/recharge-keep.component';
import {IcCardComponent} from './ic-card.component';
import {PasswordResetComponent, ResetComponent, TabComponent} from './password-reset/password-reset.component';
import {TransferAccountsComponent, RefundComponent, TransferComponent} from './transfer-accounts/transfer-accounts.component';
import {CardManageComponent, IcManageComponent, ConsumeRecordComponent} from './card-manage/card-manage.component';


const routes: Routes = [{
    path: '',
    component: IcCardComponent,
    children: [{
        path: 'recharge-keep',
        component: RechargeKeepComponent,
        children: [{
            path: '',
            redirectTo: 'recharge',
            pathMatch: 'full',
          }, {
            path: 'recharge',
            component: RechargeComponent,
        }, {
            path: 'recharge-record',
            component: RechargeRecordComponent,
          }],
      }, {
      path: 'password-reset',
      component: PasswordResetComponent,
      children: [{
        path: '',
        redirectTo: 'reset',
        pathMatch: 'full',
      }, {
        path: 'reset',
        component: ResetComponent,
      }, {
        path: 'tab',
        component: TabComponent,
      }],
    }, {
      path: 'transfer-accounts',
      component: TransferAccountsComponent,
      children: [{
        path: '',
        redirectTo: 'refund',
        pathMatch: 'full',
      }, {
        path: 'refund',
        component: RefundComponent,
      }, {
        path: 'transfer',
        component: TransferComponent,
      }],
    }, {
      path: 'card-manage',
      component: CardManageComponent,
      children: [{
        path: '',
        redirectTo: 'ic-manage',
        pathMatch: 'full',
      }, {
        path: 'ic-manage',
        component: IcManageComponent,
      }, {
        path: 'consume-record',
        component: ConsumeRecordComponent,
      }],
    }],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IcCardRoutingModule { }
