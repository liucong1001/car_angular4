import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

/**
 * 权限拦截服务
 */
@Injectable()
export class SecurityInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch(err => {
      if (err.status === 401) {
        this.router.navigate(['/auth/login']);
        return;
      }
       if (err.error) {
        return Observable.throw(err.error);
       }
       return Observable.throw(err);
    });
  }

  constructor(private router: Router) {
  }

}
