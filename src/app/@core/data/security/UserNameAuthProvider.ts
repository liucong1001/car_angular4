import {NbAbstractAuthProvider, NbAuthResult} from '@nebular/auth';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

/**
 * 用户名登录驱动
 */
export class UserNameAuthProvider extends NbAbstractAuthProvider {
  constructor(private http: HttpClient) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    // this.http.post("/")
    return undefined;
  }

  register(data?: any): Observable<NbAuthResult> {
    return undefined;
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return undefined;
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return undefined;
  }

  logout(): Observable<NbAuthResult> {
    return undefined;
  }

}
