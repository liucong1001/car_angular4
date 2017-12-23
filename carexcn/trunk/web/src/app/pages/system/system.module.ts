/**
 * 周扬
 */
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, SystemRoutingModule} from './system-routing.module';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CodeitemEditComponent} from './code/codeitem-edit.component';
import { TransferCityitemEditComponent } from './transfer-city/transferCityitem-edit.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import { TreeModule, TreeNode, DialogModule , CheckboxModule, TabViewModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PermissionComponent } from './permission/permission.component';
import { ToPermTreeNode } from './permission/permission-pipe';
import { AreaComponent } from './area/area.component';
import { ToAreaTreeNode } from './area/area-pipe';


const components = [
  CodeitemEditComponent, TransferCityitemEditComponent, ToPermTreeNode, ToAreaTreeNode,
];

@NgModule({
  imports: [ThemeModule, SystemRoutingModule,  HttpModule, UiTableModule, CommonModule, RouterModule , FormsModule, CalendarModule,
    LightboxModule, TreeModule, DialogModule, CheckboxModule, TabViewModule, DataTableModule, SharedModule,
    InputTextModule, HttpClientModule],
  declarations: [...routedComponents, ...components],
})
export class SystemModule {}
