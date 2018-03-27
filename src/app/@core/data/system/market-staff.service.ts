import { Injectable } from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {MarketStaff} from '../../model/system/market-staff';
import {MarketStaffForm} from '../../model/system/market-staff-form';
import {RestMessage} from '../../model/common/RestMessage';
import {Observable} from 'rxjs/Observable';
import {forEach} from '@angular/router/src/utils/collection';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
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

  /**
   * 后台检查登录ID是否存在，不存在HTTP状态200，存在返回500
   * @param {string} loginName
   * @return {Promise<any>}
   */
  public checkLoginName(loginName: string): Promise<any> {
    return this.http.get(`${this.url}/not/found?loginName=${loginName}`).toPromise();
  }

  /**
   * 禁用员工
   * @param {string} id
   */
  public disable(id: string): Promise<any> {
    return this.http.patch(`${this.url}/${id}?disabled`, {}).toPromise();
  }

  /**
   * 启用员工
   * @param {string} id
   * @return {Promise<any>}
   */
  public enable(id: string): Promise<any> {
    return this.http.patch(`${this.url}/${id}?enable`, {}).toPromise();
  }

  /**
   * 更具id获取员工信息
   * @param id
   * @returns {Promise<Object>}
   */
  public getInfo(id:string):Promise<any>{
    return this.http.get(`${this.url}/${id}`).toPromise();
  }

  /**
   * 修改保存
   * @param staff
   * @returns {Promise<Object>}
   */
  public editSave(staff: MarketStaffForm): Promise<MarketStaff> {
    return this.http.put(this.url, staff).toPromise();
  }

  /**
   * 重置密码
   * @param {string} id
   * @return {Promise<any>}
   */
  public resetPwd(id: string): Promise<any> {
    return this.http.get(`${this.url}/reset/${id}`).toPromise();
  }

  /**
   * 修改密码
   * @param oldPwd 原始密码
   * @param oncePwd 新密码
   * @param twice 第二次输入新密码
   * @returns {Promise<Object>}
     */
  public updatePwd(oldPwd: string, oncePwd: string, twicePwd: string): Promise<any> {
    return this.http.post(`${this.url}/update/pwd?oldPwd=`+oldPwd+'&oncePwd='+oncePwd+'&twicePwd='+twicePwd, {}).toPromise();
  }
}
