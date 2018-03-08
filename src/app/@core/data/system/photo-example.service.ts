import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PhotoExampleModel} from '../../model/system/photo-example';

@Injectable()
export class PhotoExampleService {

  private path = '/rest/common/photo/example';
  private photo_scrollery_config_cache: Promise<any>;
  private field_name_photo_config_cache: Promise<any>;
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
   * 获取照片坐标配置值
   * @param {string} fieldName
   * @param {string} certType
   * @param {string} formName
   * @returns {Promise<number>}
   */
  public getPhotoScroller(fieldName: string, certType: string, formName: string): Promise<number> {
    return this.getPhotoTypeConfigByFieldName(fieldName, certType, formName).then(photoType => {
      console.info(photoType);
      if (photoType) {
        return this.getPhotoScrollerYConfig(fieldName, photoType);
      } else {
        throw new Error('无法获取正确的 photoType');
      }
    });
  }

  /**
   * 获取图片局部放大时的对应配置
   * 会返回所有配置而非单个附件类型的配置
   * 会自动全局缓存，有效期至浏览器关闭
   * @returns {Promise<any>}
   */
  public getPhotoScrollerYConfig(fieldName: string, photoType: string): Promise<number> {
    if (! this.photo_scrollery_config_cache ) {
      this.photo_scrollery_config_cache = Promise.resolve(this.photo_scrollery_config);
        // this.photo_scrollery_config_cache = Promise.resolve(this.photo_scrollery_config);
        // 当改成后台配置时使用下面的方式  或者去掉参数获取所有配置
        // this.photo_scrollery_config_cache = this.http.get(
        // '?photoType' + photoType + '&fieldName' + fieldName
        // ).toPromise();
    }
    return this.photo_scrollery_config_cache.then(scroller => {
      // console.info('photo_scrollery_config_cache scroller', scroller);
      // console.info('photoType', photoType);
      // console.info('fieldName', fieldName);
      return scroller[photoType][fieldName];
    });
  }
  private photo_scrollery_config = {
    '03': {// 附件类型身份证正面
      name: 0,
      certCode: 80,
      address: 40,
      sellerAddress: 40,
      buyerAddress: 40, // 被坑了3分钟
    },
    '04': {// 附件类型身份证背面
      endDate: 90,
    },
  };

  /**
   * 根据当前字段获取附件类型编号
   * 会自动全局缓存，有效期至浏览器关闭
   * @returns {Promise<any>}
   */
  public getPhotoTypeConfigByFieldName(fieldName: string, certType: string, formName: string): Promise<string> {
    if (! this.field_name_photo_config_cache ) {
      this.field_name_photo_config_cache = Promise.resolve(this.field_name_photo_config);
      //   this.field_name_photo_config_cache = Promise.resolve(this.field_name_photo_config[certType][formName][fieldName]);
      //   // 当改成后台配置时使用下面的方式
      //   // this.field_name_photo_config_cache = this.http.get(
      //   // '?certType' + certType + '&formName' + formName + '&fieldName' + fieldName
      //   // ).toPromise();
    }
    return this.field_name_photo_config_cache.then(conf => {
      // console.info('field_name_photo_config_cache conf', conf);
      // console.info('certType', certType);
      // console.info('formName', formName);
      // console.info('fieldName', fieldName);
      return conf[certType][formName][fieldName];
    });
  }
  private field_name_photo_config = {
    // 证件类型
    '03': {
      'record.sellerForm': { // 表单名
        name: '03', // 附件类型身份证正面
        certCode: '03', // 附件类型身份证正面
        address: '03', // 附件类型身份证正面
        sellerAddress: '03', // 附件类型身份证正面
        endDate: '04', // 附件类型身份证背面
      },
      'transfer.buyerForm': {
        name: '03', // 附件类型身份证正面
        certCode: '03', // 附件类型身份证正面
        address: '03', // 附件类型身份证正面
        sellerAddress: '03', // 附件类型身份证正面
        buyerAddress: '03', // 坑了3分钟
        endDate: '04', // 附件类型身份证背面
      },
    },
  };
  // private field_name_photo_config = {
  //   // 证件类型
  //   '03': {
  //     '03_': { // 附件类型
  //       username: [{photoType: '03', scroller: 0}],
  //       birthday: 20,
  //       address: 50,
  //       endDate: 60,
  //     },
  //     birthday: '03',
  //     address: '03',
  //     endDate: '04',
  //   },
  // };
}
