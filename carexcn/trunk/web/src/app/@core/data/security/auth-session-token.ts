import {NbAuthSimpleToken} from '@nebular/auth';
import {MarketStaff} from '../../model/system/market-staff';
import {Injectable} from '@angular/core';

/**
 * 用户令牌
 */
@Injectable()
export class AuthSessionToken extends NbAuthSimpleToken {
  private _token: MarketStaff;

  getPayload(): MarketStaff {
    return this._token;
  }

  setValue(token: string) {
    this._token = JSON.parse(token);
    this.token = token;
  }

  getValue(): string {
    return this.token;
  }
}
