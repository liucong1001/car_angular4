import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonAuctionComponent} from './common-auction.component';
import {AuctionManageComponent} from './auction-manage/auction-manage.component';
import {DiscountBalanceComponent} from './discount-balance/discount-balance.component';
import {RebateFormComponent} from './rebate-form/rebate-form.component';
import {BalanceDetailsComponent} from './discount-balance/balance-details/balance-details.component';

const routes: Routes = [{
  path: '',
  component: CommonAuctionComponent,
  children: [
    {path: 'auction-manage', component: AuctionManageComponent},
    {path: 'rebate-form', component: RebateFormComponent},
    {path: 'discount-balance', component: DiscountBalanceComponent},
    {path: 'discount-balance/balance-details', component: BalanceDetailsComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonAuctionRoutingModule { }
export const routedComponents = [
  CommonAuctionComponent,
  AuctionManageComponent,
  DiscountBalanceComponent,
  RebateFormComponent,
  BalanceDetailsComponent,
];

