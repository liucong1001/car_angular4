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
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {LightboxModule, MegaMenuModule} from 'primeng/primeng';
import { TreeModule, TreeNode, DialogModule , CheckboxModule, TabViewModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { InputTextModule , AutoCompleteModule} from 'primeng/primeng';
import { ToPermTreeNode } from './permission/permission-pipe';
import { MarketStaffComponent } from './market-staff/market-staff.component';
import {ToAreaTreeNode} from './area/area-pipe';
import {MarketStaffAddComponent} from './market-staff/market-staff-add/market-staff-add.component';
import {MarketStaffEditComponent} from './market-staff/market-staff-edit/market-staff-edit.component';
import {UiModule} from '../../@core/ui/ui.module';
import {SystemModule as CoreSystemModule} from '../../@core/data/system/system.module';
import { MarketPhotoEditComponent } from './market/market-photo-edit/market-photo-edit.component';
import { MarketPhotoBusinessComponent } from './market/market-photo-business/market-photo-business.component';
import { MarketPhotoCertificateCodeComponent } from './market/market-photo-certificate-code/market-photo-certificate-code.component';
import { MarketPhotoFormNameComponent } from './market/market-photo-form-name/market-photo-form-name.component';
import { RoleComponent } from './role/role.component';
import { RoleAddComponent } from './role/role-add/role-add.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { PhotoExampleComponent } from './photo-example/photo-example.component';
import { PhotoExampleAddComponent } from './photo-example/photo-example-add/photo-example-add.component';
import { PhotoExampleEditComponent } from './photo-example/photo-example-edit/photo-example-edit.component';

const components = [
  CodeitemEditComponent,
  ToPermTreeNode,
  ToAreaTreeNode,
  MarketStaffComponent,
  MarketStaffAddComponent,
  MarketStaffEditComponent,
  MarketPhotoBusinessComponent,
  MarketPhotoCertificateCodeComponent,
  MarketPhotoFormNameComponent,
  PhotoExampleComponent,
  PhotoExampleAddComponent,
  PhotoExampleEditComponent,
];

@NgModule({
imports: [ThemeModule, SystemRoutingModule,  HttpModule, UiModule, CommonModule, RouterModule , FormsModule, CalendarModule,
  LightboxModule, MegaMenuModule, TreeModule, DialogModule, CheckboxModule, TabViewModule, DataTableModule, SharedModule,
  InputTextModule, AutoCompleteModule, HttpClientModule, UiModule, CoreSystemModule ],
  declarations: [
  ...routedComponents,
  ...components,
],
})
export class SystemModule {}
