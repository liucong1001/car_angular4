import { Injectable } from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

/**
 *
 */
@Injectable()
export class AuthGuardService implements CanActivate , CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return undefined;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return true;
    // return this.authService.isAuthenticated()
    //   .do(authenticated => {
    //     return true;
    //     if (!authenticated) {
    //       this.router.navigate(['auth/login']);
    //     }
    //   });
  }

  constructor(private authService: NbAuthService, private router: Router) { }

}
