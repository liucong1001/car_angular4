import {Injectable} from '@angular/core';
import {BodyOutputType, Toast, ToasterService} from 'angular2-toaster';

/**
 * 消息提示服务
 */
@Injectable()
export class MessageService {
  constructor(private toasterService: ToasterService) {
  }

  /**
   * 提示成功消息
   * @param {string} title 标题
   * @param {string} body 描述
   */
  public success(title: string, body: string) {
    this.toasterService.popAsync('success', title, body);
  }

  /**
   * 提示错误消息
   * @param {string} title 标题
   * @param {string} body 描述
   */
  public error(title: string, body: string) {
    const toast: Toast = {
      type: 'error',
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  /**
   * 提示警告消息
   * @param {string} title 标题
   * @param {string} body 描述
   */
  public warning(title: string, body: string) {
    this.toasterService.popAsync('warning', title, body );
  }
  /**
   * 提示info消息
   * @param {string} title 标题
   * @param {string} body 描述
   */
  public info(title: string, body: string) {
    this.toasterService.popAsync('info', title, body );
  }
  /**
   * 提示一般消息
   * @param {string} title 标题
   * @param {string} body 描述
   */
  public normal(title: string, body: string) {
    this.toasterService.popAsync('default', title, body );
  }
}
