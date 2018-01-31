import {ModuleWithProviders, NgModule} from '@angular/core';
import {CodeService} from '../system/code.service';
import {CodeitemService} from '../system/codeitem.service';
import {CodeTransPipe} from '../system/code.trans.pipe';
import {ValidatorService} from '../system/validator.service';
import {OrderCancelService} from  './orderCancel.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  OrderCancelService,
];

/**
 *
 */
@NgModule({
  exports: [],
  declarations: [],
})
export class moneyModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: moneyModule,
      declarations: [],
      providers: [
        ...SERVICES,
      ],
    };
  }
}
