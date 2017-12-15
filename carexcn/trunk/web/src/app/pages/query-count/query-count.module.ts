import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {QueryCountRoutingModule, routedComponents} from './query-count-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';
import { SalesRankComponent } from './report-manage/sales-rank/sales-rank.component';
import { MonthTradeComponent } from './report-manage/month-trade/month-trade.component';
import { TradeListComponent } from './report-manage/trade-list/trade-list.component';
import { YearTradeComponent } from './report-manage/year-trade/year-trade.component';
import { DayTradeComponent } from './report-manage/day-trade/day-trade.component';
import { VehicleDaytradeComponent } from './report-manage/vehicle-daytrade/vehicle-daytrade.component';

@NgModule({
  imports: [
    ThemeModule,  /*标签*/
    CommonModule,
    QueryCountRoutingModule,
    UiTableModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [...routedComponents],
})
export class QueryCountModule { }
