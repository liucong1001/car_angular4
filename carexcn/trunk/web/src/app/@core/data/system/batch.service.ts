/**
 * Created by LC on 2018/2/28.
 */
import {Injectable, isDevMode} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';

@Injectable()
export class BatchService {
  private path = '/rest/sys/batch';
  constructor(private http: Http) {
  }

  /**
   * 下载
   * @param id
   */
  public  downCompressFlow(id: String): Promise<any>{
    const url= `${this.path}/get/` + id;
    return this.http.get(url,{responseType: ResponseContentType.Blob}).toPromise().then(res=>{
      console.log(res.json() as any);
      return res.json() as any;
    })
  }
}
