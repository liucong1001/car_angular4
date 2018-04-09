import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleRoutingModule, routedComponents } from './example-routing.module';
import {UiModule} from '../../@core/ui/ui.module';
import {ThemeModule} from '../../@theme/theme.module';
import {SystemModule} from '../../@core/data/system/system.module';
import {BusinessFormGroup} from '../business/business.form-group';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ExampleRoutingModule,
    UiModule,
    SystemModule,
    BusinessFormGroup,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ExampleModule { }
