import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TradeForm} from '../../model/bussiness/trade/trade.form';
import {ReviewForm} from '../../model/bussiness/review/review.form';

@Injectable()
export class TransferService {
  constructor(private http: Http) {}
  private api_url_base = '/rest/business/trade/transfer';
  /**
   * 创建过户车辆
   * @param {TradeForm} form  clouduser  buyer买方对象实例  TransferVehicle对象实例
   * @returns {Promise<any>} TODO: 检查完善
   */
  public create(form: TradeForm): Promise<any> {
    return this.http.post(this.api_url_base, form).toPromise();
  }

  /**
   * 增加过户车辆
   * @param {string} id  trade.transfer.id
   * @param {TradeForm} form  clouduser  TransferVehicle对象实例
   * @returns {Promise<any>}
   */
  public addCar(id: string, form: TradeForm): Promise<any> {
    return this.http.post(this.api_url_base + '/' + id, form).toPromise();
  }

  /**
   * 过户审核
   * @param {ReviewForm} form
   * @returns {Promise<any>}
   */
  public review(form: ReviewForm): Promise<any> {
    return this.http.put(this.api_url_base, form).toPromise();
  }
}
