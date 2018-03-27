import {Injectable} from '@angular/core';
import {DeviceService} from '../../device/device.service';

/**
 * 文件服务
 */
@Injectable()
export class FileSystemService {
  /**
   * 文件服务接口地址前缀
   * @type {string}
   */
  private path = '/rest/files/file/'; // {file_id}
  /**
   * 注入设备服务
   * @param {DeviceService} device
   */
  constructor(
    private device: DeviceService,
  ) {}

  /**
   * 通过临时文件名获取URL访问路径
   * @param {string} file_temp
   * @returns {string}
   */
  public getFileUrlByTmp(file_temp: string): string {
    return this.device.pre_access_url_tmp + file_temp.substring(4);
  }

  /**
   * 通过临时文件名获取真实文件名
   * 一般用户传递后台数据
   * @param {string} file_temp
   * @returns {string}
   */
  public getFileNameByTmp(file_temp: string): string {
    return file_temp.substring(4);
  }

  /**
   * 通过文件ID获取** TODO: it is not been done
   * @param {string} file_id
   * @returns {string}
   */
  public getFileObjectById(file_id: string): string {
    return file_id.substring(3);
  }

  /**
   * 通过文件ID获取URL访问路径
   * @param {string} file_id
   * @returns {string}
   */
  public getFileUrlById(file_id: string): string {
    return this.path + file_id.substring(3);
  }

  /**
   * 解析动态图片组件照片序列的值
   * 一般解析出的结果用于传输给后台接口
   * @param photoFormValue
   * @returns {{}}
   */
  public filterPhotosValue(photoFormValue) {
    let result = {};
    for (let key in photoFormValue) {
      if (!photoFormValue.hasOwnProperty(key)) {
        continue;
      }
      let obj = photoFormValue[key];
      let tmp_array: Array<CameraCarexcnFileDescrption> = [];
      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }
        if (obj[prop].startsWith('id:')) {
          tmp_array.push({objectId: this.getFileUrlById(obj[prop])} as CameraCarexcnFileDescrption);
        } else if (obj[prop].startsWith('tmp:')) {
          tmp_array.push({filePath: this.getFileNameByTmp(obj[prop])} as CameraCarexcnFileDescrption);
        }
      }
      result[key] = tmp_array;
    }
    // console.info('result', result);
    return result;
  }

  /**
   * 通过文件定义名获取真实的访问路径
   * 支持文件id定义的方式
   * 支持临时文件定义的方式
   * 支持易驹所照片文件对象定义的方式 TODO: 然而暂时还不能放在后面适配
   * @param file
   * @returns {string}
   */
  public getRealFileUrl(file: any): string {
    if ( 'string' === typeof(file) ) {
      if (file.length > 0) {
        if (file.startsWith('id:')) {
          /**
           * 如果传递了 file_id 则根据 file_id 重置 source 的值
           * 重置失败则视为普通url地址打开
           */
          return this.getFileUrlById(file);
        } else if (file.startsWith('tmp:')) {
          /**
           * 如果传递了 file_id 则根据 file_id 重置 source 的值
           * 重置失败则视为普通url地址打开
           */
          return this.getFileUrlByTmp(file);
        } else {
          /**
           * 非协商前缀则视为图片全路径处理
           * @type {string}
           */
          return file;
        }
      } else {
        return '';
      }
    } else if ('object' === typeof(file)) {
      let tmp = file as CameraCarexcnFileDescrption;
      return '';
    }
  }
}

/**
 * 易驹所照片文件类定义
 */
export class CameraCarexcnFileDescrption {
  cloudUser?: string;
  deleted?: boolean;
  fileExtName?: string;
  filePath?: string;
  fileType?: string;
  id?: string;
  /**
   * 文件对象ID，显示文件用此ID
   */
  objectId?: string;
  objectType?: string;
  sortNumber?: number | null;
}
