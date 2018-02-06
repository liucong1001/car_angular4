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
  public getFileUrlById(file_id: string): string {
    return this.path + file_id.substring(3);
  }
  public getRealFileUrl(file: string): string {
    if ( file.length > 0 ) {
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
  }
}
