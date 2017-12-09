import {ModuleWithProviders, NgModule} from '@angular/core';
import {DeviceService} from './device.service';

@NgModule({
  providers: [
    DeviceService,
  ],
})
export class DeviceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DeviceModule,
      providers: [
        DeviceService,
      ],
    };
  }
}
