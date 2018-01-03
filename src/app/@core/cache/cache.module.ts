import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalstorageService} from './localstorage.service';

const SERVICES = [
  LocalstorageService,
];
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    ...SERVICES,
  ],
})
export class CacheModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CacheModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
