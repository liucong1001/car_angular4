import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';
import  {changePasswordModel} from '../../model/icCard/changePassword'
import {promise} from "selenium-webdriver";


@Injectable()
export class PaymentService {
  private path = '/rest/pay/payorder';
  constructor(private http: Http) {
  }

  /**
   * 创建订单
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  createOrder(model:any){
    const url = `${this.path}/add`;
      return this.http.post(url,model).toPromise().then(function (res) {
        return res.json() as any;
      })
  }

  /**
   * 根据市场cloudUser获取费用
   * @param cloudUser
   * @returns {Promise<TResult2|TResult1>}
   */
  public getCost(cloudUser: String): Promise<any> {
    const url = `rest/manager/market/cost/marketcost/${cloudUser}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 根据流水号获取费用信息
   * @param arc
   * @returns {Promise<TResult2|TResult1>}
   */

  public getArcFee(arc:string):Promise<any>{
    const url = `rest/business/trade/cost?archiveNo=`+arc;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 根据流水号获取商户信息
   * @param arc
   * @returns {Promise<TResult2|TResult1>}
   */

  public getArcInfo(arc:string):Promise<any>{
    const url = `rest/business/trade?archiveNo=`+arc;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

}
