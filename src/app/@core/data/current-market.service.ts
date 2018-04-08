import {Injectable} from '@angular/core';
import {MarketStaff} from '../model/system/market-staff';
import {UserService} from './users.service';
import {RestService} from '../utils/rest.service';

@Injectable()
/**
 * 当前登录用户所属市场的相关服务
 * 本服务数据会自动缓存，直至页面刷新缓存失效。
 */
export class CurrentMarketService {
  public currentUser: MarketStaff;
  private currentMarketConf: Promise<CurrentMarketConfModel>;
  private path = '/rest/manager/market/config';
  constructor(
    public _user: UserService,
    private _rest: RestService,
  ) {
    this.currentUser = this._user.getCurrentLoginUser();
  }
  public getCurrentMarket(): Promise<CurrentMarketConfModel> {
    if (! this.currentMarketConf) {
      this.currentMarketConf = this._rest.get(this.path).toPromise();
    }
    return this.currentMarketConf;
  }
  public getCurrentMarketInfo(): Promise<CurrentMarketConfModel> {
    if (! this.currentMarketConf) {
      this.currentMarketConf = this._rest.get(this.path).toPromise();
    }
    return this.currentMarketConf;
  }
}


export interface Area {
  cloudUser?: any;
  id: string;
  name: string;
  code: string;
  childrens: any[];
  zipCode?: any;
  plateNumberPrefix: string;
}

export interface Market {
  cloudUser: string;
  createUserId?: any;
  createTime?: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id: string;
  name: string;
  code?: any;
  memo?: any;
  area: Area;
}

export interface PhotoExample {
  cloudUser: string;
  createUserId: string;
  createTime: any;
  lastModifyTime?: any;
  lastModifyUserId?: any;
  id: string;
  scale: number;
  photoType: string;
  name: string;
  fileId: string;
}

export interface PhotoConfigFormList {
  isApp: string;
  business: string;
  certificateCode: string;
  formName: string;
  status: string;
  max: number;
  min: number;
  sort: string;
  memo: string;
  photoType: string;
  photoExample: PhotoExample;
}

export interface GlobalConfig {
  cloudUser: string;
  id: string;
  fileStoreRoot?: any;
  invoiceManagerMode: string;
  plateNumberPrefix: string;
  printFormatAmount: boolean;
  printAmountPrefix: string;
  printMarketAccount: string;
  printMarketAddress: string;
  printMarketName: string;
  printMarketTaxNo: string;
  printMarketPhone: string;
  printOpener: string;
  printMemoScript: string;
  printPhone: string;
  printAmountPrefixCN: string;
  dimensional: string;
  tempPath: string;
}

export interface CurrentMarketConfModel {
  market: Market;
  photoConfigFormList: PhotoConfigFormList[];
  globalConfig: GlobalConfig;
}
