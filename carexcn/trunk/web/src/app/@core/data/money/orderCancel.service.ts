import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';
import  {changePasswordModel} from '../../model/icCard/changePassword'
import {paymentOrderPayModel} from '../../model/money/paymentOrder.model'
import {promise} from "selenium-webdriver";


@Injectable()
export class OrderCancelService {
  private path = '/rest/pay';
  constructor(private http: Http) {
  }

  /**
   * 删除整个订单 (未缴费支付的订单)
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public  orderDelete(id: String): Promise<any> {
    const url = `${this.path}/payorder/order/`+id;
    return this.http.delete(url).toPromise()
  }

  /**
   * 删除订单中单条流水号
   * @param id
   * @returns {Promise<TResult2|TResult1>}
   */
  public  orderArcDelete(id: String): Promise<any> {
    const url = `${this.path}/payorder/pamnet/`+id;
    return this.http.delete(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }






  /**
   * 订单中--单笔流水撤销   不存在了  只有未缴费的才能撤销，缴费了的不能撤销
   * @param id
   * @param payStatus
   * @returns {Promise<TResult2|TResult1>}
   */
  public  paymentCancel(id: String,payStatus:String): Promise<any> {
    const url = `${this.path}/payment/cancel?id=`+id+'&paystatus='+payStatus;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 撤销整个订单  -- 不存在了  只有未缴费的才能撤销，缴费了的不能撤销
   * @param id
   * @param payStatus
   * @returns {Promise<TResult2|TResult1>}
   */
  public  payorderCancel(id: String,payStatus:String): Promise<any> {
    const url = `${this.path}/payorder/cancel?id=`+id+'&paystatus='+payStatus;
    return this.http.patch(url,null).toPromise().then(function (res) {
      return res.json() as any;
    });
  }


}
