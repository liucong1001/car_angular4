import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/bussiness/trade/trade.form';
import {ReviewForm} from '../../model/bussiness/review/review.form';
import {SellerForm} from '../../model/bussiness/trade/seller.form';
import {PreVehicleForm} from '../../model/bussiness/trade/preVehicle.form';
import {Http} from '@angular/http';
import {UserService} from '../users.service';
import {MarketStaff} from '../../model/system/market-staff';

@Injectable()
export class PrejudicationService {
  public currentUser: MarketStaff;
  constructor(
    public userService: UserService,
    public http: Http,
  ) {
    this.currentUser = this.userService.getCurrentLoginUser();
  }
  private api_url_base = '/rest/business/trade/prejudication';

  /**
   * 创建预审车辆
   * @param {SellerForm} seller
   * @param {PreVehicleForm} preVehicle
   * @returns {Promise<any>}
   */
  public create(seller: SellerForm, preVehicle: PreVehicleForm): Promise<any> {
    return this.http.post(this.api_url_base, {
      cloudUser: this.currentUser.cloudUser,
      seller: seller,
      preVehicle: preVehicle,
    } as TradeForm).toPromise();
  }
  /**
   * 获取车辆列表
   * @param {TradeForm} form  clouduser  seller卖方对象实例  PreVehicle对象实例
   * @returns {Promise<any>} TODO: 检查完善
   */
  public carList(archiveNo: string): Promise<any> {
    return this.http.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise();
  }

  /**
   * 增加预审车辆
   * @param {string} id    trade.prejudication.id
   * @param {TradeForm} form  clouduser  PreVehicle对象实例
   * @returns {Promise<any>}
   */
  public addCar(id: string, preVehicle: PreVehicleForm): Promise<any> {
    return this.http.post(this.api_url_base + '/' + id, {
      cloudUser: this.currentUser.cloudUser,
      preVehicle: preVehicle,
    } as TradeForm).toPromise();
  }

  /**
   * 预审审核
   * @param {string} id   prejudication.bussiness.id
   * @returns {Promise<any>}
   */
  public review(id: string, tradeIds: Array<string>): Promise<any> {
    return this.http.put(this.api_url_base, {
      prejudication: {
        cloudUser: this.currentUser.cloudUser,
        id: id,
      },
      seller: {}, // TODO: seller.reviewPhotos
      tradeIds: tradeIds,
    } as ReviewForm).toPromise();
  }
}
