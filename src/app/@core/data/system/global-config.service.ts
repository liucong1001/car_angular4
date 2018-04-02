import { Injectable } from '@angular/core';
import {RestService} from '../../utils/rest.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {GlobalConfig} from "../../model/system/global-config";
/**
 * 市场配置服务
 */
@Injectable()
export class GlobalConfigService {
  private url = '/rest/common/global/config';

  constructor(private http: RestService) { }

  /**
   * 创建市场配置
   * @param {GlobalConfig} globalConfig
   * @returns {Promise<GlobalConfig>}
   */
  public create(globalConfig: GlobalConfig): Promise<GlobalConfig> {
    return this.http.post(this.url, globalConfig).toPromise();
  }


  /**
   * 根据id获取市场配置信息
   * @param id
   * @returns {Promise<Object>}
   */
  public getInfo(id:string):Promise<any>{
    return this.http.get(`${this.url}/${id}`).toPromise();
  }

  /**
   * 修改保存
   * @param globalConfig
   * @returns {Promise<Object>}
   */
  public update(globalConfig: GlobalConfig): Promise<GlobalConfig> {
    return this.http.put(this.url, globalConfig).toPromise();
  }

}
