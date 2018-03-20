import {Injectable} from '@angular/core';
import {Marketmap} from '../model/system/marketmap';
import {MarketStaff} from '../model/system/market-staff';
import {UserService} from './users.service';
import {MarketService} from './system/market.service';
import {Marketfeemap} from '../model/system/market-fee-map';

@Injectable()
/**
 * 当前登录用户所属市场的相关服务
 * 本服务数据会自动缓存，直至页面刷新缓存失效。
 */
export class CurrentMarketService {
  public currentUser: MarketStaff;
  private currentMarket: Promise<Marketmap>;
  private currentMarketFee: Promise<Marketfeemap>;
  constructor(
    public _user: UserService,
    private _market: MarketService,
  ) {
    this.currentUser = this._user.getCurrentLoginUser();
  }
  public getCurrentMarket(): Promise<Marketmap> {
    if (! this.currentMarket) {
      this.currentMarket = this._market.getMarket(this.currentUser.market.id);
    }
    return this.currentMarket;
  }
  // public getCurrentMarketFee(): Promise<Marketfeemap> {
  //   if (! this.currentMarketFee) {
  //     this.currentMarketFee = this._market.getFee(this.currentUser.market.id);
  //   }
  //   return this.currentMarketFee;
  // }
}
