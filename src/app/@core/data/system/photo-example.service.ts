import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PhotoExampleModel} from '../../model/system/photo-example';

@Injectable()
export class PhotoExampleService {

  private path = '/rest/common/photo/example';
  constructor(private http: Http) {
  }

  /**
   * 保存照片示例
   * @param model
   * @returns {Promise<TResult2|PhotoExampleModel>}
   */

  public save(model): Promise<PhotoExampleModel> {
    return this.http.post(this.path, model).toPromise().then((res) => res.json() as PhotoExampleModel);
  }

  /**
   * 根据id获取信息
   * @param id
   * @returns {Promise<TResult2|PhotoExampleModel>}
   */

  public get(id: String): Promise<PhotoExampleModel> {
    const url = `${this.path}/${id}`;
    return this.http.get(url).toPromise().then(function (res) {
      return res.json() as PhotoExampleModel;
    });
  }

  /**
   * 修改保存
   * @param model
   * @returns {Promise<TResult2|PhotoExampleModel>}
   */

  public saveEdit(model): Promise<PhotoExampleModel> {
    return this.http.put(this.path, model).toPromise().then((res) => res.json() as PhotoExampleModel);
  }



}
