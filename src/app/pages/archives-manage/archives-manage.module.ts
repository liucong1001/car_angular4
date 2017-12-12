import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ArchivesManageRoutingModule, routedComponents} from './archives-manage-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {UiTableModule} from '../../@core/ui/table/table.module';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ArchivesManageRoutingModule,
    UiTableModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ArchivesManageModule { }
