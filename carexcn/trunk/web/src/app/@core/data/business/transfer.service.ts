import {Injectable} from '@angular/core';
import {TradeForm} from '../../model/business/trade/trade.form';
import {ReviewForm} from '../../model/business/review/review.form';
import {RestService} from '../../utils/rest.service';
import {MarketStaff} from '../../model/system/market-staff';
import {UserService} from '../users.service';
import {BuyerForm} from '../../model/business/trade/buyer.form';
import {TransferVehicleModel} from '../../model/business/trade/transferVehicle/transferVehicle.model';
import {BuyerModel} from '../../model/business/trade/buyer.model';

@Injectable()
export class TransferService {
  public currentUser: MarketStaff;
  constructor(
    public userService: UserService,
    private rest: RestService,
  ) {
    this.currentUser = this.userService.getCurrentLoginUser();
  }
  private api_url_base = '/rest/business/trade/transfer';
  /**
   * 创建过户车辆
   * @param {TradeForm} form  clouduser  buyer买方对象实例  TransferVehicle 对象实例
   * @returns {Promise<any>} TODO: 检查完善
   */
  public create(
    archiveNo: string,
    buyerPhotos: object,
    buyer: BuyerModel,
    transferVehiclePhotos: object,
    transferVehicle: TransferVehicleModel,
    vehicleId: string,
  ): Promise<any> {
    return this.rest.post(this.api_url_base, {
      archiveNo: archiveNo,
      cloudUser: this.currentUser.cloudUser,
      buyer: {
        reviewPhotos: {},
        photos: buyerPhotos,
        trusteePhotos: {},
        buyer: buyer,
      } as BuyerForm,
      transferVehicle: {
        photos: transferVehiclePhotos,
        transferVehicle: transferVehicle,
        PreVehicleId: vehicleId,
      }, // TODO: 过户车辆的实体应该要建立
    } as TradeForm).toPromise();
  }

  /**
   * 根据过户批次号获取过户业务对象(拿到车辆列表)
   * @param {string} archiveNo 过户业务流水号(过户批次号)
   * @returns {Promise<any>}
   */
  public carList(archiveNo: string): Promise<any> {
    return this.rest.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise();
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
   * @param {string} id
   * @param {Array<string>} tradeIds
   * @param {object} reviewPhotos
   * @param {object} sellerinfo
   * @returns {Promise<any>}
   */
  public review(id: string, tradeIds: Array<string>, reviewPhotos: object, buyerInfo: BuyerForm): Promise<any> {
    console.info('this.currentUser', this.currentUser);
    return this.rest.put(this.api_url_base, {
      transfer: {
        cloudUser: this.currentUser.cloudUser,
        id: id,
      },
      buyer: {
        reviewPhotos: reviewPhotos,
        buyer: buyerInfo,
      },
      tradeIds: tradeIds,
    } as ReviewForm).toPromise();
  }
}
