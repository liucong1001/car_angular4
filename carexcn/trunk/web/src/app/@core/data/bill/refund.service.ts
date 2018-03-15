import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export   class RefundService{

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

}
