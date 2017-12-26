import {ModuleWithProviders, NgModule} from '@angular/core';
import {CodeService} from './code.service';
import {CodeitemService} from './codeitem.service';
import {ManagerService} from './manager.service';
import {MarketStaffService} from './market-staff.service';
import {CodeTransPipe} from './code.trans.pipe';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CodeService,
  CodeitemService,
  ManagerService,
  MarketStaffService,
  CodeTransPipe,
];

/**
 *
 */
@NgModule({
  exports: [CodeTransPipe],
  declarations: [CodeTransPipe],
})
export class SystemModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SystemModule,
      declarations: [CodeTransPipe],
      providers: [
        ...SERVICES,
      ],
    };
  }
}
