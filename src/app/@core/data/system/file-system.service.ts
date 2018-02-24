import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {DeviceService} from '../../device/device.service';

@Injectable()
export class FileSystemService {
  private path = '/rest/files/file/'; // {file_id}
  constructor(
    private http: Http,
    private device: DeviceService,
  ) {}
  public getFileUrlByTmp(file_temp: string): string {
    return this.device.pre_access_url_tmp + file_temp.substring(4);
  }
  public getFileNameByTmp(file_temp: string): string {
    return file_temp.substring(4);
  }
  public getFileObjectById(file_id: string): string {
    return file_id.substring(3);
  }
  public getFileUrlById(file_id: string): string {
    return this.path + file_id.substring(3);
  }
  public filterPhotosValue(photoFormValue) {
    let result = {};
    for (let key in photoFormValue) {
      if (!photoFormValue.hasOwnProperty(key)) continue;
      let obj = photoFormValue[key];
      let tmp_array: Array<CameraCarexcnFileDescrption> = [];
      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;
        if (obj[prop].startsWith('id:')) {
          tmp_array.push({objectId: this.getFileUrlById(obj[prop])} as CameraCarexcnFileDescrption);
        } else if (obj[prop].startsWith('tmp:')) {
          tmp_array.push({filePath: this.getFileNameByTmp(obj[prop])} as CameraCarexcnFileDescrption);
        }
      }
      result[key] = tmp_array;
    }
    console.info('result', result);
    return result;
  }
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
export class CameraCarexcnFileDescrption {
  objectId?: string;
  filePath?: string;
}
