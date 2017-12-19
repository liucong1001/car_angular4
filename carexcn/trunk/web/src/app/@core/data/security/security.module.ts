import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuardService} from './auth-guard.service';
const SERVICES = [
  AuthGuardService,
]
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
})


export class SecurityModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SecurityModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
