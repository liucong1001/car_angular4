import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PhotoExampleModel} from '../../model/system/photo-example';

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
  public getPhotoType(): Promise<any> {
    const url = `${this.path}/type`;
    return this.http.get(url).toPromise().then(function (res) {
       return res.json() as any;
    });
  }


  /**
   * 获取图片局部放大时的对应配置
   * 会返回所有配置而非单个附件类型的配置
   * 会自动全局缓存，有效期至浏览器关闭
   * @returns {Promise<any>}
   */
  public getPhotoScrollerYConfig(photoType: string): Promise<any> {
    if (! this.photo_scrollery_config_cache ) {
      this.photo_scrollery_config_cache = Promise.resolve(this.photo_scrollery_config);
      // 当改成后台配置时使用下面的方式
      // this.photo_scrollery_config_cache = this.http.get('').toPromise();
    }
    return this.photo_scrollery_config_cache;
  }
  private photo_scrollery_config = {
    // 附件类型
    '03': {
      username: 0,
      birthday: 20,
      address: 50,
      endDate: 60,
    },
  };

  /**
   * 根据当前字段获取附件类型编号
   */
  public getPhotoByFieldName() {
    console.info('getPhotoByFieldName');
  }
  private field_name_photo_config = {
    // 证件类型
    '03': {
      '03_': { // 附件类型
        username: [{photoType: '03', scroller: 0}],
        birthday: 20,
        address: 50,
        endDate: 60,
      },
      birthday: '03',
      address: '03',
      endDate: '04',
    },
  };
}
