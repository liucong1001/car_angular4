import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/business/trade/trade.form';
import {ReviewForm} from '../../model/business/review/review.form';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class TransferDirectService {
  constructor(private rest: RestService) {}
  private api_url_base = '/rest/business/trade/trade';
  /**
   * 创建过户车辆
   * @param {TradeForm} form
   *        clouduser
   *        seller卖方对象实例
   *        PreVehicle对象实例
   *        buyer买方对象实例
   *        TransferVehicle对象实例
   * @returns {Promise<any>} TODO: 检查完善
   */
  public create(form: TradeForm): Promise<any> {
    return this.rest.post(this.api_url_base, form).toPromise();
  }

  /**
   * 增加过户车辆
   * @param {string} id
   * @param {TradeForm} form  clouduser  TransferVehicle对象实例
   * @returns {Promise<any>}
   */
  public addCar(id: string, form: TradeForm): Promise<any> {
    return this.rest.post(this.api_url_base + '/' + id, form).toPromise();
  }

  /**
   * 过户审核
   * @param {ReviewForm} form
   * @returns {Promise<any>}
   */
  public review(form: ReviewForm): Promise<any> {
    return this.rest.put(this.api_url_base, form).toPromise();
  }
}
