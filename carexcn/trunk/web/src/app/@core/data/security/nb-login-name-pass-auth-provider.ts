import {NbAbstractAuthProvider, NbAuthResult} from '@nebular/auth';
import {Observable} from 'rxjs/Observable';

export class NbLoginNamePassAuthProvider extends NbAbstractAuthProvider{
  authenticate(data?: any): Observable<NbAuthResult> {
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

  constructor() {
    super();
  }

}
