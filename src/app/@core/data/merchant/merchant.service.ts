import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {MerchantModel} from '../../model/bussiness/merchant.model';

@Injectable()
export class MerchantService {
  constructor(private http: Http) {}
  private api_url_base = 'rest/merchant/';
  private merchants: MerchantModel[] = [
    {id: 'A100000', name: 'B00001'},
    {id: 'A200000', name: 'B00002'},
    {id: 'A300000', name: 'B00003'},
    {id: 'A400000', name: 'B00004'},
    {id: 'A500000', name: 'B00005'},
    {id: 'A600000', name: 'B00006'},
    {id: 'A700000', name: 'B00007'},
  ];
  public merchant: MerchantModel = {
    id: '',
    name: '',
  };
  getmerchants(cid: string): Promise<MerchantModel[]> {
    let result: Promise<MerchantModel[]>;
    if (isDevMode()) {
      result = Promise.resolve(this.merchants).then((res) => res as MerchantModel[]);
    } else {
      result = this.http.get(this.api_url_base + 'cid/' + cid).toPromise().then((res) => res.json() as MerchantModel[]);
    }
    return result;
  }
}
