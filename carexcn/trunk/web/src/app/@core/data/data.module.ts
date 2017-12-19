import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import {PagerService} from './pager.service';
import {SystemModule} from './system/system.module';
import {SecurityModule} from "./security/security.module";

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  PagerService,
  ...SystemModule.forRoot().providers,
  ...SecurityModule.forRoot().providers,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
