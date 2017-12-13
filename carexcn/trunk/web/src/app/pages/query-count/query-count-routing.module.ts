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

const routes: Routes = [{
  path: '',
  component: QueryCountComponent,
  children: [
    {path: 'trade-query', component: TradeQueryComponent},
    {path: 'trades-query', component: TradesQueryComponent},
    {path: 'month-count', component: MonthCountComponent},
    {path: 'report-manage', component: ReportManageComponent},
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
];

