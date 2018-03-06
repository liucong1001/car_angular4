import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/bussiness/trade/trade.form';
import {ReviewForm} from '../../model/bussiness/review/review.form';
import {SellerForm} from '../../model/bussiness/trade/seller.form';
import {PreVehicleForm} from '../../model/bussiness/trade/preVehicle.form';
import {UserService} from '../users.service';
import {MarketStaff} from '../../model/system/market-staff';
import {RestService} from '../../utils/rest.service';

@Injectable()
export class PrejudicationService {
  public currentUser: MarketStaff;
  constructor(
    public userService: UserService,
    public http: RestService,
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
   * 根据预审批次号获取预审业务对象(拿到车辆列表)
   * @param {string} archiveNo 预审业务流水号(预审批次号)
   * @returns {Promise<any>}
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
   * 检查车辆是否允许录入
   * @param {string} plateNumber
   * @param {number} filingInfoId
   * @returns {Promise<any>}
   */
  public checkCar(plateNumber: string, filingInfoId: string): Promise<any> {
    return this.http.get('/rest/business/trade/check?plateNumber=' + plateNumber + '&filingInfoId=' + filingInfoId).toPromise();
  }

  /**
   * 预审审核
   * @param {string} id   prejudication.bussiness.id
   * @returns {Promise<any>}
   */
  public review(id: string, tradeIds: Array<string>, reviewPhotos: object, sellerinfo: object): Promise<any> {
    return this.http.put(this.api_url_base, {
      prejudication: {
        cloudUser: this.currentUser.cloudUser,
        id: id,
      },
      seller: {
        reviewPhotos: reviewPhotos,
        seller: sellerinfo,
      },
      tradeIds: tradeIds,
    } as ReviewForm).toPromise();
  }
}
