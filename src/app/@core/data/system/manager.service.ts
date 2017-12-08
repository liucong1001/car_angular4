import { Managermap } from './../../model/system/managermap';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ManagerService {
  private path = '/rest/sys/managermap';
  constructor(private http: Http) {
  }

  /**
   * 保存用户
   * @param model
   * @returns {Promise<Managermap>}
   */
  public save(model): Promise<Managermap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Managermap);
  }


}
