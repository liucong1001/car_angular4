import {Injectable} from '@angular/core';
import {DeviceService} from './device.service';
import {reject} from 'q';
import {IccardOperaModel} from '../model/bussiness/iccard.model';
import {MessageService} from '../utils/message.service';

@Injectable()
export class IccardService {

  /**
   * 构造函数
   * @param {DeviceService} device
   */
  constructor(
    private device: DeviceService,
  ) {
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
          resolve(result);
        } else {
          reject(plugin + ' - ' + method + ' - 无返回,无数据,操作失败');
        }
      }, function (error) {
        reject(error);
      });
    });
  }

  /**
   * IC卡初始化操作
   * @param market
   * @param maker
   * @param txnSlot
   * @returns {Promise<any>}
   */
  writerInit(market: string, maker: string, txnSlot: number): Promise<any> {
    return this.doCommond('ICCard', 'Init', '初始化失败', {market, maker, txnSlot}).catch((res) => {
      this.device._message.error('IC读卡器连接异常', '请检查IC读卡器和与计算机的连接是否完好。');
    });
  }

  /**
   * 扫描
   * @returns {Promise<any>}
   */
  scanCard(): Promise<any> {
    return this.doCommond('ICCard', 'StartListen', '读取失败');
  }

  /**
   * 停止扫描
   * @returns {Promise<any>}
   */
  stopScan(): Promise<any> {
    return this.doCommond('ICCard', 'StopListen');
  }

  /**
   * 滴一声
   * @returns {Promise<any>}
   */
  beep(): Promise<any> {
    return this.doCommond('ICCard', 'Beep');
  }
  /**
   * 播放语音
   * @param index 1、请插卡 2、请刷卡 3、读卡错误 4、请输入密码 5、密码错误
   *  6、操作成功 7、操作超时 8、操作失败 9、请取回卡
   *  10、请重新输入密码 11、请再次输入密码 12、请输入新密码 13、请输入旧密码 14、请确认新密码
   * @returns {Promise<any>}
   */
  playSound(index): Promise<any> {
    return this.doCommond('ICCard', 'PlaySound', '播放语音异常', index);
  }

  /**
   * 输出文本
   * @param text
   * @returns {Promise<any>}
   */
  showText(text): Promise<any> {
    return this.doCommond('ICCard', 'ShowText', '输出文本异常', text);
  }

  /**
   * 获取密码
   * @param timeout
   * @returns {Promise<any>}
   */
  getPassword(timeout?): Promise<any> {
    const self = this;
    return new Promise(function(resolve){
      self.device.sendCommond('ICCard', 'GetPassword', timeout || 300).then(function (result) {
        if ('success' === result.code) {
          resolve(JSON.parse((result)));
        } else {
          reject('ICCard - GetPassword - 获取密码失败');
        }
        resolve(JSON.parse(result));
      }, function (error) {
        console.info(error);
      });
    });
  }

  /**
   * IC卡充值
   * @param amount
   * @param date
   * @param time
   * @returns {Promise<any>}
   */
  recharge(recharge: IccardOperaModel): Promise<any> {
    const amount = recharge.amount;
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    const date = localISOTime.split('T')[0].replace(/-/g, '');
    const time = localISOTime.split('T')[1].replace(/:/g, '');
    return this.doCommond('ICCard', 'Recharge', '充值失败', {amount, date, time});
  }

  /**
   * IC卡扣款
   * @param amount
   * @param date
   * @param time
   * @returns {Promise<any>}
   */
  pay(pay: IccardOperaModel): Promise<any> {
    const amount = pay.amount;
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    const date = localISOTime.split('T')[0].replace(/-/g, '');
    const time = localISOTime.split('T')[1].replace(/:/g, '');
    return this.doCommond('ICCard', 'Pay', '扣款失败', {amount, date, time});
  }
}
