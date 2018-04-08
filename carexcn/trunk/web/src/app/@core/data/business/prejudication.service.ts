import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/business/trade/trade.form';
import {SellerForm} from '../../model/business/trade/seller.form';
import {PreVehicleForm} from '../../model/business/trade/preVehicle.form';
import {UserService} from '../users.service';
import {MarketStaff} from '../../model/system/market-staff';
import {RestService} from '../../utils/rest.service';
import {BusinessTradeForm, PreVehicle, Seller} from '../../model/business/restruct/business.trade.form';
import {FileSystemService} from '../system/file-system.service';
import {BusinessTradeViewForm} from '../../model/business/restruct/business.trade.view.form';

@Injectable()
export class PrejudicationService {
  public currentUser: MarketStaff;
  constructor(
    public userService: UserService,
    public rest: RestService,
    private file: FileSystemService,
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
  public create(seller: Seller, preVehicle: PreVehicle): Promise<any> {
    seller.photos = this.file.filterPhotosValue(seller.photos);
    preVehicle.photos = this.file.filterPhotosValue(preVehicle.photos);
    return this.rest.post(this.api_url_base, {
      cloudUser: this.currentUser.cloudUser,
      seller: seller,
      preVehicle: preVehicle,
    } as BusinessTradeForm).toPromise();
  }

  /**
   * 根据预审批次号获取预审业务对象(拿到车辆列表)
   * @param {string} archiveNo 预审业务流水号(预审批次号)
   * @returns {Promise<any>}
   */
  public carList(archiveNo: string): Promise<any> {
    return this.rest.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise();
  }

  /**
   * 增加预审车辆
   * @param {string} id    trade.prejudication.id
   * @param {TradeForm} form  clouduser  PreVehicle对象实例
   * @returns {Promise<any>}
   */
  public addCar(id: string, preVehicle: PreVehicle): Promise<any> {
    return this.rest.post(this.api_url_base + '/' + id, {
      cloudUser: this.currentUser.cloudUser,
      preVehicle: preVehicle,
    } as BusinessTradeForm).toPromise();
  }

  /**
   * 检查车辆是否允许录入
   * @param {string} plateNumber
   * @param {number} filingInfoId
   * @returns {Promise<any>}
   */
  public checkCar(plateNumber: string, filingInfoId: string): Promise<any> {
    return this.rest.get('/rest/business/trade/check?plateNumber=' + plateNumber + '&filingInfoId=' + filingInfoId).toPromise();
  }

  /**
   * 预审审核
   * @param {string} id
   * @param {Array<string>} tradeIds
   * @param {object} reviewPhotos
   * @param {object} sellerinfo
   * @returns {Promise<any>}
   */
  public review(tradeView: BusinessTradeViewForm): Promise<any> {
    return this.rest.put(this.api_url_base, tradeView as BusinessTradeViewForm).toPromise();
  }
}
