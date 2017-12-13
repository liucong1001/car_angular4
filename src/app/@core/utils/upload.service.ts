import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";

@Injectable()
export class UploadService {
  /**
   * 进度
   */
  public progress;
  /**
   * 进度观察
   */
  public progressObserver;

  /**
   * 构造函数
   */
  constructor (private http: Http) {
    this.progress = Observable.create(observer => {
      this.progressObserver = observer;
    }).share();
  }

  /**
   * 上传服务 xml http
   * @param {string} url          上传地址
   * @param {string[]} params     请求附带参数
   * @param {File[]} files        要上传的文件[允许多个文件同时上传]
   * @returns {Observable}        返回类型
   *
   * use example:
   * this.upld.request_xmlhttp(url, [], files).map((res: Response) => {console.log(res);})
   * .subscribe(() => {self.message.info('文件上传成功！', '上传');});
   */
  public request_xmlhttp(url: string, params: string[], files: File[]): Observable<Response> {
    return Observable.create(observer => {
      const formData: FormData = new FormData(),
      xhr: XMLHttpRequest = new XMLHttpRequest();
      formData.append('uploads', files[0], files[0].name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };
      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);
        this.progressObserver.next(this.progress);
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}
