import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthGuardService} from './auth-guard.service';
const SERVICES = [
  AuthGuardService,
]
@NgModule({
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
