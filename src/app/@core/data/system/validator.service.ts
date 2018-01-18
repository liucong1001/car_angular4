import { Injectable } from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {Validator} from '../../model/system/validator';

@Injectable()
export class ValidatorService {
  private  url = '/rest/sys/manager/validator';
  constructor(private rest: RestService) { }

  /**
   * 添加验证器
   * @param {Validator} validator
   * @return {Promise<Validator>}
   */
  public add(validator: Validator): Promise<Validator> {
    return this.rest.post(this.url, validator).toPromise();
  }

  /**
   * 修改验证器
   * @param {Validator} validator
   * @return {Promise<Validator>}
   */
  public put(validator: Validator): Promise<Validator> {
    return this.rest.put(this.url, validator).toPromise();
  }

  /**
   * 删除验证器
   * @param {string} id
   * @return {Promise<any>}
   */
  public remove(id: string): Promise<any> {
    return this.rest.delete(`${this.url}/${id}`).toPromise();
  }

  /**
   * 根据id获取验证器数据
    * @param {string} id
   * @return {Promise<Validator>}
   */
  public get(id: string): Promise<Validator> {
    return this.rest.get(`${this.url}/${id}`).toPromise();
  }
}
