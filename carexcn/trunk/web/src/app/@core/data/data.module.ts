import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import {PagerService} from './pager.service';
import {SystemModule} from './system/system.module';
import {SecurityModule} from './security/security.module';
import {BusinessModule} from './business/business.module';
import {IcCardModule} from './ic-card/ic-card.module';
import {MerchantModule} from './merchant/merchant.module';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  PagerService,
  ...MerchantModule.forRoot().providers,
  ...BusinessModule.forRoot().providers,
  ...SystemModule.forRoot().providers,
  ...SecurityModule.forRoot().providers,
  ...IcCardModule.forRoot().providers,
];

@NgModule({
  // imports: [
  //   CommonModule,
  // ],
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
