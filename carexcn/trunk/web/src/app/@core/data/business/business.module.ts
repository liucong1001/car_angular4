import {ModuleWithProviders, NgModule} from '@angular/core';
import {PrejudicationService} from './prejudication.service';
import {TradeService} from './trade.service';
import {TransferService} from './transfer.service';
import {TransferDirectService} from './transfer-direct.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  PrejudicationService,
  TradeService,
  TransferService,
  TransferDirectService,
];

/**
 *
 */
@NgModule({
  declarations: [],
})
export class BusinessModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: BusinessModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
