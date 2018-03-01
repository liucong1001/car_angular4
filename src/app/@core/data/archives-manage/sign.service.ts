import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import {promise} from "selenium-webdriver";
import {ArchivesManageSendMap} from "../../model/archives-manage/send.model";




@Injectable()
export class ArchivesManageSignService {
  private path = '/rest/business/trade/archives';
  constructor(private http: Http) {
  }

  /**
   * 根据车管所流水号查询车牌号
   * @param code
   * @returns {Promise<TResult2|TResult1>}
   */
  public  findCode(code:string):Promise<any>{
       const url=`${this.path}/code/${code}`;
       return this.http.get(url).toPromise().then(res=>{
         return res.json() as any;
       })
  }

  /**
   * 档案-签收
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  sign(model):Promise<any>{
    const url= `${this.path}/sign`;
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
