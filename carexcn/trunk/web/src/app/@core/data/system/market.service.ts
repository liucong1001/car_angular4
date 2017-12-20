import { Marketmap } from './../../model/system/Marketmap';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class MarketService {
  private path = '/rest/sys/Marketmap';
  constructor(private http: Http) {
  }

  /**
   * 保存市场
   * @param model
   * @returns {Promise<Marketmap>}
   */
  public save(model): Promise<Marketmap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Marketmap);
  }


}
