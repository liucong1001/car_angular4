/**
 * Create by clh021@gmail.com On 2017.12.11
 */
import {Injectable} from '@angular/core';
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
    this.api_url = this.device.pre_api_url;
  }

  /**
   * 显示摄像头
   * @returns {Promise<any>}
   */
  showWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'show');
  }

  /**
   * 隐藏摄像头
   * @returns {Promise<any>}
   */
  hideWebcam(): Promise<any> {
    return this.device.sendCommond('WebCam', 'hide');
  }

  /**
   * 摄像头拍照
   * @param {boolean} rotate  是否旋转,可扩展为其他参数
   * @param {string} user     对应用户验证信息,如果接口要求的话
   * @param {string} mac      对应其他验证信息,如果接口要求的话
   * @returns {Promise<any>}
   */
  snapshot(rotate: boolean, user: string, mac: string): Promise<any> {
    // this.api_url += 'user=' + user + '&mac=' + mac;
    // if (rotate) {
    //   this.api_url += '&xuanzhuan=true';
    // }
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
