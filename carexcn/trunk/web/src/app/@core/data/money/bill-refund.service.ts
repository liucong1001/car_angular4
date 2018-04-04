import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {BillRefund} from "../../model/money/bill-refund";


@Injectable()
export class BillRefundService {

  private path = '/rest/pay/backpayment';
  constructor(private http: Http) {
  }

  public getInfo(id:string):Promise<BillRefund>{
    const url = `${this.path}/back/`+id;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as BillRefund;
    });
  }

  public back(model:any):Promise<any>{
    const url = `${this.path}/cancel/`;
    return this.http.patch(url,model).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

}
