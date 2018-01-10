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
    // return true;
    return this.authService.isAuthenticated()
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['oauth/login']);
        }
        return true;
      });
  }

  constructor(private authService: NbAuthService, private router: Router) { }

}
