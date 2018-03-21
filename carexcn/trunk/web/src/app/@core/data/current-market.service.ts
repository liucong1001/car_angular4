import {Injectable} from '@angular/core';
import {Marketmap} from '../model/system/marketmap';
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
  private currentMarket: Promise<Marketmap>;
  private path = '/rest/manager/market/config';
  constructor(
    public _user: UserService,
    private _rest: RestService,
  ) {
    this.currentUser = this._user.getCurrentLoginUser();
  }
  public getCurrentMarket(): Promise<Marketmap> {
    if (! this.currentMarket) {
      this.currentMarket = this._rest.get(this.path).toPromise();
    }
    return this.currentMarket;
  }
}
