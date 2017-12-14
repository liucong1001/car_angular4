import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';

@Injectable()
export class IdcardService {
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
        if (result) {
          resolve(JSON.parse((result)));
        } else {
          reject(plugin + ' - ' + method + ' - 无返回,无数据,操作失败');
        }
        resolve(JSON.parse(result));
      }, function (error) {
        reject(error);
        console.log(error_message, error);
      });
    });
  }

  /**
   * 身份证读卡准备(设备链接检查)
   * @returns {Promise<any>}
   */
  prepare(): Promise<any> {
    return this.doCommond('IDCardReader', 'init');
  }

  /**
   * 身份证读取
   * @returns {Promise<any>}
   */
  read(): Promise<any> {
    return this.doCommond('IDCardReader', 'read');
  }
}
