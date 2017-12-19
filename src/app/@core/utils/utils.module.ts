import {ModuleWithProviders, NgModule} from '@angular/core';
import {AnalyticsService} from './analytics.service';
import {MessageService} from './message.service';
import {UploadService} from './upload.service';

const SERVICES = [
  AnalyticsService,
  MessageService,
  UploadService,
];
@NgModule({
  providers: [
    ...SERVICES,
  ],
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
