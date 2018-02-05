import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class MobileService {
  constructor(private http: Http) {}
  private api_url_base = '/rest/business/trade';

  /**
   * 查询交易车辆信息 (可查询交易所有信息)
   * @param {string} archiveNo   流水号
   * @returns {Promise<any>}
   */
  public get(archiveNo: string): Promise<any> {
    return this.http.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise();
  }

  /**
   * 手机端录入打回
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public back(model:any):Promise<any>{
    const url = `${this.api_url_base}/back`;
    return this.http.put(url, model).toPromise().then(res => res.json());
  }


}
