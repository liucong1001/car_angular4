import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {CardModel} from '../../model/bussiness/card.model';
import {IcCardRechargemap} from '../../model/icCard/recharge';


@Injectable()
export class IcCardOperationService {
  private path = '/rest/pay/iccard';
  constructor(private http: Http) {
  }
  public get(iccardno: String): Promise<any> {
    const url = `${this.path}/info/${iccardno}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  public recharge(model: IcCardRechargemap): Promise<any> {
      const url =  `${this.path}/recharge`;
      return this.http.post(url, model).toPromise().then(function (res) {
        return res.json() as any;
      });
  }




}
