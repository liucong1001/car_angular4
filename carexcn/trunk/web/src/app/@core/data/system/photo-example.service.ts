import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PhotoExampleModel} from '../../model/system/photo-example';
import {CarModel} from "../../model/bussiness/car.model";

@Injectable()
export class PhotoExampleService {

  private path = '/rest/common/photo/example';
  private photo_scrollery_config_cache: Promise<any>;
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

  /**
   * 获取照片类型
   * @returns {Promise<TResult2|TResult1>}
   */
  public getPhotoType():Promise<any>{
    const url = `${this.path}/type`;
    return this.http.get(url).toPromise().then(function (res) {
       return res.json() as any;
    })
  }


  /**
   * 获取图片局部放大时的对应配置
   * 会返回所有配置而非单个附件类型的配置
   * 会自动全局缓存，有效期至浏览器关闭
   * @returns {Promise<any>}
   */
  public getPhotoScrollerYConfig(photoType: string): Promise<any> {
    // return this.http.get('').toPromise();
    if (! this.photo_scrollery_config_cache ) {
      this.photo_scrollery_config_cache = Promise.resolve(this.photo_scrollery_config);
    }
    return this.photo_scrollery_config_cache;
  }
  private photo_scrollery_config = {
    3: {
      username: 0,
      sex: 5,
      birthday: 20,
      address: 50,
    },
  };
}
