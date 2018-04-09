import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule, routedComponents } from './example-routing.module';
import {UiModule} from '../../@core/ui/ui.module';
import {ThemeModule} from '../../@theme/theme.module';
import {SystemModule} from '../../@core/data/system/system.module';
import { BigFormComponent } from './big-form/big-form.component';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ExampleRoutingModule,
    UiModule,
    SystemModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ExampleModule { }
