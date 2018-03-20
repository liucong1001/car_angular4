import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../@core/data/security/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent,
  }, {
    path: 'business',
    canActivate: [AuthGuardService],
    loadChildren: './business/business.module#BusinessModule',
  }, {
    path: 'ic-card',
    loadChildren: './ic-card/ic-card.module#IcCardModule',
    canActivate: [AuthGuardService],
  }, {
    path: 'money',
    loadChildren: './money/money.module#MoneyModule',
    canActivate: [AuthGuardService],
  },
  {
    path: 'bill',
    loadChildren: './bill/bill.module#BillModule',
    canActivate: [AuthGuardService],
  }, {
    path: 'archives-manage',
    canActivate: [AuthGuardService],
    loadChildren: './archives-manage/archives-manage.module#ArchivesManageModule',
  }, {
    path: 'common-auction',
    canActivate: [AuthGuardService],
    loadChildren: './common-auction/common-auction.module#CommonAuctionModule',
  }, {
    path: 'query-count',
    canActivate: [AuthGuardService],
    loadChildren: './query-count/query-count.module#QueryCountModule',
  }, {
    path: 'trade-change',
    canActivate: [AuthGuardService],
    loadChildren: './trade-change/trade-change.module#TradeChangeModule',
  }, {
    path: 'system',
    canActivate: [AuthGuardService],
    loadChildren: './system/system.module#SystemModule',
  }, {
    path: 'reportForm',
    canActivate: [AuthGuardService],
    loadChildren: './report-form/report-form.module#ReportFormModule',
  }, {
    path: 'manager',
    canActivate: [AuthGuardService],
    loadChildren: './manager/manager.module#ManagerModule',
  }, {
    path: 'merchant',
    canActivate: [AuthGuardService],
    loadChildren: './merchant/merchant.module#MerchantModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
