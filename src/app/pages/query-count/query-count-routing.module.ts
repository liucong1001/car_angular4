import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueryCountComponent} from './query-count.component';
import {TradeQueryComponent} from './trade-query/trade-query.component';
import {MonthCountComponent} from './month-count/month-count.component';
import {PerformanceCheckComponent} from './performance-check/performance-check.component';
import {TradesQueryComponent} from './trades-query/trades-query.component';
import {ReportManageComponent} from './report-manage/report-manage.component';
import {AreaQueryComponent} from './area-query/area-query.component';
import {AppendixQueryComponent} from './appendix-query/appendix-query.component';
import {MonthTradeComponent} from './report-manage/month-trade/month-trade.component';
import {SalesRankComponent} from './report-manage/sales-rank/sales-rank.component';
import {YearTradeComponent} from './report-manage/year-trade/year-trade.component';
import {DayTradeComponent} from './report-manage/day-trade/day-trade.component';
import {TradeListComponent} from './report-manage/trade-list/trade-list.component';
import {VehicleDaytradeComponent} from './report-manage/vehicle-daytrade/vehicle-daytrade.component';
import { SeeMessageComponent } from './trade-query/see-message/see-message.component';
import {TradeDetailsComponent} from './trades-query/trade-details/trade-details.component';
import { CarDetailComponent } from './trades-query/car-detail/car-detail.component';
import { BusinessReportComponent } from './report-manage/business-report/business-report.component';

const routes: Routes = [{
  path: '',
  component: QueryCountComponent,
  children: [
    {path: 'trade-query', component: TradeQueryComponent},
    {path: 'trade-query/see-message', component: SeeMessageComponent},
    {path: 'trades-query', component: TradesQueryComponent},
    {path: 'trades-query/trade-details', component: TradeDetailsComponent},
    {path: 'trades-query/car-detail', component: CarDetailComponent},
    {path: 'month-count', component: MonthCountComponent},
    {path: 'report-manage', component: ReportManageComponent},
    {path: 'report-manage/sales-rank', component: SalesRankComponent},
    {path: 'report-manage/month-trade', component: MonthTradeComponent},
    {path: 'report-manage/trade-list', component: TradeListComponent},
    {path: 'report-manage/year-trade', component: YearTradeComponent},
    {path: 'report-manage/day-trade', component: DayTradeComponent},
    {path: 'report-manage/vehicle-daytrade', component: VehicleDaytradeComponent},
    {path: 'report-manage/business-report', component: BusinessReportComponent},
    {path: 'performance-check', component: PerformanceCheckComponent},
    {path: 'appendix-query', component: AppendixQueryComponent},
    {path: 'area-query', component: AreaQueryComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryCountRoutingModule { }
export const routedComponents = [
  QueryCountComponent,
  TradeQueryComponent,
  TradesQueryComponent,
  MonthCountComponent,
  ReportManageComponent,
  PerformanceCheckComponent,
  AppendixQueryComponent,
  AreaQueryComponent,
  SalesRankComponent,
  MonthTradeComponent,
  TradeListComponent,
  YearTradeComponent,
  DayTradeComponent,
  VehicleDaytradeComponent,
  SeeMessageComponent,
  TradeDetailsComponent,
  CarDetailComponent,
  BusinessReportComponent
];

