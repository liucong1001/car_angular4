import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {MerchantForm} from '../../model/bussiness/merchant.form';

@Injectable()
export class MerchantService {
  constructor(private http: Http) {}
  private api_url_base = '/rest/merchant';
  public add(model: MerchantForm): Promise<MerchantForm> {
    return this.http.post(this.api_url_base, model).toPromise().then((res) => res.json() as MerchantForm);
  }
  public update(model: MerchantForm): Promise<MerchantForm> {
    return this.http.put(this.api_url_base, model).toPromise().then((res) => res.json() as MerchantForm);
  }
  public del(id: string): Promise<any> {
    return this.http.delete(this.api_url_base + '/' + id).toPromise();
  }
  public get(id: string): Promise<any> {
    return this.http.get(this.api_url_base + '/' + id).toPromise().then((res) => res.json() as MerchantForm);
  }
}

