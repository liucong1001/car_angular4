import {ModuleWithProviders, NgModule} from '@angular/core';
import {AnalyticsService} from './analytics.service';
import {MessageService} from './message.service';
import {UploadService} from './upload.service';
import {RestService} from './rest.service';
import {CommonDialogService} from './common-dialog.service';

const SERVICES = [
  RestService,
  AnalyticsService,
  MessageService,
  UploadService,
  CommonDialogService,
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
