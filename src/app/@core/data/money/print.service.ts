import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';
import  {changePasswordModel} from '../../model/icCard/changePassword'
import {paymentOrderPayModel} from '../../model/money/paymentOrder.model'
import {promise} from "selenium-webdriver";
import {TradeBill} from "../../model/money/print.model";


@Injectable()
export class PrintService {
  private path = '/rest/business/trade/bill';
  constructor(private http: Http) {
  }


  public createBill(archiveNo: String): Promise<any> {
    const url = `${this.path}?archiveNo=`+archiveNo;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 开票接口
   * @param id
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public print(id:string,model:TradeBill):Promise<any>{
    const url = `${this.path}/${id}`;
    return this.http.put(url,model).toPromise().then(function (res) {
      return res.json() as any;
    });
  }



}
