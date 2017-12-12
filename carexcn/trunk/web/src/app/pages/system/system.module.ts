// import { TransferCityitemEditComponent } from './transferCity/transferCity-edit.component';
// import { TransferCityitemEditComponent } from './transferCity/transferCityitem-edit.component';
/**
 * 周扬
 */
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, SystemRoutingModule} from './system-routing.module';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CodeEditComponent} from './code/code-edit.component';
import {CodeitemEditComponent} from './code/codeitem-edit.component';
import { TransferCityitemEditComponent } from './transfer-city/transferCityitem-edit.component';
import {UiModule} from '../../@core/ui/ui.module';

const components = [
  CodeitemEditComponent, TransferCityitemEditComponent,
];

@NgModule({
  imports: [ThemeModule, SystemRoutingModule,  HttpModule, UiModule, CommonModule, RouterModule ],
  declarations: [...routedComponents, ...components],
  providers: [],
})
export class SystemModule {}
