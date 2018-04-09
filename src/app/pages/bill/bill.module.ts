import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BillRoutingModule, routedComponents} from './bill-routing.module';

import {ThemeModule} from '../../@theme/theme.module';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {UiModule} from '../../@core/ui/ui.module';
import {MultiSelectModule} from 'primeng/primeng';
import {SystemModule as CoreSystemModule} from '../../@core/data/system/system.module';



@NgModule({
  imports: [
    CommonModule,
    BillRoutingModule,
    ThemeModule,  /*标签*/
    UiTableModule,
    HttpModule,
    RouterModule,
    UiModule, /*ngx-ys-calendar标签*/
    MultiSelectModule,
    CoreSystemModule,
  ],
  declarations: [...routedComponents, ]
})
export class BillModule { }
