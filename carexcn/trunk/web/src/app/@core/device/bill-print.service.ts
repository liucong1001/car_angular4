import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';

@Injectable()
export class BillPrintService {
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
   * 获取发票打印机的配置
   * @returns {Promise<any>}
   */
  config(): Promise<any> {
    return this.doCommond('BillPrinter', 'Config');
  }

  /**
   * 获取打印机列表
   * @returns {Promise<any>}
   */
  getPrinters(): Promise<any> {
    return this.doCommond('BillPrinter', 'Config', '获取打印机列表异常');
  }

  /**
   * 选定打印机
   * @returns {Promise<any>}
   */
  selectPrint(printer): Promise<any> {
    return this.doCommond('BillPrinter', 'SetSelectedPrinter', '选顶打印机时发生异常', printer);
  }

  /**
   * 获取当前打印机
   * @returns {Promise<any>}
   */
  currentPrint(): Promise<any> {
    return this.doCommond('BillPrinter', 'GetSelectedPrinter', '获取当前打印机异常');
  }

  /**
   * 打印发票
   * @param data
   * @param config
   * @returns {Promise<any>}
   */
  print(data, config): Promise<any> {
    return this.doCommond('BillPrinter', 'Print', '打印机打印时发生异常', JSON.stringify(Object.assign({}, data, {printConfig: config})));
  }
}
