import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {MarketStaff} from '../model/system/market-staff';
import {AuthSessionToken} from './security/auth-session-token';
import {Http} from '@angular/http';
import {NbAuthService} from '@nebular/auth';

// TODO: 上线时删除此代码
/**
 * 用户服务
 * just 2 step to use
 * 1.`public userService: UserService,` in your class's constructor method param
 * 2.`this.currentUser = this.userService.getCurrentLoginUser();`
 * eg: merchant.cloudUser = this.userService.getCurrentLoginUser().cloudUser;
 */
@Injectable()
export class UserService {
  /**
   * 用户
   */
  protected user: MarketStaff;

  /**
   * 构造函数
   * @param {NbAuthService} authService
   * @param {Http} http
   */
  constructor(
    protected authService: NbAuthService,
    protected http: Http,
  ) {
    this.authService.onTokenChange().subscribe((token: AuthSessionToken) => {
      this.user = token.getPayload();
    });
  }

  /**
   * 获取当前用户
   * @returns {MarketStaff}
   */
  public getCurrentLoginUser(): MarketStaff {
    return this.user;
  }

  /**
   * 以下代码即将删除 TODO: 删除以下代码
   */

  private users = {
    nick: { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    eva: { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    jack: { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    lee: { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    alan: { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    kate: { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  };

  private userArray: any[];
  getUsers(): Observable<any> {
    return Observable.of(this.users);
  }

  getUserArray(): Observable<any[]> {
    return Observable.of(this.userArray);
  }

  getUser(): Observable<any> {
    let counter = 0;
    counter = (counter + 1) % this.userArray.length;
    return Observable.of(this.userArray[counter]);
  }
}
