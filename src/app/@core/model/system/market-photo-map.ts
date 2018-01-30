import {FileDescriptionModel} from '../bussiness/file-description.model';

/**
 *市场证件模型
 */
export  class Marketphotomap {

  public id?: string;

  public isApp?: string;
  /**
   * 名称
   */
  public name?: string;
  /**
   * 代号
   */
  public  cloudUser?: string;
  /**
   * 备注
   */
  public  memo?: string;
  /**
   * 证件类型代码集
   */
  public certificateCode?: string;
  /**
   * 照片类型
   */
  public  photoType?: string;

  /**
   * 拍摄张数
   */
  public photoCode?: number;
  /**
   * 选择状态
   * 01:必拍\02：不拍\03：选拍
   */
  public status?: string;
  /**
   * code
   */
  public  code?: number;
  /**
   * 最大张数
   */
  public  max?: number;
  /**
   * 最小张数
   */
  public  min?: number;
  /**
   * 拍照顺序
   * 自己排序
   */
  public sort?: string;
  /**
   * 业务类型
   */
  public business?: string;
  /**
   * 表单名称
   */
  public formName?: string;
  public fileDescription?: FileDescriptionModel;
  /**
   * 市场
   */
  public  market?: {
    id: string;
    name: string;
 };

}
