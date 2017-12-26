/**
 * 周扬
 */
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, SystemRoutingModule} from './system-routing.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CodeitemEditComponent} from './code/codeitem-edit.component';
import { TransferCityitemEditComponent } from './transfer-city/transferCityitem-edit.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import { TreeModule, TreeNode, DialogModule , CheckboxModule, TabViewModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { ToPermTreeNode } from './permission/permission-pipe';
import { MarketStaffComponent } from './market-staff/market-staff.component';
import {ToAreaTreeNode} from './area/area-pipe';
import {MarketStaffAddComponent} from './market-staff/market-staff-add/market-staff-add.component';
import {MarketStaffEditComponent} from './market-staff/market-staff-edit/market-staff-edit.component';
import {UiModule} from '../../@core/ui/ui.module';
import {SystemModule as CoreSystemModule} from '../../@core/data/system/system.module';


const components = [
  CodeitemEditComponent,
  TransferCityitemEditComponent,
  ToPermTreeNode,
  ToAreaTreeNode,
  MarketStaffComponent,
  MarketStaffAddComponent,
  MarketStaffEditComponent,
];

@NgModule({
  imports: [ThemeModule, SystemRoutingModule,  HttpModule, UiModule, CommonModule, RouterModule , FormsModule, CalendarModule,
    LightboxModule, TreeModule, DialogModule, CheckboxModule, TabViewModule, DataTableModule, SharedModule,
    InputTextModule, HttpClientModule, CoreSystemModule],
  declarations: [
    ...routedComponents,
    ...components,
  ],
})
export class SystemModule {}
