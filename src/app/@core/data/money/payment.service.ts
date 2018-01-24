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
   * 根据流水号获取相关信息
   * @param arc
   * @returns {Promise<TResult2|TResult1>}
   */

  public getArcInfo(arc:string):Promise<any>{
    const url = `rest/business/trade?archiveNo=`+arc;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }



  /**
   * ic卡充值
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public recharge(model: IcCardRechargemap): Promise<any> {
    const url =  `${this.path}/recharge`;
    return this.http.post(url, model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 获取ic卡充值信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */

  public rechargeInfo(id:string):Promise<any>{
    const url = `rest/pay/recharge/info/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * ic卡充值撤销
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */

  public rechargeCancel(model:any):Promise<any>{
    const url = `${this.path}/revoke`;
    return this.http.post(url, model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * IC卡解绑
   * @param icCardNO
   * @returns {Promise<TResult2|TResult1>}
   */
  public  iccardRemove(icCardNO:string):Promise<any>{
    const url = `${this.path}/remove/${icCardNO}`;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * ic卡挂失
   * @param icCardNO
   * @returns {Promise<TResult2|TResult1>}
   */

  public  iccardLoss(icCardNO:string):Promise<any>{
    const url = `${this.path}/loss/${icCardNO}`;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * IC卡取消挂失
   * @param icCardNO
   * @returns {Promise<TResult2|TResult1>}
   */
  public  iccardLossCancel(icCardNO:string):Promise<any>{
    const url = `${this.path}/cancel/${icCardNO}`;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * IC卡密码重置
   * @param icCardNO
   * @returns {Promise<TResult2|TResult1>}
   */
  public  iccardReset(icCardNO:string):Promise<any>{
    const url = `${this.path}/reset/${icCardNO}`;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * IC卡密码修改
   * @param icCardNO
   * @returns {Promise<TResult2|TResult1>}
   */

  public  iccardChange(model:changePasswordModel):Promise<any>{
    const url = `${this.path}/change`;
    return this.http.patch(url,model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 账户注销
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public accountRemove(model:any):Promise<any>{
    const url = `/rest/pay/icaccount/remove`;
    return this.http.put(url, model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }


}
