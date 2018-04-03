import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BillRefundService {

  private path = '/rest/pay/backpayment';
  constructor(private http: Http) {
  }

  public getInfo(id:string):Promise<any>{
    const url = `${this.path}/back/`+id;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

}
