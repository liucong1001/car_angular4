import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ThemeModule} from '../../@theme/theme.module';
import { TradeChangeRoutingModule } from './trade-change-routing.module';
import { TradeReviseComponent } from './trade-revise/trade-revise.component';
import { StateReviseComponent } from './state-revise/state-revise.component';
import {UiModule} from '../../@core/ui/ui.module';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {TradeChangeComponent} from './trade-change.component';
import { BuyerInfoComponent } from './trade-revise/buyer-info/buyer-info.component';
import { SellerInfoComponent } from './trade-revise/seller-info/seller-info.component';
import {TradeInfoComponent} from './trade-revise/trade-info/trade-info.component';
import {CarInfoComponent} from './trade-revise/car-info/car-info.component';

@NgModule({
  imports: [
    CommonModule,
    TradeChangeRoutingModule,
    ThemeModule,  /*标签*/
    UiModule, /*ngx-ys-calendar标签*/
    UiTableModule, /*分页器*/
    HttpModule,
    RouterModule,
  ],
  declarations: [
    TradeReviseComponent,
    StateReviseComponent,
    TradeChangeComponent,
    BuyerInfoComponent,
    SellerInfoComponent,
    TradeInfoComponent,
    CarInfoComponent,
  ],
})
export class TradeChangeModule { }
