import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { MarketBrandmap } from './../../model/system/marketbrand';
import { Marketmap } from './../../model/system/Marketmap';
import {Marketfeemap} from './../../model/system/market-fee-map';
import {Marketphotomap} from './../../model/system/market-photo-map';

@Injectable()
export class MarketService {
  private path = '/rest/sys/market';
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

  public saveMarketEdit(model): Promise<Marketmap> {
    return this.http.put(this.path, model).toPromise().then((res) => res.json() as Marketmap);
  }


  public getMarket(id: String): Promise<Marketmap> {
    const url = `${this.path}/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Marketmap;
    });
  }

  /**
   * 保存厂牌型号
   * @param model
   * @returns {Promise<TResult2|MarketBrandmap>}
   */
  public saveBrand(model): Promise<MarketBrandmap> {
    const url = `${this.path}/createMarket`;
    return this.http.post(url, model).toPromise().then((res) => res.json() as MarketBrandmap);
  }

  /**
   * 保存市场业务费用
   * @param model
   * @returns {Promise<TResult2|Marketfeemap>}
   */
  public saveFee(model): Promise<Marketfeemap> {
    const url = `${this.path}/cost`;
    return this.http.post(url, model).toPromise().then((res) => res.json() as Marketfeemap);
  }

  /**
   *
   * @param model
   * @returns {Promise<TResult2|Marketfeemap>}
   */
  public saveFeeEdit(model): Promise<Marketfeemap> {
    const url = `${this.path}/cost`;
    return this.http.put(url, model).toPromise().then((res) => res.json() as Marketfeemap);
  }


  public getFee(id: String): Promise<Marketfeemap> {
    const url = `${this.path}/cost/costById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Marketfeemap;
    });
  }

  public deleteFee(id: String) {
    const url = `${this.path}/cost/deleteMarketCost/${id}`;
    return this.http.delete(url).toPromise().then(function (res) {
    }) ;
  }

  /**
   * 保存市场证件
   * @param model
   * @returns {Promise<TResult2|Marketphotomap>}
   */
  public savePhoto(model): Promise<Marketphotomap> {
    const url = `${this.path}/photo/config`;
    return this.http.post(url, model).toPromise().then((res) => res.json() as Marketphotomap);
  }

  /**
   * 根据id获取证件信息
   * @param id
   * @returns {Promise<TResult2|Marketphotomap>}
   */

  public getPhoto(id: String): Promise<Marketphotomap> {
    const url = `${this.path}/photo/config/findById/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Marketphotomap;
    });
  }

  /**
   * 修改保存市场证件
   * @param model
   * @returns {Promise<TResult2|Marketphotomap>}
   */
  public savePhotoEdit(model): Promise<Marketphotomap> {
    const url = `${this.path}/photo/config`;
    return this.http.put(url, model).toPromise().then((res) => res.json() as Marketphotomap);
  }

  /**
   * 获取所有业务类型
   * @param model
   */
  public  findBusiness(model) {
     const url = `${this.path}/photo/config/findBusiness`;
     return this.http.post(url, model).toPromise().then(res => res.json());
  }
  /**
   * 根据市场和业务类型查询
   * @param model
   */
  public  findCertificateCode(model) {
    const url = `${this.path}/photo/config/findByCertificateCode`;
    return this.http.post(url, model).toPromise().then(res => res.json());
 }
/**
 * 根据市场，业务类型，证件类型，查询所有表单信息
 * @param model
 */
  public findFormName(model) {
    const url = `${this.path}/photo/config/findByFormName`;
    return this.http.post(url, model).toPromise().then(res => res.json());
  }
  /**
   * 根据市场，业务，证件和表单名称查询证件配置信息
   * @param model
   */
  public findMarketPhoto(model) {
    const url = `${this.path}/photo/config/findByMarketPhoto`;
    return this.http.post(url, model).toPromise().then(res => res.json());
  }


}
