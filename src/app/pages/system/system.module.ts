/**
 * 周扬
 */
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, SystemRoutingModule} from './system-routing.module';
import {HttpModule} from '@angular/http';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CodeEditComponent} from "./code/code-edit.component";
import {CodeitemEditComponent} from "./code/codeitem-edit.component";

const components = [
  CodeitemEditComponent,
];

@NgModule({
  imports: [ThemeModule, SystemRoutingModule,  HttpModule, UiTableModule, CommonModule, RouterModule ],
  declarations: [...routedComponents, ...components],
  providers: [],
})
export class SystemModule {}
