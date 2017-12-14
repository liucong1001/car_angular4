import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';
import {reject} from 'q';

@Injectable()
export class FingerService {
  /**
   * 构造函数
   * @param {DeviceService} device
   */
  constructor(private device: DeviceService) {
  }

  /**
   * 简洁快速的命令调用封装
   * @param plugin
   * @param method
   * @returns {Promise<any>}
   */
  doCommond(plugin, method, error_message?: string, args?: any): Promise<any> {
    const self = this;
    return new Promise(function(resolve, reject){
      self.device.sendCommond(plugin, method, args).then(function (result) {
        resolve(JSON.parse(result));
      }, function (error) {
        reject(error);
        console.log(error_message, error);
      });
    });
  }

  /**
   * 检查指纹仪是否正在使用
   * @returns {Promise<any>}
   */
  isBusy(): Promise<any> {
    return this.doCommond('Finger', 'Free');
  }

  /**
   * 使指纹仪停止正在运作的任务
   * @returns {Promise<any>}
   */
  stop(): Promise<any> {
    return this.doCommond('Finger', 'Stop');
  }

  /**
   * 指纹读取
   * @returns {Promise<any>}
   */
  read(): Promise<any> {
    const self =  this;
    return  new Promise(function(resolve, reject) {
      this.isBusy().then(() => {
        self.device.sendCommond('Finger', 'Read', self.device.pre_api_url + '/common/upload/single').then(function (result) {
          if (0 === result.Code) {
            resolve(JSON.parse(result));
          } else {
            reject(JSON.parse(result));
          }
        }, function (error) {
          reject(error);
        });
      }, () => {
        reject({Message: '设备正在使用中'});
      });
    });
  }

  /**
   * 校验指纹
   * @returns {Promise<any>}
   */
  verify(base64): Promise<any> {
    const self =  this;
    return  new Promise(function(resolve, reject) {
      this.isBusy().then(() => {
        self.device.sendCommond('Finger', 'Verify', base64).then(function (result) {
          if (0 === result.Code) {
            resolve(JSON.parse(result));
          } else {
            reject(JSON.parse(result));
          }
        }, function (error) {
          reject(error);
        });
      }, () => {
        reject({Message: '设备正在使用中'});
      });
    });
  }
}
