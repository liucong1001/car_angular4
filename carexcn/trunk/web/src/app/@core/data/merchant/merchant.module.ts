import {ModuleWithProviders, NgModule} from '@angular/core';
import {MerchantService} from './merchant.service';
import {FilingService} from './filing.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  MerchantService,
  FilingService,
];

/**
 *
 */
@NgModule({
  declarations: [],
})
export class MerchantModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: MerchantModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
