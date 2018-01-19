import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';

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
        console.info(error_message, error);
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
      self.isBusy().then((busy) => {
        if (true === busy) {
          self.device.sendCommond('Finger', 'Read', self.device.pre_api_url + '').then(function (result) {
            if (0 === result.Code) {
              resolve(result);
            } else {
              reject(result);
            }
          }, function (error) {
            reject(error);
          });
        } else {
          this.device._message.error('指纹仪', '当前设备正在使用中');
        }
      }, () => {
        reject({Message: '设备正在使用中'});
        // 只要开启了硬件助手，就会返回busy。
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
      self.isBusy().then((busy) => {
        if (true === busy) {
          self.device.sendCommond('Finger', 'Verify', base64).then(function (result) {
            if (0 === result.Code) {
              // resolve(result);
              self.device._message.success('指纹比对成功', '当前指纹匹配成功！');
            } else {
              self.device._message.error('指纹比对失败', '当前指纹不匹配。');
            }
          }, function (error) {
            reject(error);
          });
        } else {
          this.device._message.error('指纹仪', '当前设备正在使用中');
        }
      }, () => {
        reject({Message: '设备正在使用中'});
        // 只要开启了硬件助手，就会返回busy。
      });
    });
  }
}
