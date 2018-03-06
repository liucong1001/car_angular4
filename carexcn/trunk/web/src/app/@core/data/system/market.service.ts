import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { MarketBrandmap } from './../../model/system/marketbrand';
import { Marketmap } from './../../model/system/Marketmap';
import {Marketfeemap} from './../../model/system/market-fee-map';
import {Marketphotomap} from './../../model/system/market-photo-map';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class MarketService {
  private path = '/rest/manager/market';
  constructor(private http: Http, private rest: RestService) {
  }
  /**
   * 根据市场，业务，证件和表单名称查询证件配置信息 [clh021@gmail.com]
   * @param {Marketphotomap} model
   * @returns {Promise<any>}
   */
  public getCertificateConfig(model: Marketphotomap): Promise<any> {
    return this.rest.post(this.path + '/photo/config/photo', model).toPromise();
    // return this.http.post('/rest/sys/market/photo/config/photo/', model).toPromise();
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
    const url = `${this.path}/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Marketmap;
    });
  }

  /**
   * 获取所有市场
   * @returns {Promise<TResult2|TResult1>}
   */

  public getAllMarketList(): Promise<any> {
    const url = `${this.path}/list`;
    return  this.http.get(url).toPromise().then(function(res){
        return res.json();
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
    const url = `${this.path}/cost/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as Marketfeemap;
    });
  }

  public deleteFee(id: String) {
    const url = `${this.path}/cost/${id}`;
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
    const url = `${this.path}/photo/config/${id}`;
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
   * 区分pc，app证件类型
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public getBusiness(model) {
    const url = `${this.path}/photo/config/business`;
    return this.http.post(url, model).toPromise().then(res => res.json());
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
    const url = `${this.path}/photo/config/certificate/code`;
    return this.http.post(url, model).toPromise().then(res => res.json());
 }
/**
 * 根据市场，业务类型，证件类型，查询所有表单信息
 * @param model
 */
  public findFormName(model) {
    const url = `${this.path}/photo/config/form/name`;
    return this.http.post(url, model).toPromise().then(res => res.json());
  }
  /**
   * 根据市场，业务，证件和表单名称查询证件配置信息
   * @param model
   */
  public findMarketPhoto(model) {
    const url = `${this.path}/photo/config/market/photo`;
    return this.http.post(url, model).toPromise().then(res => res.json());
  }


}
