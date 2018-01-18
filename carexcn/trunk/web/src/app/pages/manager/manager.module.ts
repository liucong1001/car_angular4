import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerRoutingModule, routedComponents} from './manager-routing.module';
import {UiModule} from '../../@core/ui/ui.module';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {CodemirrorModule} from 'ng2-codemirror';

const component = [
  ...routedComponents,
];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    ThemeModule,
    RouterModule,
    ManagerRoutingModule,
    CodemirrorModule,
  ],
  declarations: [component],
})
export class ManagerModule { }
