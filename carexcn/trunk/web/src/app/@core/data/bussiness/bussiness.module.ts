import {ModuleWithProviders, NgModule} from '@angular/core';
import { CarService } from './car.service';
import {PrejudicationService} from './prejudication.service';
import {TradeService} from './trade.service';
import {TransferService} from './transfer.service';
import {TransferDirectService} from './transfer-direct.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CarService,
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
export class BussinessModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: BussinessModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
