/**
 * 报表模块
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {UiModule} from '../../@core/ui/ui.module';
import {ReportFormRoutingModule,routedComponents} from "./report-form-routing.module";



@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    UiTableModule,
    HttpModule,
    ReportFormRoutingModule
  ],
  declarations:[
    ...routedComponents,
  ],
})
export class ReportFormModule { }
