import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/business/trade/trade.form';
import {RestService} from '../../utils/rest.service';
import {BusinessTradeForm} from '../../model/business/restruct/business.trade.form';

@Injectable()
export class TradeService {
  constructor(private rest: RestService) {}
  private api_url_base = '/rest/business/trade';

  /**
   * 查询交易车辆信息 (可查询交易所有信息)
   * @param {string} archiveNo   流水号
   * @returns {Promise<any>}
   */
  public get(archiveNo: string): Promise<TradeForm> {
    return this.rest.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise().then((res) => res as TradeForm);
  }
  /**
   * 同上，本函数为 过渡函数，终将删除
   * @param {string} archiveNo   流水号
   * @returns {Promise<any>}
   */
  public get2(archiveNo: string): Promise<BusinessTradeForm> {
    return this.rest.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise().then((res) => res as BusinessTradeForm);
  }

  /**
   * 修改交易车辆信息 (可修改所有交易信息)
   * @param {TradeForm} form
   * @returns {Promise<any>}
   */
  public update(form: TradeForm): Promise<any> {
    return this.rest.put(this.api_url_base, form).toPromise();
  }

}
