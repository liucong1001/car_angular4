import {Injectable, isDevMode} from '@angular/core';
import {Http} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {promise} from "selenium-webdriver";
import {RebateForm} from  '../../model/common-aution/rebateForm.model';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class RebateFormService {
  private path = '/rest/business/trade/sales';

  constructor(private http: Http,private httpClient: HttpClient,) {
  }

  /**
   * 日期查询
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  search(model:RebateForm):Promise<any>{
    const url =  `${this.path}/rebate`;
    return  this.http.post(url,model).toPromise().then(function (res) {
      return res.json() as any;
    })
  }

  /**
   * 导出返点报表
   * @param model
   * @returns {Promise<TResult2|TResult1>}
   */
  public  exportExcel(model:RebateForm): Promise<any>{
     const url = `${this.path}/download`;
      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return  this.httpClient.post(url,model,httpOptions).toPromise().then(function (res:any) {
      return res.json() as any;
    })

  }

}
