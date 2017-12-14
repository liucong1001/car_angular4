import {Injectable, isDevMode} from '@angular/core';
import {DeviceService} from './device.service';

@Injectable()
export class WebcamService {
  /**
   * 接口地址
   */
  public api_url: string;
  /**
   * 构造函数
   * 引用设备服务，初始化接口地址
   * @param {DeviceService} device
   */
  constructor(private device: DeviceService) {
    if (isDevMode()) {
      this.api_url = 'http://dongshenghuo.com/test.php/files/upload';
    } else {
      this.api_url = location.protocol + '//' + location.host + '/files/upload';
    }
  }

  showWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'show');
  }

  hideWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'hide');
  }

  snapshot(rotate: boolean, user: string, mac: string): Promise<any> {
    this.api_url += '?user=' + user + '&mac=' + mac;
    if (rotate) {
      this.api_url += '&xuanzhuan=true';
    }
    const self = this;
    return new Promise(function(resolve, reject){
      self.device.sendCommond('WebCam', 'snapshot', self.api_url).then(function (result) {
        resolve(JSON.parse(result));
      }, function (error) {
        reject(error);
      });
    });
  }
}
