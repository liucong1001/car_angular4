import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuardService} from '../@core/data/security/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent,
  }, {
    path: 'bussiness',
    canActivate: [AuthGuardService],
    loadChildren: './bussiness/bussiness.module#BussinessModule',
  }, {
    path: 'ic-card',
    loadChildren: './ic-card/ic-card.module#IcCardModule',
    canActivate: [AuthGuardService],
  }, {
    path: 'money',
    loadChildren: './money/money.module#MoneyModule',
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
    path: 'merchant',
    loadChildren: './merchant/merchant.module#MerchantModule',
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'example',
    loadChildren: './example/example.module#ExampleModule',
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
