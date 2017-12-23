import {ModuleWithProviders, NgModule} from '@angular/core';
import {CodeService} from './code.service';
import {CodeitemService} from './codeitem.service';
import {ManagerService} from './manager.service';
import {CodeTransPipe} from './code.trans.pipe';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CodeService,
  CodeitemService,
  ManagerService,
  CodeTransPipe,
];

/**
 *
 */
@NgModule({
  declarations: [],
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
