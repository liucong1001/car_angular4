/**
 * 优惠结算后台接口
 */
import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {comomnAutionProject,commonAutionSale} from '../../model/common-aution/project.model';
import {promise} from "selenium-webdriver";


@Injectable()
export class commonAutionBalanceService {
  private path = '/rest/business/trade/sales';
  constructor(private http: Http) {
  }

  /**
   * 第一次结算
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public settlement(id:string):Promise<any>{
    const url = `${this.path}/settleAccounts/${id}`;
    return this.http.post(url,null).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

  /**
   * 查询结算记录信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public  getRecord(id:string):Promise<any>{
    const url = `rest/business/trade/projectRecord/findByProject/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

  /**
   * 重新结算
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public settlementAgain(isSave:string,id:string):Promise<any>{
    const url = `${this.path}/settleAccountsAgain?isSave=`+isSave+`&projectId=`+id;
    return this.http.post(url,null).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

  /**
   * 支付
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public  pay(id:string):Promise<any>{
    const url = `${this.path}/projectPay/${id}`;
    return this.http.put(url,null).toPromise().then(function (res) {
      return res.json() as any;
    })
}

}
