import {Injectable} from '@angular/core';
import {RestService} from '../../utils/rest.service';
import {UserService} from '../users.service';


@Injectable()
export class MobileRecordingService {
  constructor(
    public userService: UserService,
    public rest: RestService,
  ) {}
  private api_url_base = '/rest/business/trade';

  /**
   * 查询交易车辆信息 (可查询交易所有信息)
   * @param {string} archiveNo   流水号
   * @returns {Promise<any>}
   */
  public get(archiveNo: string): Promise<any> {
    return this.rest.get(this.api_url_base + '?archiveNo=' + archiveNo).toPromise();
  }

  /**
   * 修改状态为录入中
   * @param {string} archiveNo
   * @returns {Promise<any>}
   */
  public changeStateInRecording(archiveNo: string): Promise<any> {
    return this.rest.get(this.api_url_base + '/changeStatusRecording?archiveNo=' + archiveNo).toPromise();
  }

  /**
   * 手机端录入打回
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public back(model: any): Promise<any> {
    const url = `${this.api_url_base}/back`;
    return this.rest.put(url, model).toPromise();
  }

  /**
   * 提交入库信息
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public save(model: any): Promise<any> {
    const url = `${this.api_url_base}/update`;
    return this.rest.put(url, model).toPromise();
  }


}
