import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/bussiness/trade/trade.form';
import {ReviewForm} from '../../model/bussiness/review/review.form';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class TransferService {
  constructor(private rest: RestService) {}
  private api_url_base = '/rest/business/trade/transfer';
  /**
   * 创建过户车辆
   * @param {TradeForm} form  clouduser  buyer买方对象实例  TransferVehicle对象实例
   * @returns {Promise<any>} TODO: 检查完善
   */
  public create(form: TradeForm): Promise<any> {
    return this.rest.post(this.api_url_base, form).toPromise();
  }

  /**
   * 增加过户车辆
   * @param {string} id  trade.transfer.id
   * @param {TradeForm} form  clouduser  TransferVehicle对象实例
   * @returns {Promise<any>}
   */
  public addCar(id: string, form: TradeForm): Promise<any> {
    return this.rest.post(this.api_url_base + '/' + id, form).toPromise();
  }

  /**
   * 根据车辆流水号 查询 车辆对象信息
   * @param {string} archiveNo
   * @returns {Promise<any>}
   */
  public selectCar(archiveNo: string): Promise<any> {
    return this.rest.get('/rest/business/trade?archiveNo=' + archiveNo).toPromise();
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
