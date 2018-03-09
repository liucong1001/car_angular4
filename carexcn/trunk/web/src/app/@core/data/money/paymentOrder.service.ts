import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/business/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';
import  {changePasswordModel} from '../../model/icCard/changePassword'
import {paymentOrderPayModel} from '../../model/money/paymentOrder.model'
import {promise} from "selenium-webdriver";


@Injectable()
export class PaymentOrderService {
  private path = '/rest/pay/payorder';
  constructor(private http: Http) {
  }

  /**
   * 根据id查询订单信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public getOrderInfo(id: String): Promise<any> {
    const url = `${this.path}/order/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 订单支付
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */

  public payOrder(model:any):Promise<any>{
      const  url =`/rest/pay/ReceiveRecord/`;
      return this.http.post(url,model).toPromise().then(function (res) {
        return res.json() as any
      })
  }



}
