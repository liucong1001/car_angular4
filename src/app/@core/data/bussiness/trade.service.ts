import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TradeForm} from '../../model/bussiness/trade/trade.form';

@Injectable()
export class TradeService {
  constructor(private http: Http) {}
  private api_url_base = '/rest/business/trade';

  /**
   * 查询交易车辆信息 (可查询交易所有信息)
   * @param {string} archiveNo   流水号
   * @returns {Promise<any>}
   */
  public get(archiveNo: string): Promise<TradeForm> {
    return this.http.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise().then((res) => res.json() as TradeForm);
  }

  /**
   * 修改交易车辆信息 (可修改所有交易信息)
   * @param {TradeForm} form
   * @returns {Promise<any>}
   */
  public update(form: TradeForm): Promise<any> {
    return this.http.put(this.api_url_base, form).toPromise();
  }

}
