import { Injectable } from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {RestMessage} from '../../model/common/RestMessage';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {marketDiffer} from '../../model/system/market-differ';

/**
 * 市场差异配置服务
 */
@Injectable()
export class MarketDifferService {
  private url = '/rest/sys/market/differ';

  constructor(private http: RestService) { }

  /**
   *  根据市场id查询市场交易配置
   * @param {string} id  请求参数
   * @returns {Promise<any>}  响应参数
   */
  public findByMarketId(id:string):Promise<any>{
    return this.http.get(`${this.url}/findByMarket/${id}`,{}).toPromise();
  }

  /**
   *  添加市场差异配置
   * @param marketDiffer
   * @returns {Promise<any>}
   */
  public saveMarketDiff(model: marketDiffer):Promise<any>{
    const url = `${this.url}/saveMarketDiff`;
    return this.http.post(url,model).toPromise().then(res=>{
      return res;
    })
  }
}
