import {ModuleWithProviders, NgModule} from '@angular/core';
import {IccardService} from '../../device/iccard.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  IccardService,
];

/**
 *
 */
@NgModule({
  declarations: [],
})
export class IcCardModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: IcCardModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
