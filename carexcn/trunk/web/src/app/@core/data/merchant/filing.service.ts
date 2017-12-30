import {Injectable} from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {FilingInfoForm} from '../../model/bussiness/filing.info.form';
import {Http} from '@angular/http';

/**
 * 备案人备案信息，相关接口
 */
@Injectable()
export class FilingService {
  /**
   * 构造函数
   * @param {RestService} rest
   */
  constructor(private rest: Http) {}

  /**
   * 接口地址
   * @type {string}
   */
  private api_url_base = '/rest/merchant/filing';

  /**
   * 创建备案信息
   * @param {FilingInfoForm} model
   * @returns {Promise<FilingInfoForm>}
   */
  public add(model: FilingInfoForm): Promise<FilingInfoForm> {
    return this.rest.post(this.api_url_base, model).toPromise().then((res) => res.json() as FilingInfoForm);
  }

  /**
   * 更新备案信息
   * @param {FilingInfoForm} model
   * @returns {Promise<FilingInfoForm>}
   */
  public update(model: FilingInfoForm): Promise<FilingInfoForm> {
    return this.rest.put(this.api_url_base, model).toPromise().then((res) => res.json() as FilingInfoForm);
  }

  /**
   * 删除备案信息
   * @param {string} id # 备案信息id
   * @returns {Promise<any>}
   */
  public del(id: string): Promise<any> {
    return this.rest.delete(this.api_url_base + '/' + id).toPromise();
  }

  /**
   * 获取指定备案信息
   * @param {string} id # 备案信息id
   * @returns {Promise<FilingInfoForm>}
   */
  public get(id: string): Promise<FilingInfoForm> {
    return this.rest.get(this.api_url_base + '/' + id).toPromise().then((res) => res.json() as FilingInfoForm);
  }

  /**
   * 启动指定的备案人
   * @param {string} id # 备案信息id
   * @returns {Promise<any>}
   */
  public start(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/start/' + id, null).toPromise();
  }

  /**
   * 禁用指定的备案人
   * @param {string} id # 备案信息id
   * @returns {Promise<any>}
   */
  public stop(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/stop/' + id, null).toPromise();
  }

  /**
   * 备案信息可代办List
   * @param {string} id # 商户ID
   * @returns {Promise<any>}
   */
  public agency(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/agency/' + id, null).toPromise();
  }

  /**
   * 备案信息可交易List
   * @param {string} id # 商户ID
   * @returns {Promise<any>}
   */
  public deal(id: string): Promise<any> {
    return this.rest.put(this.api_url_base + '/deal/' + id, null).toPromise();
  }
}
