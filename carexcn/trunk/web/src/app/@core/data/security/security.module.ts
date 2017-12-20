import {ModuleWithProviders, NgModule} from '@angular/core';
import {NB_AUTH_TOKEN_WRAPPER_TOKEN, NbAuthJWTToken} from '@nebular/auth';
import {AuthGuardService} from './auth-guard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SecurityInterceptorService} from './security-interceptor.service';
const SERVICES = [
  { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
  AuthGuardService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptorService,
    multi: true,
  },
];
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
