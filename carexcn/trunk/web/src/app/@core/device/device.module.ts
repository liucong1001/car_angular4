import {ModuleWithProviders, NgModule} from '@angular/core';
import {DeviceService} from './device.service';
import {BillPrintService} from './bill-print.service';
import {FingerService} from './finger.service';
import {IccardService} from './iccard.service';
import {IdcardService} from './idcard.service';
import {ScannerService} from './scanner.service';
import {WebcamService} from './webcam.service';

const SERVICES = [
  DeviceService,
  BillPrintService,
  FingerService,
  IccardService,
  IdcardService,
  ScannerService,
  WebcamService,
];
@NgModule({
  providers: [
    ...SERVICES,
  ],
})
export class DeviceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DeviceModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
