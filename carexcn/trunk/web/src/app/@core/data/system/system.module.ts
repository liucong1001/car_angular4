import {ModuleWithProviders, NgModule} from '@angular/core';
import {CodeService} from './code.service';
import {CodeitemService} from './codeitem.service';
import {MarketStaffService} from './market-staff.service';
import {CodeTransPipe} from './code.trans.pipe';
import {ValidatorService} from './validator.service';
import {MarketService} from './market.service';
import {FileSystemService} from './file-system.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CodeService,
  CodeitemService,
  MarketStaffService,
  CodeTransPipe,
  ValidatorService,
  MarketService,
  FileSystemService,
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
