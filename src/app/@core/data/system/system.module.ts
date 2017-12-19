import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CodeService} from "./code.service";
import {CodeitemService} from "./codeitem.service";
import {ManagerService} from "./manager.service";

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CodeService,
  CodeitemService,
  ManagerService,
]

/**
 *
 */
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})
export class SystemModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SystemModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
