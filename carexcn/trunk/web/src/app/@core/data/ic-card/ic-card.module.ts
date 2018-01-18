import {ModuleWithProviders, NgModule} from '@angular/core';


/**
 * 导出服务
 * @type {Array}
 */
const SERVICES = [

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
