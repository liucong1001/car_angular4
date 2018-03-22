/**
 *已支付订单退费
 */
import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/business/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';
import  {changePasswordModel} from '../../model/icCard/changePassword'
import {paymentOrderPayModel} from '../../model/money/paymentOrder.model'
import {promise} from "selenium-webdriver";
import {OrderRefund} from "../../model/money/orderRefund.model";

@Injectable()
export class OrderRefundService {
  private path = '/rest/pay';
  constructor(private http: Http) {
  }


  /**
   * 根据流水号获取存在于订单中的相关信息
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public getArcInfo(id:String):Promise<any>{
    const url = `${this.path}/payment/business/`+id;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 退费
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public cancelPayment(model:OrderRefund):Promise<any>{
    const url = `${this.path}/payment/cancel/`;
    return this.http.patch(url,model).toPromise().then(function (res) {
        return res.json() as any;
    })
  }

}
