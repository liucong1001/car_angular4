import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {RestService} from '../../utils/rest.service';
import {MerchantForm} from '../../model/business/merchant.form';
import {SonMerchantForm} from '../../model/business/son.merchant.form';

@Injectable()
export class MerchantService {
  constructor(private rest: RestService) {}
  private api_url_base = '/rest/merchant';
  public add(model: MerchantForm): Promise<MerchantForm> {
    return this.rest.post(this.api_url_base, model).toPromise();
  }
  public update(model: MerchantForm): Promise<MerchantForm> {
    return this.rest.put(this.api_url_base, model).toPromise();
  }
  public del(id: string): Promise<any> {
    return this.rest.delete(this.api_url_base + '/' + id).toPromise();
  }
  public get(id: string): Promise<MerchantForm> {
    return this.rest.get(this.api_url_base + '/' + id).toPromise();
  }
  public start(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/start/' + id, null).toPromise();
  }
  public stop(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/stop/' + id, null).toPromise();
  }
  public createSon(sonForm: SonMerchantForm): Promise<any> {
    return this.rest.post('/rest/son/merchant', sonForm).toPromise();
  }
}

