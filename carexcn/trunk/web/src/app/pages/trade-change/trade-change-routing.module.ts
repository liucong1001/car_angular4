import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TradeReviseComponent} from './trade-revise/trade-revise.component';
import {StateReviseComponent} from './state-revise/state-revise.component';
import {TradeInfoComponent} from './trade-revise/trade-info/trade-info.component';
import {CarInfoComponent} from './trade-revise/car-info/car-info.component';
import {BuyerInfoComponent} from './trade-revise/buyer-info/buyer-info.component';
import {SellerInfoComponent} from './trade-revise/seller-info/seller-info.component';

const routes: Routes = [
  {path: 'trade-revise', component: TradeReviseComponent},
  {path: 'trade-revise/trade-info', component: TradeInfoComponent},
  {path: 'trade-revise/car-info', component: CarInfoComponent},
  {path: 'trade-revise/buyer-info', component: BuyerInfoComponent},
  {path: 'trade-revise/seller-info', component: SellerInfoComponent},
  {path: 'state-revise', component: StateReviseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeChangeRoutingModule { }
