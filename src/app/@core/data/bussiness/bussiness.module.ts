import {ModuleWithProviders, NgModule} from '@angular/core';
import { CarService } from './car.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CarService,
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
