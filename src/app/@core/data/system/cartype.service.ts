import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Cartypemap} from '../../model/system/cartypemap';

@Injectable()
export class CartypeService {
  private path = '/rest/sys/market/vehicle';
  constructor(private http: Http) {
  }

  /**
   * 保存车辆类型
   * @param model
   * @returns {Promise<Cartypemap>}
   */
  public save(model): Promise<Cartypemap> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as Cartypemap);
  }

  /**
   * 修改保存
   * @param model
   * @returns {Promise<TResult2|Cartypemap>}
   */
  public saveEdit(model): Promise<Cartypemap> {
    return this.http.put(this.path, model).toPromise().then((res) => res.json() as Cartypemap);
  }

  /**
   * 获取车辆类型信息
   * @param {String} id
   * @returns {Promise<Cartypemap>}
   */
  public get(id: String): Promise<Cartypemap> {
    const url = `${this.path}/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Cartypemap;
    });
  }

  /**
   * 获取所有市场
   *
   * @returns {Promise<TResult2|Cartypemap[]>}
   */
  public getAllMarket(): Promise<Cartypemap[]> {
    const url = `rest/sys/market/vehicle/findMarketAll`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Cartypemap[];
    });
  }

}
