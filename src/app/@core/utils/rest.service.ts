import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

/**
 * RestService 项目接口请求核心服务
 */
@Injectable()
export class RestService extends HttpClient {
  public json2httpparam(json_data: object): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(json_data).forEach(function (key) {
      httpParams = httpParams.append(key, json_data[key]);
    });
    return httpParams;
  }
}
