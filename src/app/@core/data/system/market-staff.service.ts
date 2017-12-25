import { Injectable } from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {MarketStaff} from '../../model/system/market-staff';
import {MarketStaffForm} from '../../model/system/market-staff-form';
import {RestMessage} from '../../model/common/RestMessage';
import {Observable} from 'rxjs/Observable';

/**
 * 市场员工服务
 */
@Injectable()
export class MarketStaffService {
  private url = '/rest/sys/market/staff';

  constructor(private http: RestService) { }

  /**
   * 创建员工
   * @param {MarketStaffForm} staff
   * @returns {Promise<MarketStaff>}
   */
  public create(staff: MarketStaffForm): Promise<MarketStaff> {
    return this.http.post(this.url, staff).toPromise();
  }

  /**
   * 发送验证码
   * @param {string} phone
   * @returns {Promise<RestMessage>}
   */
  public sendCode(phone: string): Promise<RestMessage> {
    return this.http.get(`${this.url}/valid/phone/${phone}`).toPromise();
  }

  /**
   * 后台校验验证是否正确
   * @param {string} phone
   * @param {string} code
   * @returns {Promise<true>}
   */
  public validCode(phone: string, code: string): Promise<any> {
    return this.http.post(`${this.url}/valid/phone/${phone}/${code}`, {}).toPromise();
  }
}
