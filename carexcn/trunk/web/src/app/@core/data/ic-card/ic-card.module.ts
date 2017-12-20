import {ModuleWithProviders, NgModule} from '@angular/core';
import {CardService} from './card.service';

/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [
  CardService,
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
