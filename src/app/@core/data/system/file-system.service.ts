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
}
