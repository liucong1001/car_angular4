import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {promise} from "selenium-webdriver";
import {ArchivesManageSendMap} from "../../model/archives-manage/send.model";



@Injectable()
export class ArchivesManageSendService {
  private path = '/rest/business/trade/archives';
  constructor(private http: Http) {
  }

  /**
   * 根据流水号查询所有车辆信息
   * @param arcNo
   * @returns {Promise<TResult2|TResult1>}
   */
  public getPlateNumber(arcNo: String): Promise<any> {
    const url = `${this.path}/archives/no/${arcNo}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as any;
    });
  }

  /**
   * 档案送出
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  send(model):Promise<any>{
    const url= `${this.path}/send`;
    return this.http.post(url,model).toPromise().then(res=>{
        return res.json() as any;
    })
  }

  /**
   * 取消
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public cancel(model):Promise<any>{
     const url=`${this.path}/cancel`;
     return this.http.put(url,model).toPromise().then(res=>{
       return res.json() as any;
     })
  }

}
