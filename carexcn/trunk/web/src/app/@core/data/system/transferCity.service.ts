import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TransferCitymap} from '../../model/system/transferCitymap';

@Injectable()
export class TransferCityService {
  private path = '/rest/common/vehicle/management';
  constructor(private http: Http) {
  }

  /**
   * 保存车管所
   * @param model
   * @returns {Promise<TransferCitymap>}
   */
  public save(model): Promise<TransferCitymap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as TransferCitymap);
  }

  public searchArea(event) {
    const url = '/rest/sys/area?key=' + event.query;
    return this.http.get(url).toPromise().then(res => res.json());
  }

  /**
   * 根据ID车管所信息
   * @param {String} id
   * @returns {Promise<Codemap>}
   */
  public get(id: String): Promise<TransferCitymap> {
    const url = `${this.path}/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as TransferCitymap;
    });
  }

  /**
   * 删除代码集
   * @param {String} id
   * @returns {Promise<any>}
   */
  public remove(id: String): Promise<any> {
    const url = `${this.path}/${id}`;
    return this.http.delete(url).toPromise();
  }
}
