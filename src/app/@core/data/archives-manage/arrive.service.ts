/**
 * Created by LC on 2018/2/28.
 */
import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {promise} from "selenium-webdriver";
import {ArchivesManageSendMap} from "../../model/archives-manage/send.model";



@Injectable()
export class ArchivesManageArriveService {
  private path = '/rest/business/trade/archives';
  constructor(private http: Http) {
  }

  /**
   * 档案-到达
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  arrive(model):Promise<any>{
    const url= `${this.path}/arrive`;
    return this.http.put(url,model).toPromise().then(res=>{
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
